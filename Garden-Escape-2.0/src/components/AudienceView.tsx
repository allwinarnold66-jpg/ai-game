import React, { useEffect } from 'react';
import {
  GamePhase,
  LeaderboardEntry,
  AdminSpectatorPlayer,
  TeamId,
} from '../types/game';
import { TEAMS_META } from '../data/mazeData';
import { MazeCanvas } from './MazeCanvas';
import confetti from 'canvas-confetti';
import { Trophy, Tv, Clock, Sparkles } from 'lucide-react';

interface AudienceViewProps {
  roomCode?: string;
  phase?: GamePhase;
  timeRemainingSec?: number;
  leaderboard: LeaderboardEntry[];
  adminSpectatorTeams?: Record<TeamId, AdminSpectatorPlayer>;
  unlockedGates?: string[];
  onExitAudience?: () => void;
  // Legacy compatibility props
  gameState?: any;
}

export const AudienceView: React.FC<AudienceViewProps> = ({
  roomCode = 'GARDEN123',
  phase = 'RACE',
  timeRemainingSec = 0,
  leaderboard,
  adminSpectatorTeams,
  unlockedGates = [],
  onExitAudience,
}) => {
  // Trigger celebratory confetti when someone finishes
  useEffect(() => {
    const hasFinisher = leaderboard.some((e) => e.finished);
    if (hasFinisher || phase === 'FINISHED') {
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.6 },
      });
    }
  }, [leaderboard, phase]);

  const mins = Math.floor(timeRemainingSec / 60);
  const secs = timeRemainingSec % 60;
  const timerDisplay = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

  const topFinisher = leaderboard.find((e) => e.finished);

  return (
    <div className="flex flex-col h-screen w-screen bg-slate-950 text-slate-100 overflow-hidden font-sans select-none">
      {/* Top TV/Projector Banner */}
      <header className="h-20 bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 border-b border-emerald-900/50 px-8 flex items-center justify-between shrink-0 shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-amber-500 flex items-center justify-center text-2xl shadow-lg shadow-emerald-500/30 font-black">
            🌿
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight text-white flex items-center gap-3">
              GARDEN ESCAPE 3D
              <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-extrabold border border-emerald-500/40">
                LIVE PROJECTOR ARENA • ROOM {roomCode}
              </span>
            </h1>
            <p className="text-xs text-emerald-300/80 font-bold">
              HR • MARKETING • FINANCE • OPERATIONS
            </p>
          </div>
        </div>

        {/* Global Timer & Status Display */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 bg-slate-900/90 px-5 py-2 rounded-2xl border border-emerald-800/60 shadow-inner">
            <span
              className={`w-3.5 h-3.5 rounded-full ${
                phase === 'RACE'
                  ? 'bg-emerald-400 animate-ping'
                  : phase === 'STUDY'
                  ? 'bg-amber-400 animate-pulse'
                  : 'bg-slate-500'
              }`}
            />
            <span className="text-sm font-black uppercase tracking-wider text-slate-200">
              {phase === 'STUDY' ? '20s STUDY' : phase === 'RACE' ? `RACE: ${timerDisplay}` : phase}
            </span>
          </div>

          {onExitAudience && (
            <button
              onClick={onExitAudience}
              className="text-xs text-slate-400 hover:text-white px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700 transition"
            >
              Exit View
            </button>
          )}
        </div>
      </header>

      {/* Main View Area */}
      <div className="flex-1 flex overflow-hidden p-6 gap-6">
        {/* Left: 3D Overhead Spectator Canvas */}
        <div className="flex-1 flex flex-col bg-slate-900/80 rounded-3xl border-2 border-slate-800 p-4 shadow-2xl overflow-hidden">
          <div className="flex items-center justify-between pb-3 px-2">
            <div className="flex items-center gap-3">
              <span className="text-xl font-black text-emerald-300">
                🌿 Royal Garden Championship Maze
              </span>
              <span className="text-xs text-slate-400 font-bold">
                (25x25 Synchronized Arena)
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-amber-400 px-3 py-1 rounded-xl bg-amber-500/10 border border-amber-500/30">
                4 Team Start Plazas • Central Victory Gazebo
              </span>
            </div>
          </div>

          <div className="flex-1 relative rounded-2xl overflow-hidden bg-slate-950">
            <MazeCanvas
              roomCode={roomCode}
              phase={phase}
              adminSpectatorTeams={adminSpectatorTeams}
              unlockedGates={unlockedGates}
              isAdmin={true}
              timeRemainingSec={timeRemainingSec}
            />
          </div>
        </div>

        {/* Right: Live Tournament Leaderboard */}
        <div className="w-96 flex flex-col gap-6 shrink-0">
          {/* Winner Banner if someone finished */}
          {topFinisher && (
            <div className="bg-gradient-to-br from-amber-500/20 via-amber-600/10 to-transparent border-2 border-amber-500/60 rounded-3xl p-5 shadow-2xl text-center space-y-2 animate-in zoom-in-95 duration-300">
              <div className="text-3xl">👑</div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400">
                FIRST FINISHER!
              </span>
              <h2 className="text-2xl font-black text-white">
                TEAM {topFinisher.teamId} REACHED FINISH!
              </h2>
              <p className="text-xs text-amber-200/80 font-semibold">
                Clocked in at {topFinisher.formattedTime}. Other teams continue until race deadline!
              </p>
            </div>
          )}

          {/* LEADERBOARD CARD */}
          <div className="flex-1 bg-slate-900/90 rounded-3xl border-2 border-slate-800 p-6 shadow-2xl flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h2 className="text-sm font-black uppercase tracking-wider text-amber-400 flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-400" />
                Live Standings
              </h2>
              <span className="text-xs text-slate-400 font-bold">4 Teams</span>
            </div>

            <div className="space-y-3 mt-4 flex-1">
              {leaderboard.map((entry) => {
                const meta = TEAMS_META[entry.teamId];
                return (
                  <div
                    key={entry.teamId}
                    style={{ borderColor: `${meta.primaryColor}55` }}
                    className={`p-4 rounded-2xl border-2 flex items-center justify-between transition-all ${
                      entry.rank === 1
                        ? 'bg-amber-500/10 border-amber-500/60 shadow-lg shadow-amber-500/10'
                        : 'bg-slate-800/40 border-slate-700/60'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-7 h-7 rounded-xl flex items-center justify-center font-black text-xs ${
                          entry.rank === 1
                            ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/40'
                            : 'bg-slate-700 text-slate-200'
                        }`}
                      >
                        {entry.rank}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            style={{ color: meta.primaryColor }}
                            className="font-black text-base"
                          >
                            {meta.label}
                          </span>
                          {entry.finished && (
                            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-black px-2 py-0.5 rounded-full border border-emerald-500/40">
                              FINISH
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-slate-400 font-semibold block mt-0.5">
                          {entry.playerName} • CP {entry.checkpointIndex}/3
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-base font-black text-emerald-400">
                        {entry.score} pts
                      </span>
                      <span className="text-[11px] block font-bold text-amber-400">
                        🔑 {entry.keys} Keys
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudienceView;
