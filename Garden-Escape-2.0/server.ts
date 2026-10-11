import express from 'express';
import http from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';
import dotenv from 'dotenv';
import {
  TeamId,
  GamePhase,
  RelativeDirection,
  PublicQuestion,
  LeaderboardEntry,
  PlayerPrivateState,
  AdminSpectatorPlayer,
  RoomStateSnapshot,
  ClientMessage,
} from './src/types/game';
import { QUESTION_BANK, getQuestionsForTeam } from './src/data/questionBank';
import {
  AUTHORITATIVE_MAZE,
  DIRS,
  RELATIVE_OFFSETS,
  getAbsoluteDirection,
  getValidRelativeDirections,
  isTraversable,
} from './src/data/authoritativeMaze';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = parseInt(process.env.PORT || '3000', 10);
// Never ship a fallback credential. The server refuses to start until ADMIN_PASSWORD is configured.
const ADMIN_PASSWORD = (process.env.ADMIN_PASSWORD || '').trim();

const app = express();
app.use(express.json());

// CORS for cross-domain support in deployment
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

// Server-authoritative Room Data Structure
interface ServerTeamPlayer {
  teamId: TeamId;
  playerName: string;
  connected: boolean;
  ws: WebSocket | null;
  reconnectToken: string;
  score: number;
  keys: number;
  lives: number;
  consecutiveWrongAnswers: number;
  collectedKeys: string[];
  unlockedGates: string[];
  checkpoints: number[];
  checkpointIndex: number;
  x: number;
  y: number;
  orientation: number; // 0=N, 1=E, 2=S, 3=W
  currentQuestionId: string | null;
  currentQuestion: PublicQuestion | null;
  hasPendingMove: boolean;
  validDirections: RelativeDirection[];
  lastAnswerResult: { correct: boolean; explanation: string } | null;
  askedQuestionIds: string[];
  questionsAnswered: number;
  finished: boolean;
  finishTimeMs: number | null;
  finishRank: number | null;
}

interface GameRoom {
  roomCode: string;
  adminToken: string;
  adminWs: WebSocket | null;
  phase: GamePhase;
  phaseEndsAt: number | null;
  raceStartedAt: number | null;
  studyDurationSec: number;
  raceDurationSec: number;
  studyTimer: NodeJS.Timeout | null;
  raceTimer: NodeJS.Timeout | null;
  nextFinisherRank: number;
  unlockedGates: string[];
  teams: Record<TeamId, ServerTeamPlayer>;
  announcement: { id: string; message: string; author: string; timestamp: number } | null;
  seenMsgIds: Set<string>;
  rateLimiter: Map<string, number>;
  keysRemaining: number;
  pendingBlockRequests: { teamId: TeamId; gateId: string; x: number; y: number; requestedAt: number }[];
}

const rooms = new Map<string, GameRoom>();

function generateId(prefix = 'id'): string {
  return `${prefix}_${crypto.randomBytes(6).toString('hex')}`;
}

function createDefaultTeamPlayer(teamId: TeamId): ServerTeamPlayer {
  const start = AUTHORITATIVE_MAZE.starts[teamId];
  return {
    teamId,
    playerName: '',
    connected: false,
    ws: null,
    reconnectToken: crypto.randomBytes(16).toString('hex'),
    score: 0,
    keys: 0,
    lives: 5,
    consecutiveWrongAnswers: 0,
    collectedKeys: [],
    unlockedGates: [],
    checkpoints: [0],
    checkpointIndex: 0,
    x: start.x,
    y: start.y,
    orientation: start.orientation,
    currentQuestionId: null,
    currentQuestion: null,
    hasPendingMove: false,
    validDirections: [],
    lastAnswerResult: null,
    askedQuestionIds: [],
    questionsAnswered: 0,
    finished: false,
    finishTimeMs: null,
    finishRank: null,
  };
}

function createGameRoom(customCode?: string): GameRoom {
  let code = (customCode || '').trim().toUpperCase();
  if (code && !/^[A-Z0-9-]{4,16}$/.test(code)) {
    throw new Error('Room codes must be 4–16 characters using letters, numbers, or hyphens.');
  }
  if (code && rooms.has(code)) throw new Error('That room code is already in use.');
  if (!code) {
    do {
      code = `GARDEN${crypto.randomInt(100000, 999999)}`;
    } while (rooms.has(code));
  }
  const room: GameRoom = {
    roomCode: code,
    adminToken: crypto.randomBytes(16).toString('hex'),
    adminWs: null,
    phase: 'LOBBY',
    phaseEndsAt: null,
    raceStartedAt: null,
    studyDurationSec: 20, // Authoritative 20-second study phase
    raceDurationSec: 1800, // Authoritative 30-minute race timer (1800s)
    studyTimer: null,
    raceTimer: null,
    nextFinisherRank: 1,
    unlockedGates: [],
    teams: {
      HR: createDefaultTeamPlayer('HR'),
      MARKETING: createDefaultTeamPlayer('MARKETING'),
      FINANCE: createDefaultTeamPlayer('FINANCE'),
      OPERATIONS: createDefaultTeamPlayer('OPERATIONS'),
    },
    announcement: null,
    seenMsgIds: new Set(),
    rateLimiter: new Map(),
    keysRemaining: 50,
    pendingBlockRequests: [],
  };

  rooms.set(code, room);
  return room;
}

