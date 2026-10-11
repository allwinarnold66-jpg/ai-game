export type TeamId = 'HR' | 'MARKETING' | 'FINANCE' | 'OPERATIONS';

export type GamePhase = 'LOBBY' | 'STUDY' | 'RACE' | 'FINISHED';

export type RelativeDirection = 'FORWARD' | 'BACKWARD' | 'LEFT' | 'RIGHT';

export interface ObstacleDef {
  id: string;
  level: number;
  name: string;
  type: 'gate' | 'magic_door' | 'rock_barrier' | 'quiz_gate' | 'final_gate';
  gridX: number;
  gridY: number;
  width: number;
  height: number;
  requiredKeys: number;
  description: string;
  quizId?: string;
  requiresAdminApproval?: boolean;
}

export interface CheckpointDef {
  id: string;
  level: number;
  index: number;
  gridX: number;
  gridY: number;
  name: string;
}

export interface MovingHazardDef {
  id: string;
  level: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  speed: number;
  radius: number;
  type: 'laser' | 'spike_roller' | 'energy_orb';
}

export interface LevelDef {
  levelNumber: number;
  name: string;
  subtitle: string;
  width: number;
  height: number;
  tileSize: number;
  startPositions: Record<TeamId, { x: number; y: number }>;
  walls: number[][];
  obstacles: ObstacleDef[];
  checkpoints: CheckpointDef[];
  movingHazards: MovingHazardDef[];
  keyPickups: { id: string; gridX: number; gridY: number; collectedBy: TeamId[] }[];
  exitPosition: { x: number; y: number; width: number; height: number };
  decorations?: { gridX: number; gridY: number; text: string; icon: string }[];
}

export interface PlayerState {
  teamId: TeamId;
  playerName: string;
  connected: boolean;
  isFullscreen: boolean;
  tabVisible: boolean;
  lastActive: number;
  level: number;
  x: number;
  y: number;
  direction: 'up' | 'down' | 'left' | 'right';
  isMoving: boolean;
  keys: number;
  checkpoint: number;
  completedObstacles: string[];
  completedLevels: number[];
  finished: boolean;
  finishTimeMs: number | null;
}

export interface GameState {
  status: 'waiting' | 'countdown' | 'playing' | 'paused' | 'completed';
  startedAt: number | null;
  pausedAt: number | null;
  totalPausedDurationMs: number;
  winnerTeamId: TeamId | null;
  teams: Record<TeamId, PlayerState>;
  announcement: { id: string; message: string; author: string; timestamp: number } | null;
  settings: {
    allowQuizKeys: boolean;
    timeLimitMinutes: number;
    requireAdminApprovalForFinal: boolean;
  };
  unlockedLevels: number[];
}

export interface PublicQuestion {
  id: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  options: [string, string, string, string];
}

export interface PlayerPublicInfo {
  teamId: TeamId;
  playerName: string;
  connected: boolean;
  score: number;
  keys: number;
  checkpointIndex: number;
  finished: boolean;
  finishTimeMs: number | null;
  finishRank: number | null;
}

export interface PlayerPrivateState {
  teamId: TeamId;
  playerName: string;
  connected: boolean;
  score: number;
  keys: number;
  lives: number;
  collectedKeys: string[];
  unlockedGates: string[];
  checkpoints: number[];
  checkpointIndex: number;
  x: number;
  y: number;
  orientation: number; // 0=N, 1=E, 2=S, 3=W
  currentQuestion: PublicQuestion | null;
  hasPendingMove: boolean;
  validDirections: RelativeDirection[];
  lastAnswerResult: { correct: boolean; explanation: string } | null;
  finished: boolean;
  finishTimeMs: number | null;
  finishRank: number | null;
}

export interface AdminSpectatorPlayer {
  teamId: TeamId;
  playerName: string;
  connected: boolean;
  score: number;
  keys: number;
  collectedKeys: string[];
  checkpointIndex: number;
  x: number;
  y: number;
  orientation: number;
  finished: boolean;
  finishTimeMs: number | null;
  finishRank: number | null;
}

export interface LeaderboardEntry {
  rank: number;
  teamId: TeamId;
  teamName: string;
  playerName: string;
  score: number;
  keys: number;
  checkpointIndex: number;
  elapsedMs: number;
  formattedTime: string;
  status: 'Waiting' | 'Study' | 'Racing' | 'Finished' | 'Disconnected';
  finished: boolean;
}

export interface RoomStateSnapshot {
  roomCode: string;
  phase: GamePhase;
  phaseEndsAt: number | null; // epoch timestamp when study or race ends
  raceDurationSec: number;
  studyDurationSec: number;
  timeRemainingSec: number;
  publicLeaderboard: LeaderboardEntry[];
  unlockedGates: string[];
  announcement: { id: string; message: string; author: string; timestamp: number } | null;
  // Specific to recipient role:
  myTeamState?: PlayerPrivateState;
  adminSpectatorTeams?: Record<TeamId, AdminSpectatorPlayer>;
  keysRemaining?: number;
  pendingBlockRequests?: { teamId: TeamId; gateId: string; x: number; y: number; requestedAt: number }[];
}

// Client to Server Message Types
export interface BaseClientMessage {
  msgId?: string;
}

export interface CreateRoomMessage extends BaseClientMessage {
  type: 'room:create';
  adminPassword: string;
  customRoomCode?: string;
}

export interface JoinRoomMessage extends BaseClientMessage {
  type: 'room:join';
  roomCode: string;
  teamId: TeamId;
  playerName: string;
  reconnectToken?: string;
}

export interface AdminAuthMessage extends BaseClientMessage {
  type: 'admin:auth';
  roomCode: string;
  adminPassword?: string;
  token?: string;
}

export interface AdminStartMessage extends BaseClientMessage {
  type: 'admin:start';
  roomCode: string;
}

export interface AdminActionMessage extends BaseClientMessage {
  type: 'admin:action';
  action: 'pause' | 'resume' | 'reset' | 'give_key' | 'announcement';
  payload?: any;
}

export interface SubmitAnswerMessage extends BaseClientMessage {
  type: 'player:submit_answer';
  questionId: string;
  selectedOption: number;
}

export interface RequestMoveMessage extends BaseClientMessage {
  type: 'player:move';
  direction: RelativeDirection;
}

export type ClientMessage =
  | CreateRoomMessage
  | JoinRoomMessage
  | AdminAuthMessage
  | AdminStartMessage
  | AdminActionMessage
  | SubmitAnswerMessage
  | RequestMoveMessage
  | { type: 'ping' };
