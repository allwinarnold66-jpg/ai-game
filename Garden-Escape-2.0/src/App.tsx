import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  TeamId,
  GamePhase,
  RelativeDirection,
  RoomStateSnapshot,
  LeaderboardEntry,
} from './types/game';
import { sound } from './utils/audio';
import { LoginScreen } from './components/LoginScreen';
import { PlayerGameView } from './components/PlayerGameView';
import { AdminDashboard } from './components/AdminDashboard';
import { AudienceView } from './components/AudienceView';
import { LevelOneChallenge } from './components/LevelOneChallenge';
import confetti from 'canvas-confetti';

export default function App() {
  const [role, setRole] = useState<'login' | 'player' | 'admin' | 'audience'>('login');
  const [roomCode, setRoomCode] = useState<string>('');
  const [myTeamId, setMyTeamId] = useState<TeamId | null>(null);
  const [playerName, setPlayerName] = useState<string>('');
  const [showLevelOne, setShowLevelOne] = useState(false);
  const [levelOneComplete, setLevelOneComplete] = useState(false);
  const [pendingJoin, setPendingJoin] = useState<{ roomCode: string; teamId: TeamId; name: string; reconnectToken?: string } | null>(null);

  // Authoritative room snapshot from server
  const [snapshot, setSnapshot] = useState<RoomStateSnapshot | null>(null);
  const [toast, setToast] = useState<{ title: string; message: string } | null>(null);

  // WebSocket reference
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<any>(null);

  // Connect WebSocket
  useEffect(() => {
    let isMounted = true;

    const connectWs = () => {
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const defaultHost = window.location.host || 'localhost:3000';
      const envWs = (import.meta as any).env?.VITE_WS_URL;
      const wsUrl = envWs || `${protocol}//${defaultHost}/ws`;

      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = () => {
        // Always show the team-selection screen on page load. Saved sessions are
        // offered as an explicit Reconnect button in LoginScreen instead of
        // silently forcing this browser back into the previously used team.
      };

      ws.onmessage = (event) => {
        try {
          const msg = JSON.parse(event.data);

          switch (msg.type) {
            case 'room:snapshot': {
              const snap = msg.snapshot as RoomStateSnapshot;
              setSnapshot(snap);
              if (snap.roomCode) setRoomCode(snap.roomCode);

              // Sound effects on announcement or finish
              if (snap.announcement?.message.includes('reached the Royal Gazebo Finish')) {
                sound.playVictory();
                confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
              }
              break;
            }

            case 'admin:snapshot': {
              const snap = msg.snapshot as RoomStateSnapshot;
              setSnapshot(snap);
              if (snap.roomCode) setRoomCode(snap.roomCode);
              break;
            }

            case 'room:created': {
              setRoomCode(msg.roomCode);
              localStorage.setItem('ge_role', 'admin');
              localStorage.setItem('ge_room_code', msg.roomCode);
              localStorage.setItem('ge_admin_token', msg.adminToken);
              setRole('admin');
              break;
            }

            case 'admin:auth_success': {
              setRoomCode(msg.roomCode);
              localStorage.setItem('ge_role', 'admin');
              localStorage.setItem('ge_room_code', msg.roomCode);
              localStorage.setItem('ge_admin_token', msg.adminToken);
              setRole('admin');
              break;
            }

            case 'room:joined': {
              setRoomCode(msg.roomCode);
              setMyTeamId(msg.teamId);
              localStorage.setItem('ge_role', 'player');
              localStorage.setItem('ge_room_code', msg.roomCode);
              localStorage.setItem('ge_team_id', msg.teamId);
              localStorage.setItem('ge_reconnect_token', msg.reconnectToken);
              setRole('player');

              if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen().catch(() => {});
              }
              break;
            }

            case 'error': {
              setToast({ title: 'Alert', message: msg.message });
              setTimeout(() => setToast(null), 4500);
              break;
            }

            default:
              break;
          }
        } catch (err) {
          console.error('WS parse error:', err);
        }
      };

      ws.onclose = () => {
        if (isMounted) {
          reconnectTimeoutRef.current = setTimeout(connectWs, 2000);
        }
      };
    };

    connectWs();

    return () => {
      isMounted = false;
      if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);
      if (wsRef.current) wsRef.current.close();
    };
  }, []);

  // Player action senders
  const connectToRoom = useCallback(
    (targetRoom: string, teamId: TeamId, name: string, reconnectToken?: string) => {
      setRoomCode(targetRoom);
      setMyTeamId(teamId);
      setPlayerName(name);
      localStorage.setItem('ge_player_name', name);

      if (wsRef.current?.readyState === WebSocket.OPEN) {
        wsRef.current.send(
          JSON.stringify({
            type: 'room:join',
            roomCode: targetRoom,
            teamId,
            playerName: name,
            reconnectToken,
          })
        );
      } else {
        setToast({ title: 'Connecting', message: 'The game server is reconnecting. Please try joining again in a moment.' });
        setTimeout(() => setToast(null), 4500);
      }
    },
    []
  );

  // Player accounts must complete Level 1 before joining the existing Level 2 maze.
  // Admin and projector logins remain unchanged.
  const handleJoinRoom = useCallback(
    (targetRoom: string, teamId: TeamId, name: string, reconnectToken?: string) => {
      if (levelOneComplete) {
        connectToRoom(targetRoom, teamId, name, reconnectToken);
        return;
      }
      setPendingJoin({ roomCode: targetRoom, teamId, name, reconnectToken });
      setShowLevelOne(true);
    },
    [levelOneComplete, connectToRoom]
  );

  const handleLevelOneComplete = useCallback(() => {
    setShowLevelOne(false);
    setLevelOneComplete(true);
    if (pendingJoin) {
      connectToRoom(pendingJoin.roomCode, pendingJoin.teamId, pendingJoin.name, pendingJoin.reconnectToken);
      setPendingJoin(null);
    }
  }, [pendingJoin, connectToRoom]);

  const handleSubmitAnswer = useCallback((questionId: string, selectedOption: number) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(
        JSON.stringify({
          type: 'player:submit_answer',
          questionId,
          selectedOption,
          msgId: Math.random().toString(),
        })
      );
    }
  }, []);

  const handleRequestMove = useCallback((direction: RelativeDirection) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(
        JSON.stringify({
          type: 'player:move',
          direction,
          msgId: Math.random().toString(),
        })
      );
    }
  }, []);

  // Admin action senders
  const handleAdminLogin = useCallback((targetRoom: string, password?: string, token?: string) => {
    setRoomCode(targetRoom);
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(
        JSON.stringify({
          type: 'admin:auth',
          roomCode: targetRoom,
          adminPassword: password,
          token,
        })
      );
    }
  }, []);

  const handleStartGame = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type: 'admin:start', roomCode }));
    }
  }, [roomCode]);

  const handleResetGame = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(
        JSON.stringify({
          type: 'admin:action',
          action: 'reset',
        })
      );
    }
  }, []);

  const handleGiveKey = useCallback((teamId: TeamId, amount: number) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(
        JSON.stringify({
          type: 'admin:action',
          action: 'give_key',
          payload: { teamId, amount },
        })
      );
    }
  }, []);

  const handleTeleportPlayer = useCallback((teamId: TeamId, x: number, y: number) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) wsRef.current.send(JSON.stringify({ type: 'admin:action', action: 'teleport_player', payload: { teamId, x, y, orientation: 0 } }));
  }, []);

  const handleApproveBlock = useCallback((teamId: TeamId, gateId: string) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) wsRef.current.send(JSON.stringify({ type: 'admin:action', action: 'approve_block', payload: { teamId, gateId } }));
  }, []);

  const handleAnnouncement = useCallback((message: string) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(
        JSON.stringify({
          type: 'admin:action',
          action: 'announcement',
          payload: { message },
        })
      );
    }
  }, []);

  const handleOpenAudience = useCallback((targetRoom: string) => {
    setRoomCode(targetRoom);
    setRole('audience');
  }, []);

  const handleLogout = useCallback(() => {
    setRole('login');
    setMyTeamId(null);
    localStorage.removeItem('ge_role');
    localStorage.removeItem('ge_team_id');
    localStorage.removeItem('ge_reconnect_token');
    localStorage.removeItem('ge_admin_token');
  }, []);

  const currentPhase: GamePhase = snapshot?.phase || 'LOBBY';
  const leaderboard: LeaderboardEntry[] = snapshot?.publicLeaderboard || [];
  const timeRemainingSec: number = snapshot?.timeRemainingSec || 0;
  const unlockedGates: string[] = snapshot?.unlockedGates || [];

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-slate-950">
      {/* Toast Notification Alert */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900 border-2 border-emerald-500/80 px-6 py-3 rounded-2xl shadow-2xl animate-in slide-in-from-bottom duration-300 text-center">
          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 block">
            {toast.title}
          </span>
          <p className="text-sm font-bold text-white mt-0.5">{toast.message}</p>
        </div>
      )}

      {/* Announcement Notification Banner */}
      {snapshot?.announcement && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-indigo-950/90 border-2 border-indigo-400/80 px-8 py-3 rounded-2xl shadow-2xl text-center animate-in slide-in-from-top duration-300 pointer-events-none">
          <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 block">
            📢 {snapshot.announcement.author}
          </span>
          <p className="text-sm font-black text-white mt-0.5">{snapshot.announcement.message}</p>
        </div>
      )}

      {/* Screen Routing */}
      {showLevelOne && role === 'login' && (
        <LevelOneChallenge onComplete={handleLevelOneComplete} />
      )}

      {role === 'login' && !showLevelOne && (
        <LoginScreen
          onJoinRoom={handleJoinRoom}
          onAdminLogin={handleAdminLogin}
          onOpenAudience={handleOpenAudience}
        />
      )}

      {role === 'player' && myTeamId && (
        <PlayerGameView
          roomCode={roomCode}
          phase={currentPhase}
          myTeamId={myTeamId}
          playerName={playerName}
          myTeamState={snapshot?.myTeamState}
          leaderboard={leaderboard}
          timeRemainingSec={timeRemainingSec}
          unlockedGates={unlockedGates}
          onSubmitAnswer={handleSubmitAnswer}
          onRequestMove={handleRequestMove}
          onLeaveTeam={handleLogout}
        />
      )}

      {role === 'admin' && (
        <AdminDashboard
          roomCode={roomCode}
          phase={currentPhase}
          timeRemainingSec={timeRemainingSec}
          leaderboard={leaderboard}
          adminSpectatorTeams={snapshot?.adminSpectatorTeams}
          unlockedGates={unlockedGates}
          onStartGame={handleStartGame}
          onResetGame={handleResetGame}
          onGiveKey={handleGiveKey}
          onTeleportPlayer={handleTeleportPlayer}
          onApproveBlock={handleApproveBlock}
          keysRemaining={snapshot?.keysRemaining ?? 50}
          pendingBlockRequests={snapshot?.pendingBlockRequests ?? []}
          onAnnouncement={handleAnnouncement}
          onOpenAudienceView={() => handleOpenAudience(roomCode)}
          onLogout={handleLogout}
        />
      )}

      {role === 'audience' && (
        <AudienceView
          roomCode={roomCode}
          phase={currentPhase}
          timeRemainingSec={timeRemainingSec}
          leaderboard={leaderboard}
          adminSpectatorTeams={snapshot?.adminSpectatorTeams}
          unlockedGates={unlockedGates}
          onExitAudience={handleLogout}
        />
      )}
    </div>
  );
}