// Select a new question for a team from their 50 assigned questions
function selectNextQuestion(player: ServerTeamPlayer): PublicQuestion {
  const allTeamQuestions = getQuestionsForTeam(player.teamId);
  // Questions 1-4 are normal; every 5th question (5, 10, 15, ...) is a compulsory binary-code challenge.
  // Wrong answers do not advance questionsAnswered, so the replacement stays in the same question category.
  const nextNumber = player.questionsAnswered + 1;
  const needsBinary = nextNumber % 5 === 0;
  const matchingType = allTeamQuestions.filter((q) => (q.category === 'Binary Code Challenge') === needsBinary);
  const typedPool = matchingType.length ? matchingType : allTeamQuestions;
  const unasked = typedPool.filter((q) => !player.askedQuestionIds.includes(q.id));
  const pool = unasked.length > 0 ? unasked : typedPool;
  const picked = pool[Math.floor(Math.random() * pool.length)];

  player.askedQuestionIds.push(picked.id);
  player.currentQuestionId = picked.id;

  const pub: PublicQuestion = {
    id: picked.id,
    category: picked.category,
    difficulty: picked.difficulty,
    question: picked.question,
    options: picked.options,
  };

  player.currentQuestion = pub;
  return pub;
}

// Calculate Leaderboard
function computeLeaderboard(room: GameRoom): LeaderboardEntry[] {
  const now = Date.now();
  const entries: LeaderboardEntry[] = (Object.keys(room.teams) as TeamId[]).map((tid) => {
    const t = room.teams[tid];
    let elapsedMs = 0;
    if (t.finishTimeMs !== null) {
      elapsedMs = t.finishTimeMs;
    } else if (room.raceStartedAt) {
      elapsedMs = Math.max(0, now - room.raceStartedAt);
    }

    const mins = Math.floor(elapsedMs / 60000);
    const secs = Math.floor((elapsedMs % 60000) / 1000);
    const formattedTime = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

    let status: LeaderboardEntry['status'] = 'Waiting';
    if (t.finished) status = 'Finished';
    else if (!t.connected) status = 'Disconnected';
    else if (room.phase === 'STUDY') status = 'Study';
    else if (room.phase === 'RACE') status = 'Racing';

    return {
      rank: 1,
      teamId: t.teamId,
      teamName: `${t.teamId} Team`,
      playerName: t.playerName || 'Pending',
      score: t.score,
      keys: t.keys,
      checkpointIndex: t.checkpointIndex,
      elapsedMs,
      formattedTime,
      status,
      finished: t.finished,
    };
  });

  // Deterministic sorting:
  // 1. Finished players first, sorted by elapsed time (earliest finisher wins)
  // 2. Unfinished players sorted by checkpoint index desc, then score desc, then keys desc
  entries.sort((a, b) => {
    if (a.finished && !b.finished) return -1;
    if (!a.finished && b.finished) return 1;
    if (a.finished && b.finished) return a.elapsedMs - b.elapsedMs;
    if (b.checkpointIndex !== a.checkpointIndex) return b.checkpointIndex - a.checkpointIndex;
    if (b.score !== a.score) return b.score - a.score;
    return b.keys - a.keys;
  });

  entries.forEach((e, idx) => {
    e.rank = idx + 1;
  });

  return entries;
}

// Build Private Snapshot for a Player
function buildPlayerSnapshot(room: GameRoom, teamId: TeamId): RoomStateSnapshot {
  const player = room.teams[teamId];
  const now = Date.now();
  const timeRemainingSec = room.phaseEndsAt ? Math.max(0, Math.ceil((room.phaseEndsAt - now) / 1000)) : 0;

  const myTeamState: PlayerPrivateState = {
    teamId: player.teamId,
    playerName: player.playerName,
    connected: player.connected,
    score: player.score,
    keys: player.keys,
    lives: player.lives,
    collectedKeys: player.collectedKeys,
    unlockedGates: player.unlockedGates,
    checkpoints: player.checkpoints,
    checkpointIndex: player.checkpointIndex,
    x: player.x,
    y: player.y,
    orientation: player.orientation,
    currentQuestion: player.currentQuestion,
    hasPendingMove: player.hasPendingMove,
    validDirections: player.validDirections,
    lastAnswerResult: player.lastAnswerResult,
    finished: player.finished,
    finishTimeMs: player.finishTimeMs,
    finishRank: player.finishRank,
  };

  return {
    roomCode: room.roomCode,
    phase: room.phase,
    phaseEndsAt: room.phaseEndsAt,
    raceDurationSec: room.raceDurationSec,
    studyDurationSec: room.studyDurationSec,
    timeRemainingSec,
    publicLeaderboard: computeLeaderboard(room),
    unlockedGates: room.unlockedGates,
    announcement: room.announcement,
    myTeamState,
  };
}

