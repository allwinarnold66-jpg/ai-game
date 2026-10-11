import React, { useState } from 'react';
import {
  TeamId,
  GamePhase,
  LeaderboardEntry,
  AdminSpectatorPlayer,
} from '../types/game';
import { TEAMS_META } from '../data/mazeData';
import { MazeCanvas } from './MazeCanvas';
import {
  Play,
  RotateCcw,
  Key,
  Plus,
  Megaphone,
  Tv,
  Users,
  Eye,
  Clock,
  Sparkles,
  Trophy,
  Copy,
  Check,
} from 'lucide-react';

interface AdminDashboardProps {
  roomCode: string;
  phase: GamePhase;
  timeRemainingSec: number;
  leaderboard: LeaderboardEntry[];
  adminSpectatorTeams?: Record<TeamId, AdminSpectatorPlayer>;
  unlockedGates?: string[];
  events?: { id: string; time: string; level: string; message: string }[];
  onStartGame: () => void;
  onResetGame: () => void;
  onGiveKey: (teamId: TeamId, amount: number) => void;
  onTeleportPlayer?: (teamId: TeamId, x: number, y: number) => void;
  onApproveBlock?: (teamId: TeamId, gateId: string) => void;
  keysRemaining?: number;
  pendingBlockRequests?: { teamId: TeamId; gateId: string; x: number; y: number; requestedAt: number }[];
  onAnnouncement: (message: string) => void;
  onOpenAudienceView: () => void;
  onLogout: () => void;
  // Legacy compatibility props
  gameState?: any;
  onPauseGame?: () => void;
  onResumeGame?: () => void;
  onRestartGame?: () => void;
  onUnlockLevel?: (level: number) => void;
  onRemoveKey?: (teamId: TeamId, amount: number) => void;
  onApproveObstacle?: (teamId: TeamId, obstacleId: string) => void;
  onResetPlayer?: (teamId: TeamId) => void;
  onKickPlayer?: (teamId: TeamId) => void;
}