// Build Authorized Spectator Snapshot for Admin
function buildAdminSnapshot(room: GameRoom): RoomStateSnapshot {
  const now = Date.now();
  const timeRemainingSec = room.phaseEndsAt ? Math.max(0, Math.ceil((room.phaseEndsAt - now) / 1000)) : 0;

  const adminSpectatorTeams: Record<TeamId, AdminSpectatorPlayer> = {} as any;
  for (const tid of ['HR', 'MARKETING', 'FINANCE', 'OPERATIONS'] as TeamId[]) {
    const t = room.teams[tid];
    adminSpectatorTeams[tid] = {
      teamId: t.teamId,
      playerName: t.playerName,
      connected: t.connected,
      score: t.score,
      keys: t.keys,
      collectedKeys: t.collectedKeys,
      checkpointIndex: t.checkpointIndex,
      x: t.x,
      y: t.y,
      orientation: t.orientation,
      finished: t.finished,
      finishTimeMs: t.finishTimeMs,
      finishRank: t.finishRank,
    };
  }

  return {
    roomCode: room.roomCode,
    phase: room.phase,
    phaseEndsAt: room.phaseEndsAt,
    raceDurationSec: room.raceDurationSec,
    studyDurationSec: room.studyDurationSec,
    timeRemainingSec,
    publicLeaderboard: computeLeaderboard(room),
    unlockedGates: room.unlockedGates,
    announcement: room.announcement,
    adminSpectatorTeams,
    keysRemaining: room.keysRemaining,
    pendingBlockRequests: room.pendingBlockRequests,
  } as RoomStateSnapshot;
}

// Broadcast room state to all room participants with strict privacy segregation
function broadcastRoomState(room: GameRoom) {
  // 1. Send private state to each connected team player
  for (const tid of ['HR', 'MARKETING', 'FINANCE', 'OPERATIONS'] as TeamId[]) {
    const player = room.teams[tid];
    if (player.ws && player.ws.readyState === WebSocket.OPEN) {
      const snap = buildPlayerSnapshot(room, tid);
      player.ws.send(JSON.stringify({ type: 'room:snapshot', snapshot: snap }));
    }
  }

  // 2. Send complete authorized spectator snapshot to Admin
  if (room.adminWs && room.adminWs.readyState === WebSocket.OPEN) {
    const adminSnap = buildAdminSnapshot(room);
    room.adminWs.send(JSON.stringify({ type: 'admin:snapshot', snapshot: adminSnap }));
  }
}

// Transition: LOBBY -> STUDY (20 seconds)
function startStudyPhase(room: GameRoom) {
  if (room.phase !== 'LOBBY') return;

  room.phase = 'STUDY';
  room.phaseEndsAt = Date.now() + room.studyDurationSec * 1000;

  if (room.studyTimer) clearTimeout(room.studyTimer);

  room.studyTimer = setTimeout(() => {
    startRacePhase(room);
  }, room.studyDurationSec * 1000);

  broadcastRoomState(room);
}

// Transition: STUDY -> RACE (30 minutes)
function startRacePhase(room: GameRoom) {
  if (room.phase !== 'STUDY') return;

  room.phase = 'RACE';
  room.raceStartedAt = Date.now();
  room.phaseEndsAt = Date.now() + room.raceDurationSec * 1000;

  // Initialize first question for all 4 teams
  for (const tid of ['HR', 'MARKETING', 'FINANCE', 'OPERATIONS'] as TeamId[]) {
    const player = room.teams[tid];
    selectNextQuestion(player);
  }

  if (room.raceTimer) clearTimeout(room.raceTimer);

  room.raceTimer = setTimeout(() => {
    finishRace(room);
  }, room.raceDurationSec * 1000);

  broadcastRoomState(room);
}

// Transition: RACE -> FINISHED
function finishRace(room: GameRoom) {
  if (room.phase === 'FINISHED') return;
  room.phase = 'FINISHED';
  room.phaseEndsAt = null;

  if (room.raceTimer) {
    clearTimeout(room.raceTimer);
    room.raceTimer = null;
  }

  // Freeze all player pending moves and questions
  for (const tid of ['HR', 'MARKETING', 'FINANCE', 'OPERATIONS'] as TeamId[]) {
    room.teams[tid].hasPendingMove = false;
    room.teams[tid].validDirections = [];
  }

  broadcastRoomState(room);
}

// Reset Room
function resetRoom(room: GameRoom) {
  if (room.studyTimer) clearTimeout(room.studyTimer);
  if (room.raceTimer) clearTimeout(room.raceTimer);

  room.phase = 'LOBBY';
  room.phaseEndsAt = null;
  room.raceStartedAt = null;
  room.nextFinisherRank = 1;
  room.unlockedGates = [];
  room.keysRemaining = 50;
  room.pendingBlockRequests = [];
  room.announcement = null;
  room.seenMsgIds.clear();

  for (const tid of ['HR', 'MARKETING', 'FINANCE', 'OPERATIONS'] as TeamId[]) {
    const p = room.teams[tid];
    const s = AUTHORITATIVE_MAZE.starts[tid];
    p.score = 0;
    p.keys = 0;
    p.lives = 5;
    p.collectedKeys = [];
    p.unlockedGates = [];
    p.checkpoints = [0];
    p.checkpointIndex = 0;
    p.x = s.x;
    p.y = s.y;
    p.orientation = s.orientation;
    p.currentQuestionId = null;
    p.currentQuestion = null;
    p.hasPendingMove = false;
    p.validDirections = [];
    p.lastAnswerResult = null;
    p.askedQuestionIds = [];
    p.questionsAnswered = 0;
    p.finished = false;
    p.finishTimeMs = null;
    p.finishRank = null;
  }

  broadcastRoomState(room);
}

// REST Endpoints
app.post('/api/admin/login', (req, res) => {
  const { password } = req.body;
  if (!ADMIN_PASSWORD || !password || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ success: false, message: 'Invalid admin credentials' });
  }
  const token = crypto.randomBytes(16).toString('hex');
  res.json({ success: true, token });
});

app.post('/api/rooms/create', (req, res) => {
  const { adminPassword, customRoomCode } = req.body;
  if (!ADMIN_PASSWORD || adminPassword !== ADMIN_PASSWORD) {
    return res.status(403).json({ success: false, message: 'Unauthorized: invalid admin password' });
  }

  try {
    const room = createGameRoom(customRoomCode);
    res.json({ success: true, roomCode: room.roomCode, adminToken: room.adminToken });
  } catch (error) {
    res.status(400).json({ success: false, message: error instanceof Error ? error.message : 'Could not create room.' });
  }
});

app.get('/api/rooms/:code/status', (req, res) => {
  const room = rooms.get(req.params.code.toUpperCase());
  if (!room) return res.status(404).json({ exists: false });

  const teamStatus: Record<string, boolean> = {};
  for (const tid of ['HR', 'MARKETING', 'FINANCE', 'OPERATIONS'] as TeamId[]) {
    teamStatus[tid] = !!room.teams[tid].connected;
  }

  res.json({
    exists: true,
    roomCode: room.roomCode,
    phase: room.phase,
    teams: teamStatus,
  });
});

// Create HTTP and WebSocket Server
const server = http.createServer(app);
const wss = new WebSocketServer({ server, path: '/ws' });

interface WsSession {
  role: 'admin' | 'player' | 'audience';
  roomCode?: string;
  teamId?: TeamId;
  token?: string;
  messageTimestamps: number[];
  seenMessageIds: Set<string>;
}

const socketSessions = new Map<WebSocket, WsSession>();

wss.on('connection', (ws: WebSocket) => {
  socketSessions.set(ws, { role: 'audience', messageTimestamps: [], seenMessageIds: new Set() });

  ws.on('message', (raw: Buffer | string) => {
    try {
      const rawText = raw.toString();
      if (Buffer.byteLength(rawText, 'utf8') > 64 * 1024) {
        ws.send(JSON.stringify({ type: 'error', message: 'Message too large (64 KB maximum).' }));
        return;
      }
      const msg: ClientMessage = JSON.parse(rawText);
      handleClientMessage(ws, msg);
    } catch (err) {
      console.error('WS Error:', err);
      ws.send(JSON.stringify({ type: 'error', message: 'Malformed JSON payload' }));
    }
  });

  ws.on('close', () => {
    const session = socketSessions.get(ws);
    if (!session || !session.roomCode) {
      socketSessions.delete(ws);
      return;
    }

    const room = rooms.get(session.roomCode);
    if (room) {
      if (session.role === 'admin' && room.adminWs === ws) {
        room.adminWs = null;
      } else if (session.role === 'player' && session.teamId) {
        const p = room.teams[session.teamId];
        if (p.ws === ws) {
          p.connected = false;
          p.ws = null;
        }
      }
      broadcastRoomState(room);
    }
    socketSessions.delete(ws);
  });
});