const TeleportControls: React.FC<{ teamId: TeamId; onTeleportPlayer?: (teamId: TeamId, x: number, y: number) => void }> = ({ teamId, onTeleportPlayer }) => {
  const [x, setX] = useState('1'); const [y, setY] = useState('1');
  return <form className="flex flex-wrap items-center gap-2 rounded-lg bg-slate-950 p-3" onSubmit={(e) => { e.preventDefault(); const nx = Number(x), ny = Number(y); if (Number.isInteger(nx) && Number.isInteger(ny)) onTeleportPlayer?.(teamId, nx, ny); }}>
    <strong className="w-24 text-sm text-slate-200">{teamId}</strong>
    <label className="text-xs text-slate-400">X <input aria-label={`${teamId} X coordinate`} type="number" min="0" max="30" value={x} onChange={(e) => setX(e.target.value)} className="ml-1 w-16 rounded bg-slate-800 p-2 text-white" /></label>
    <label className="text-xs text-slate-400">Y <input aria-label={`${teamId} Y coordinate`} type="number" min="0" max="30" value={y} onChange={(e) => setY(e.target.value)} className="ml-1 w-16 rounded bg-slate-800 p-2 text-white" /></label>
    <button type="submit" className="rounded-lg bg-indigo-600 px-3 py-2 text-xs font-bold text-white">Move player</button>
  </form>;
};

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  roomCode,
  phase,
  timeRemainingSec,
  leaderboard,
  adminSpectatorTeams,
  unlockedGates = [],
  events = [],
  onStartGame,
  onResetGame,
  onGiveKey,
  onTeleportPlayer,
  onApproveBlock,
  keysRemaining = 50,
  pendingBlockRequests = [],
  onAnnouncement,
  onOpenAudienceView,
  onLogout,
}) => {
  const [activeTab, setActiveTab] = useState<'control' | 'live_3d'>('control');
  const [announcementInput, setAnnouncementInput] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const teamList: TeamId[] = ['HR', 'MARKETING', 'FINANCE', 'OPERATIONS'];

  const handleSendAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!announcementInput.trim()) return;
    onAnnouncement(announcementInput.trim());
    setAnnouncementInput('');
  };

  const copyRoomInvite = () => {
    const inviteText = `Join Garden Escape! Room Code: ${roomCode}`;
    navigator.clipboard.writeText(inviteText);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Format MM:SS
  const mins = Math.floor(timeRemainingSec / 60);
  const secs = timeRemainingSec % 60;
  const timerDisplay = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

  const connectedCount = teamList.filter(
    (tid) => adminSpectatorTeams && adminSpectatorTeams[tid]?.connected
  ).length;

  return (
    <div className="flex flex-col h-screen bg-slate-950 text-slate-100 font-sans overflow-hidden select-none">
      {/* Top Header */}
      <header className="h-16 bg-slate-900 border-b border-slate-800 px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-indigo-600 flex items-center justify-center font-black text-xl shadow-lg">
            🌿
          </div>
          <div>
            <h1 className="text-lg font-black tracking-tight text-white flex items-center gap-2">
              REFEREE ADMIN CONSOLE
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-extrabold border border-emerald-500/30">
                ROOM: {roomCode}
              </span>
            </h1>
            <p className="text-xs text-slate-400 font-medium">Authoritative 5-Device Tournament Engine</p>
          </div>
        </div>

        {/* Global Controls & Status */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-800 px-3.5 py-1.5 rounded-xl border border-slate-700">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                phase === 'RACE'
                  ? 'bg-emerald-400 animate-ping'
                  : phase === 'STUDY'
                  ? 'bg-amber-400 animate-pulse'
                  : phase === 'FINISHED'
                  ? 'bg-indigo-400'
                  : 'bg-slate-500'
              }`}
            />
            <span className="text-xs uppercase font-extrabold tracking-wider text-slate-200">
              PHASE: {phase} {phase !== 'LOBBY' && `(${timerDisplay})`}
            </span>
          </div>

          <button
            onClick={copyRoomInvite}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold rounded-xl transition border border-slate-700 flex items-center gap-1.5"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copiedLink ? 'Copied!' : 'Copy Room Code'}
          </button>

          <button
            onClick={onOpenAudienceView}
            className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 shadow-md shadow-indigo-600/20"
          >
            <Tv className="w-3.5 h-3.5" />
            Projector Stream
          </button>

          <button
            onClick={onLogout}
            className="px-3 py-1.5 bg-slate-800 hover:bg-rose-900/40 text-slate-400 hover:text-rose-300 text-xs font-bold rounded-xl transition border border-slate-700"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Tab Switcher */}
      <div className="h-12 bg-slate-900/60 border-b border-slate-800 px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('control')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'control'
                ? 'bg-slate-800 text-white border border-slate-700 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5 text-indigo-400" />
            Match Controls & Team Status
          </button>

          <button
            onClick={() => setActiveTab('live_3d')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'live_3d'
                ? 'bg-slate-800 text-white border border-slate-700 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5 text-emerald-400" />
            Live 3D Garden Spectator ({phase})
          </button>
        </div>

        {/* Start Game Action */}
        {phase === 'LOBBY' && (
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400 font-bold">
              Teams Joined: <b className="text-emerald-400">{connectedCount}/4</b>
            </span>
            <button
              onClick={onStartGame}
              disabled={connectedCount < 4}
              className={`px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 transition shadow-xl active:scale-95 ${
                connectedCount === 4
                  ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 cursor-pointer shadow-emerald-500/30'
                  : 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
              }`}
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              Start Synchronized Game (20s Study + 30m Race)
            </button>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      {activeTab === 'control' ? (
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Top Quick Actions Bar */}
          <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              {showResetConfirm ? (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-rose-400 font-bold">Reset entire match to Lobby?</span>
                  <button
                    onClick={() => {
                      onResetGame();
                      setShowResetConfirm(false);
                    }}
                    className="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-black rounded-lg transition"
                  >
                    Confirm Reset
                  </button>
                  <button
                    onClick={() => setShowResetConfirm(false)}
                    className="px-3 py-1.5 bg-slate-800 text-slate-300 text-xs font-bold rounded-lg transition"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowResetConfirm(true)}
                  className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl border border-slate-700 transition flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-rose-400" />
                  Reset Match
                </button>
              )}
            </div>

            {/* Broadcast Announcement Bar */}
            <form onSubmit={handleSendAnnouncement} className="flex items-center gap-2 flex-1 max-w-lg">
              <input
                type="text"
                placeholder="Broadcast referee announcement to all players..."
                value={announcementInput}
                onChange={(e) => setAnnouncementInput(e.target.value)}
                className="bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-1.5 text-xs text-white placeholder-slate-500 w-full focus:outline-none focus:border-indigo-500"
              />
              <button
                type="submit"
                className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 shrink-0"
              >
                <Megaphone className="w-3.5 h-3.5" />
                Broadcast
              </button>
            </form>
          </div>

          <section className="mb-4 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 flex flex-wrap items-center justify-between gap-3">
            <div><h3 className="font-black text-amber-200">Admin key inventory</h3><p className="text-xs text-slate-300">Shared pool: {keysRemaining} / 50 keys remaining. Awards reduce this pool.</p></div>
            <span className="rounded-lg bg-slate-950 px-3 py-2 text-sm font-black text-amber-300">🔑 {keysRemaining} keys</span>
          </section>
          <section className="mb-4 rounded-xl border border-indigo-500/30 bg-slate-900 p-4">
            <h3 className="font-black text-white mb-3">Level 3 — Admin movement controls</h3>
            <p className="text-xs text-slate-400 mb-3">Enter a valid maze cell (X/Y). The server rejects walls and out-of-range coordinates.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">{teamList.map((tid) => <TeleportControls key={tid} teamId={tid} onTeleportPlayer={onTeleportPlayer} />)}</div>
          </section>
          <section className="mb-4 rounded-xl border border-rose-500/30 bg-slate-900 p-4">
            <h3 className="font-black text-white mb-3">Block approval requests</h3>
            {pendingBlockRequests.length === 0 ? <p className="text-xs text-slate-400">No teams are waiting at locked blocks.</p> : <div className="space-y-2">{pendingBlockRequests.map((request) => <div key={`${request.teamId}-${request.gateId}`} className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-slate-950 p-3"><span className="text-sm text-slate-200">{request.teamId} reached {request.gateId} at ({request.x}, {request.y})</span><button onClick={() => onApproveBlock?.(request.teamId, request.gateId)} disabled={keysRemaining < 1} className="rounded-lg bg-amber-500 px-3 py-2 text-xs font-black text-slate-950 disabled:opacity-40">Approve + issue key</button></div>)}</div>}
          </section>

          {/* 4 Team Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {teamList.map((tid) => {
              const meta = TEAMS_META[tid];
              const p = adminSpectatorTeams ? adminSpectatorTeams[tid] : undefined;
              const isConn = p?.connected ?? false;

              return (
                <div
                  key={tid}
                  className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl relative overflow-hidden"
                >
                  <div
                    className="absolute top-0 left-0 right-0 h-1.5"
                    style={{ backgroundColor: meta.primaryColor }}
                  />

                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs text-white"
                        style={{ backgroundColor: meta.primaryColor }}
                      >
                        {meta.badge}
                      </div>
                      <div>
                        <h4 className="text-sm font-black text-white">{meta.label}</h4>
                        <span className="text-[10px] text-slate-400 font-semibold">
                          {p?.playerName || 'Unassigned'}
                        </span>
                      </div>
                    </div>

                    <span
                      className={`text-[10px] font-black px-2 py-0.5 rounded-full border ${
                        isConn
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                          : 'bg-slate-800 text-slate-500 border-slate-700'
                      }`}
                    >
                      {isConn ? 'Connected' : 'Offline'}
                    </span>
                  </div>

                  {/* Player Stats */}
                  <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-800/80 my-2 text-center">
                    <div>
                      <span className="text-[10px] text-slate-500 block font-bold">SCORE</span>
                      <span className="text-sm font-black text-emerald-400">{p?.score ?? 0}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block font-bold">KEYS</span>
                      <span className="text-sm font-black text-amber-400">{p?.keys ?? 0}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block font-bold">CHECKPOINT</span>
                      <span className="text-sm font-black text-sky-400">CP {p?.checkpointIndex ?? 0}/3</span>
                    </div>
                  </div>

                  {/* Quick Referee Actions for this Team */}
                  <div className="flex items-center justify-between pt-2">
                    <button
                      onClick={() => onGiveKey(tid, 1)}
                      disabled={keysRemaining < 1}
                      className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-amber-300 text-[11px] font-bold rounded-lg border border-slate-700 flex items-center gap-1 transition"
                    >
                      <Plus className="w-3 h-3" /> Award Key
                    </button>
                    {p?.finished && (
                      <span className="text-[11px] font-black text-amber-400 flex items-center gap-1">
                        <Trophy className="w-3.5 h-3.5" /> Rank #{p.finishRank}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Tournament Live Leaderboard Table */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h3 className="text-sm font-black text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-400" />
              Tournament Live Standings
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
                    <th className="py-2.5 px-3">Rank</th>
                    <th className="py-2.5 px-3">Team</th>
                    <th className="py-2.5 px-3">Player</th>
                    <th className="py-2.5 px-3">Score</th>
                    <th className="py-2.5 px-3">Keys</th>
                    <th className="py-2.5 px-3">Checkpoint</th>
                    <th className="py-2.5 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {leaderboard.map((entry) => (
                    <tr key={entry.teamId} className="hover:bg-slate-800/30">
                      <td className="py-3 px-3 font-black text-amber-400">#{entry.rank}</td>
                      <td className="py-3 px-3 font-bold text-white">{entry.teamName}</td>
                      <td className="py-3 px-3 text-slate-300">{entry.playerName}</td>
                      <td className="py-3 px-3 font-black text-emerald-400">{entry.score} pts</td>
                      <td className="py-3 px-3 font-bold text-amber-300">{entry.keys}</td>
                      <td className="py-3 px-3 text-sky-300">CP {entry.checkpointIndex}/3</td>
                      <td className="py-3 px-3">
                        <span
                          className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                            entry.finished
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                              : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {entry.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        /* Live 3D Garden Spectator Mode */
        <div className="flex-1 relative overflow-hidden bg-slate-950">
          <MazeCanvas
            roomCode={roomCode}
            phase={phase}
            adminSpectatorTeams={adminSpectatorTeams}
            unlockedGates={unlockedGates}
            isAdmin={true}
            timeRemainingSec={timeRemainingSec}
          />
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