function handleClientMessage(ws: WebSocket, msg: ClientMessage) {
  // Rate limiting per socket
  const now = Date.now();
  const session = socketSessions.get(ws);
  if (!session) return;

  // Per-connection rate limit: 40 messages in any rolling 10-second window.
  session.messageTimestamps = session.messageTimestamps.filter((timestamp) => now - timestamp < 10_000);
  if (session.messageTimestamps.length >= 40) {
    ws.send(JSON.stringify({ type: 'error', message: 'Too many requests. Please slow down.' }));
    return;
  }
  session.messageTimestamps.push(now);

  const messageId = (msg as { msgId?: unknown } | null)?.msgId;
  if (typeof messageId === 'string') {
    if (messageId.length > 128 || session.seenMessageIds.has(messageId)) {
      ws.send(JSON.stringify({ type: 'error', message: 'Invalid or duplicate message ID.' }));
      return;
    }
    session.seenMessageIds.add(messageId);
    if (session.seenMessageIds.size > 500) {
      const oldest = session.seenMessageIds.values().next().value;
      if (oldest) session.seenMessageIds.delete(oldest);
    }
  }

  // Timers can fire slightly late if the event loop is busy. Enforce the deadline
  // on incoming actions too, so no action is accepted after the official end time.
  if (session.roomCode) {
    const activeRoom = rooms.get(session.roomCode);
    if (activeRoom?.phase === 'STUDY' && activeRoom.phaseEndsAt !== null && now >= activeRoom.phaseEndsAt) {
      startRacePhase(activeRoom);
    } else if (activeRoom?.phase === 'RACE' && activeRoom.phaseEndsAt !== null && now >= activeRoom.phaseEndsAt) {
      finishRace(activeRoom);
    }
  }

  switch (msg.type) {
    case 'room:create': {
      if (!ADMIN_PASSWORD || msg.adminPassword !== ADMIN_PASSWORD) {
        return ws.send(JSON.stringify({ type: 'error', message: 'Unauthorized admin password' }));
      }
      const room = createGameRoom(msg.customRoomCode);
      room.adminWs = ws;
      session.role = 'admin';
      session.roomCode = room.roomCode;
      session.token = room.adminToken;

      ws.send(
        JSON.stringify({
          type: 'room:created',
          roomCode: room.roomCode,
          adminToken: room.adminToken,
        })
      );
      broadcastRoomState(room);
      break;
    }

    case 'admin:auth': {
      const roomCode = msg.roomCode?.trim().toUpperCase();
      if (!roomCode) return ws.send(JSON.stringify({ type: 'error', message: 'Enter a room code.' }));
      let room = rooms.get(roomCode);

      // The existing login screen doubles as room creation: an authenticated Admin
      // can create the entered code when it does not yet exist.
      if (!room && ADMIN_PASSWORD && msg.adminPassword === ADMIN_PASSWORD) {
        try {
          room = createGameRoom(roomCode);
        } catch (error) {
          return ws.send(JSON.stringify({ type: 'error', message: error instanceof Error ? error.message : 'Could not create room.' }));
        }
      }
      if (!room) {
        return ws.send(JSON.stringify({ type: 'error', message: `Room ${roomCode} not found. Use the Admin password to create it.` }));
      }

      // Check either the configured master password or this room's secret token.
      if ((ADMIN_PASSWORD && msg.adminPassword === ADMIN_PASSWORD) || msg.token === room.adminToken) {
        room.adminWs = ws;
        session.role = 'admin';
        session.roomCode = room.roomCode;
        session.token = room.adminToken;

        ws.send(
          JSON.stringify({
            type: 'admin:auth_success',
            roomCode: room.roomCode,
            adminToken: room.adminToken,
          })
        );
        broadcastRoomState(room);
      } else {
        ws.send(JSON.stringify({ type: 'error', message: 'Invalid admin authorization' }));
      }
      break;
    }

    case 'room:join': {
      const roomCode = msg.roomCode?.toUpperCase();
      const room = rooms.get(roomCode);
      if (!room) {
        return ws.send(JSON.stringify({ type: 'error', message: `Room "${roomCode}" does not exist` }));
      }

      const teamId = msg.teamId;
      if (!teamId || !['HR', 'MARKETING', 'FINANCE', 'OPERATIONS'].includes(teamId)) {
        return ws.send(JSON.stringify({ type: 'error', message: 'Invalid team role' }));
      }

      const player = room.teams[teamId];

      // Reconnection token check
      if (msg.reconnectToken && msg.reconnectToken === player.reconnectToken) {
        // Successful reconnection!
        player.connected = true;
        player.ws = ws;
        if (msg.playerName) player.playerName = msg.playerName;
        session.role = 'player';
        session.roomCode = room.roomCode;
        session.teamId = teamId;

        ws.send(
          JSON.stringify({
            type: 'room:joined',
            roomCode: room.roomCode,
            teamId,
            reconnectToken: player.reconnectToken,
            reconnected: true,
          })
        );
        broadcastRoomState(room);
        return;
      }

      // Once a role has been claimed, a disconnected player must prove possession
      // of its reconnect token; otherwise another client could steal the role.
      if (player.playerName && msg.reconnectToken !== player.reconnectToken) {
        return ws.send(JSON.stringify({ type: 'error', message: 'This team role is already claimed. Reconnect using its saved token.' }));
      }

      // Only 1 player per role in a room
      if (player.connected && player.ws !== ws) {
        return ws.send(
          JSON.stringify({
            type: 'error',
            message: `Team role "${teamId}" is already active by ${player.playerName}`,
          })
        );
      }

      player.connected = true;
      player.playerName = msg.playerName.trim() || `${teamId} Officer`;
      player.ws = ws;

      session.role = 'player';
      session.roomCode = room.roomCode;
      session.teamId = teamId;

      ws.send(
        JSON.stringify({
          type: 'room:joined',
          roomCode: room.roomCode,
          teamId,
          reconnectToken: player.reconnectToken,
          reconnected: false,
        })
      );

      broadcastRoomState(room);
      break;
    }

    case 'admin:start': {
      if (session.role !== 'admin' || !session.roomCode) {
        return ws.send(JSON.stringify({ type: 'error', message: 'Only authorized Admin can start game' }));
      }

      const room = rooms.get(session.roomCode);
      if (!room) return;

      // Verify all 4 team roles are filled
      const connectedCount = (['HR', 'MARKETING', 'FINANCE', 'OPERATIONS'] as TeamId[]).filter(
        (tid) => room.teams[tid].connected
      ).length;

      if (connectedCount < 4) {
        return ws.send(
          JSON.stringify({
            type: 'error',
            message: `Cannot start: all 4 teams must be joined and connected (currently ${connectedCount}/4)`,
          })
        );
      }

      startStudyPhase(room);
      break;
    }

    case 'admin:action': {
      if (session.role !== 'admin' || !session.roomCode) return;
      const room = rooms.get(session.roomCode);
      if (!room) return;

      if (msg.action === 'reset') {
        resetRoom(room);
      } else if (msg.action === 'give_key' && msg.payload?.teamId) {
        const t = room.teams[msg.payload.teamId as TeamId];
        const amount = Number(msg.payload.amount ?? 1);
        // One shared inventory of exactly 50 keys per room. Award only what remains.
        if (t && Number.isInteger(amount) && amount >= 1 && amount <= room.keysRemaining) {
          t.keys += amount;
          room.keysRemaining -= amount;
          broadcastRoomState(room);
        }
      } else if (msg.action === 'teleport_player' && msg.payload?.teamId) {
        const t = room.teams[msg.payload.teamId as TeamId];
        const x = Number(msg.payload.x);
        const y = Number(msg.payload.y);
        const orientation = Number(msg.payload.orientation ?? 0);
        if (t && Number.isInteger(x) && Number.isInteger(y) && x >= 0 && y >= 0 && x < AUTHORITATIVE_MAZE.width && y < AUTHORITATIVE_MAZE.height && [0,1,2,3].includes(orientation) && isTraversable(AUTHORITATIVE_MAZE.walls, x, y, t.unlockedGates, AUTHORITATIVE_MAZE.gates)) {
          t.x = x; t.y = y; t.orientation = orientation;
          t.hasPendingMove = false; t.validDirections = [];
          t.finished = false; t.finishTimeMs = null; t.finishRank = null;
          broadcastRoomState(room);
        }
      } else if (msg.action === 'approve_block' && msg.payload?.teamId && msg.payload?.gateId) {
        const t = room.teams[msg.payload.teamId as TeamId];
        const gate = AUTHORITATIVE_MAZE.gates.find((g) => g.id === String(msg.payload.gateId));
        if (t && gate && room.pendingBlockRequests.some((r) => r.teamId === t.teamId && r.gateId === gate.id)) {
          if (room.keysRemaining > 0) {
            room.keysRemaining -= 1;
            t.keys += 1;
            t.unlockedGates.push(gate.id);
          }
          room.pendingBlockRequests = room.pendingBlockRequests.filter((r) => !(r.teamId === t.teamId && r.gateId === gate.id));
          broadcastRoomState(room);
        }
      } else if (msg.action === 'announcement' && msg.payload?.message) {
        room.announcement = {
          id: generateId('ann'),
          message: msg.payload.message,
          author: 'Admin Referee',
          timestamp: Date.now(),
        };
        broadcastRoomState(room);
      }
      break;
    }

    case 'player:submit_answer': {
      if (session.role !== 'player' || !session.roomCode || !session.teamId) {
        return ws.send(JSON.stringify({ type: 'error', message: 'Unauthorized action' }));
      }

      const room = rooms.get(session.roomCode);
      if (!room || room.phase !== 'RACE') {
        return ws.send(JSON.stringify({ type: 'error', message: 'Submissions accepted only during RACE phase' }));
      }

      const player = room.teams[session.teamId];
      if (player.finished) return ws.send(JSON.stringify({ type: 'error', message: 'Your team has already finished.' }));

      // Idempotency: verify question matches
      if (player.currentQuestionId !== msg.questionId) {
        return ws.send(JSON.stringify({ type: 'error', message: 'Stale or invalid question submission' }));
      }

      if (player.hasPendingMove) {
        return ws.send(
          JSON.stringify({
            type: 'error',
            message: 'You must select your movement direction before answering the next question',
          })
        );
      }

      const bankQ = QUESTION_BANK.find((q) => q.id === msg.questionId);
      if (!bankQ) {
        return ws.send(JSON.stringify({ type: 'error', message: 'Question not found in server bank' }));
      }

      const isCorrect = msg.selectedOption === bankQ.correctAnswer;

      if (isCorrect) {
        player.consecutiveWrongAnswers = 0;
        // Correct answer advances the sequence; the first question then lets the player choose a valid path.
        player.questionsAnswered += 1;
        // Correct answer: +100 points, unlocks valid directions
        player.score += 100;
        player.hasPendingMove = true;
        player.validDirections = getValidRelativeDirections(
          AUTHORITATIVE_MAZE.walls,
          player.x,
          player.y,
          player.orientation,
          player.unlockedGates,
          AUTHORITATIVE_MAZE.gates,
          player.keys
        );
        player.lastAnswerResult = { correct: true, explanation: bankQ.explanation };
      } else {
        // A life is lost only after three wrong answers in a row; each wrong answer rotates the question.
        player.consecutiveWrongAnswers = (player.consecutiveWrongAnswers || 0) + 1;
        const lostLife = player.consecutiveWrongAnswers >= 3;
        if (lostLife) {
          player.lives = Math.max(0, player.lives - 1);
          player.consecutiveWrongAnswers = 0;
        }
        player.hasPendingMove = false;
        player.validDirections = [];
        player.lastAnswerResult = { correct: false, explanation: `${lostLife ? 'Three consecutive wrong answers: one life lost. ' : `${3 - player.consecutiveWrongAnswers} wrong answer(s) until a life is lost. `}${bankQ.explanation}` };
        if (player.lives === 0) { player.finished = true; player.finishTimeMs = Date.now() - (room.raceStartedAt || Date.now()); player.finishRank = ++room.nextFinisherRank; }
        else { player.askedQuestionIds = player.askedQuestionIds.filter((id) => id !== bankQ.id); selectNextQuestion(player); }
      }

      broadcastRoomState(room);
      break;
    }

    case 'player:move': {
      if (session.role !== 'player' || !session.roomCode || !session.teamId) {
        return ws.send(JSON.stringify({ type: 'error', message: 'Unauthorized move' }));
      }

      const room = rooms.get(session.roomCode);
      if (!room || room.phase !== 'RACE') {
        return ws.send(JSON.stringify({ type: 'error', message: 'Moves allowed only in RACE phase' }));
      }

      const player = room.teams[session.teamId];
      if (player.finished) return ws.send(JSON.stringify({ type: 'error', message: 'Your team has already finished.' }));

      if (!player.hasPendingMove) {
        return ws.send(
          JSON.stringify({
            type: 'error',
            message: 'Must answer a question correctly before moving',
          })
        );
      }

      const chosenDir = msg.direction;
      if (!player.validDirections.includes(chosenDir)) {
        return ws.send(
          JSON.stringify({
            type: 'error',
            message: `Direction ${chosenDir} is blocked or invalid from current cell`,
          })
        );
      }

      // Calculate destination cell
      const absDir = getAbsoluteDirection(player.orientation, chosenDir);
      const nextX = player.x + DIRS[absDir].dx;
      const nextY = player.y + DIRS[absDir].dy;

      // A locked gate may be selected only when this player has enough keys.
      // Unlock it before checking traversability so a valid key-holder can enter.
      const gateAtCell = AUTHORITATIVE_MAZE.gates.find((g) => g.x === nextX && g.y === nextY);
      if (gateAtCell && !player.unlockedGates.includes(gateAtCell.id)) {
        // Movement is only enabled after the player answers the current quiz correctly.
        // Quiz blocks therefore unlock on a correct answer, without requiring collected keys.
        if (player.keys < gateAtCell.requiredKeys) {
          if (!room.pendingBlockRequests.some((r) => r.teamId === player.teamId && r.gateId === gateAtCell.id)) {
            room.pendingBlockRequests.push({ teamId: player.teamId, gateId: gateAtCell.id, x: gateAtCell.x, y: gateAtCell.y, requestedAt: Date.now() });
            broadcastRoomState(room);
          }
          return ws.send(JSON.stringify({ type: 'error', message: `Block ${gateAtCell.id} reached. Waiting for admin key approval.` }));
        }
        // Keep quiz-block unlocks team-specific: one team's answer must not open
        // the same block for every other team.
        player.unlockedGates.push(gateAtCell.id);
      }

      // Verify traversability after applying any valid gate unlock.
      if (!isTraversable(AUTHORITATIVE_MAZE.walls, nextX, nextY, player.unlockedGates, AUTHORITATIVE_MAZE.gates)) {
        return ws.send(JSON.stringify({ type: 'error', message: 'Destination blocked by hedge or gate' }));
      }

      // Execute authoritative move!
      player.x = nextX;
      player.y = nextY;
      player.orientation = absDir; // Update orientation to face movement direction
      player.score += 10; // +10 points for valid move
      player.hasPendingMove = false;
      player.validDirections = [];

      // Check Key Pickup
      const keyAtCell = AUTHORITATIVE_MAZE.keys.find((k) => k.x === nextX && k.y === nextY);
      if (keyAtCell && !player.collectedKeys.includes(keyAtCell.id)) {
        player.collectedKeys.push(keyAtCell.id);
        player.keys += 1;
        room.announcement = {
          id: generateId('ann'),
          message: `🔑 ${player.teamId} collected ${keyAtCell.name}!`,
          author: 'Referee System',
          timestamp: Date.now(),
        };
      }

      // Check Checkpoint
      const cpAtCell = AUTHORITATIVE_MAZE.checkpoints.find((cp) => cp.x === nextX && cp.y === nextY);
      if (cpAtCell && !player.checkpoints.includes(cpAtCell.index)) {
        player.checkpoints.push(cpAtCell.index);
        player.checkpointIndex = Math.max(player.checkpointIndex, cpAtCell.index);
        room.announcement = {
          id: generateId('ann'),
          message: `🚩 ${player.teamId} reached ${cpAtCell.name}!`,
          author: 'Referee System',
          timestamp: Date.now(),
        };
      }

      // Check Finish Reach
      if (
        nextX === AUTHORITATIVE_MAZE.finish.x &&
        nextY === AUTHORITATIVE_MAZE.finish.y &&
        !player.finished
      ) {
        player.finished = true;
        player.finishTimeMs = room.raceStartedAt ? Date.now() - room.raceStartedAt : 0;
        player.finishRank = room.nextFinisherRank++;
        player.score += 500; // +500 points for finishing the maze

        room.announcement = {
          id: generateId('ann'),
          message: `🏆 ${player.teamId} reached the Royal Gazebo Finish (Rank #${player.finishRank})!`,
          author: 'Championship Referee',
          timestamp: Date.now(),
        };

        // Keep the race open until the authoritative 30-minute deadline, even if all teams finish.
      } else {
        // If not finished, immediately select next question
        selectNextQuestion(player);
      }

      broadcastRoomState(room);
      break;
    }

    case 'ping': {
      ws.send(JSON.stringify({ type: 'pong' }));
      break;
    }

    default:
      break;
  }
}

// Serve Frontend Vite Build in Production or Dev
const isProduction = process.env.NODE_ENV === 'production' || process.argv.includes('--prod');

async function startServer() {
  if (!ADMIN_PASSWORD) {
    throw new Error('ADMIN_PASSWORD is required. Set it in your environment or .env file before starting Garden Escape.');
  }
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  server.listen(PORT, '0.0.0.0', () => {
    console.log(`🌿 Garden Escape Server running on http://localhost:${PORT}`);
    console.log(`🔑 Admin Password configured: ${ADMIN_PASSWORD ? '[SET]' : '[NOT SET]'}`);
    console.log(`🎮 Mode: ${isProduction ? 'Production' : 'Development'}`);
  });
}

// Avoid starting listeners when this module is imported by automated tests.
// `npm run dev` and `npm start` execute this file directly.
if (process.argv[1] && path.resolve(process.argv[1]) === __filename) {
  startServer().catch((error) => {
    console.error(`Garden Escape could not start: ${error instanceof Error ? error.message : String(error)}`);
    process.exitCode = 1;
  });
}

export { app, server, rooms, createGameRoom, startStudyPhase, startRacePhase, finishRace, resetRoom, startServer };
