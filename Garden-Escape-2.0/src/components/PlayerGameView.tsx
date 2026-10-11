import React, { useState } from 'react';
import {
  TeamId,
  GamePhase,
  RelativeDirection,
  PlayerPrivateState,
  LeaderboardEntry,
  PublicQuestion,
} from '../types/game';
import { TEAMS_META } from '../data/mazeData';
import { MazeCanvas } from './MazeCanvas';
import { sound } from '../utils/audio';
import {
  Key,
  Clock,
  Flag,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  HelpCircle,
  CheckCircle2,
  XCircle,
  Trophy,
} from 'lucide-react';

interface PlayerGameViewProps {
  roomCode: string;
  phase: GamePhase;
  myTeamId: TeamId;
  playerName: string;
  myTeamState?: PlayerPrivateState;
  leaderboard: LeaderboardEntry[];
  timeRemainingSec: number;
  unlockedGates: string[];
  onSubmitAnswer: (questionId: string, selectedOption: number) => void;
  onRequestMove: (direction: RelativeDirection) => void;
  onLeaveTeam: () => void;
}

export const PlayerGameView: React.FC<PlayerGameViewProps> = ({
  roomCode,
  phase,
  myTeamId,
  playerName,
  myTeamState,
  leaderboard,
  timeRemainingSec,
  unlockedGates,
  onSubmitAnswer,
  onRequestMove,
  onLeaveTeam,
}) => {
  const meta = TEAMS_META[myTeamId];
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const toggleMute = () => {
    setIsMuted(!isMuted);
    sound.toggleMute();
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const handleOptionSelect = (idx: number) => {
    setSelectedOption(idx);
    sound.playKeyPickup();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedOption === null || !myTeamState?.currentQuestion) return;
    onSubmitAnswer(myTeamState.currentQuestion.id, selectedOption);
    setSelectedOption(null);
  };

  const handleDirectionClick = (dir: RelativeDirection) => {
    sound.playStep();
    onRequestMove(dir);
  };

  // Format MM:SS
  const mins = Math.floor(timeRemainingSec / 60);
  const secs = timeRemainingSec % 60;
  const timerDisplay = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

  const hasPendingMove = myTeamState?.hasPendingMove ?? false;
  const validDirections = myTeamState?.validDirections ?? [];
  const currentQuestion = myTeamState?.currentQuestion;

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-slate-950 font-sans select-none">
      {/* 1. Realistic Three.js 3D Garden Maze View */}
      <div className="absolute inset-0 z-0">
        <MazeCanvas
          roomCode={roomCode}
          phase={phase}
          myTeamId={myTeamId}
          myTeamState={myTeamState}
          unlockedGates={unlockedGates}
          isAdmin={false}
          timeRemainingSec={timeRemainingSec}
        />
      </div>

      {/* 2. Top Player HUD */}
      <header className="absolute top-0 left-0 right-0 z-20 p-4 md:p-6 flex items-center justify-between pointer-events-none">
        {/* Left: Team Identity Badge */}
        <div className="flex items-center gap-3 bg-slate-900/85 backdrop-blur-xl border border-slate-700/80 px-4 py-2.5 rounded-2xl shadow-2xl pointer-events-auto">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-white text-base shadow-md"
            style={{ backgroundColor: meta.primaryColor }}
          >
            {meta.badge}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-black text-white tracking-wide">{meta.label}</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-bold border border-slate-700">
                {roomCode}
              </span>
            </div>
            <div className="text-xs text-slate-400 font-semibold">Level 2 · {playerName}</div>
          </div>
        </div>

        {/* Center: Authoritative 30-Minute Race Timer */}
        <div className="bg-slate-900/90 backdrop-blur-xl border-2 border-indigo-500/60 px-6 py-2.5 rounded-2xl shadow-2xl flex items-center gap-3 pointer-events-auto">
          <Clock className="w-5 h-5 text-indigo-400 animate-pulse" />
          <div className="text-center">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block leading-tight">
              {phase === 'STUDY' ? 'MAZE STUDY' : phase === 'RACE' ? 'RACE TIMER' : 'RACE DEADLINE'}
            </span>
            <span
              className={`text-xl font-black font-mono tracking-tight ${
                timeRemainingSec < 120 ? 'text-rose-400 animate-pulse' : 'text-white'
              }`}
            >
              {timerDisplay}
            </span>
          </div>
        </div>

        {/* Lives remain visible at the top throughout each team's game. */}
        <div className="flex items-center gap-1.5 bg-slate-900/90 backdrop-blur-xl border border-rose-500/50 px-2 py-1.5 rounded-xl shadow-xl pointer-events-auto">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-300">LIVES</span>
          <span aria-label={`${myTeamState?.lives ?? 5} lives remaining`} className="text-base tracking-widest">{Array.from({length: 5}, (_, i) => i < (myTeamState?.lives ?? 5) ? '❤️' : '🖤').join(' ')}</span>
        </div>

        {/* Right: Score, Keys, Checkpoints & Controls */}
        <div className="flex items-center gap-3 pointer-events-auto">
          {/* Key Counter */}
          <div className="flex items-center gap-2 bg-slate-900/85 backdrop-blur-xl border border-amber-500/40 px-3.5 py-2.5 rounded-2xl shadow-xl">
            <Key className="w-4 h-4 text-amber-400" />
            <div className="text-xs font-black text-amber-300">
              {myTeamState?.keys ?? 0} <span className="text-[10px] text-slate-400 font-bold">KEYS</span>
            </div>
          </div>

          {/* Checkpoint Counter */}
          <div className="flex items-center gap-2 bg-slate-900/85 backdrop-blur-xl border border-sky-500/40 px-3.5 py-2.5 rounded-2xl shadow-xl">
            <Flag className="w-4 h-4 text-sky-400" />
            <div className="text-xs font-black text-sky-300">
              CP {myTeamState?.checkpointIndex ?? 0}/3
            </div>
          </div>

          {/* Score Counter */}
          <div className="flex items-center gap-2 bg-slate-900/85 backdrop-blur-xl border border-emerald-500/40 px-4 py-2.5 rounded-2xl shadow-xl">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <div className="text-sm font-black text-emerald-300">
              {myTeamState?.score ?? 0} <span className="text-[10px] text-slate-400 font-bold">PTS</span>
            </div>
          </div>

          {/* Audio & Fullscreen Buttons */}
          <button
            onClick={toggleMute}
            className="p-2.5 rounded-2xl bg-slate-900/85 backdrop-blur-xl border border-slate-700/80 text-slate-300 hover:text-white transition shadow-xl"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-indigo-400" />}
          </button>
          <button
            onClick={toggleFullscreen}
            className="p-2.5 rounded-2xl bg-slate-900/85 backdrop-blur-xl border border-slate-700/80 text-slate-300 hover:text-white transition shadow-xl"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* 3. Bottom Player Action Dock (Questions & Directional Controls) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 w-full max-w-2xl px-4 pointer-events-auto">
        {/* State A: LOBBY Phase */}
        {phase === 'LOBBY' && (
          <div className="bg-slate-900/90 backdrop-blur-2xl border-2 border-indigo-500/60 rounded-3xl p-6 shadow-2xl text-center">
            <h3 className="text-lg font-black text-white flex items-center justify-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-400 animate-ping" />
              Lobby: Waiting for Referee to Start Game
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Room Code: <span className="font-mono font-bold text-indigo-400">{roomCode}</span>.
              All 4 teams should connect before the synchronized 20-second study phase begins.
            </p>
          </div>
        )}

        {/* State B: STUDY Phase */}
        {phase === 'STUDY' && (
          <div className="bg-slate-900/90 backdrop-blur-2xl border-2 border-emerald-500/80 rounded-3xl p-6 shadow-2xl text-center animate-in zoom-in-95">
            <span className="text-[11px] font-black uppercase tracking-widest text-emerald-400">
              🌿 Phase 2: Synchronized 20s Maze Study
            </span>
            <h3 className="text-xl font-black text-white mt-1">
              Study the Maze Layout from Above!
            </h3>
            <p className="text-xs text-slate-300 mt-1 max-w-lg mx-auto">
              Look for the garden corridors, the key alcoves in the 4 corners, and the central Royal Gazebo finish.
              Movement unlocks when the race begins in <b className="text-emerald-400">{timeRemainingSec}s</b>.
            </p>
          </div>
        )}

        {/* State C: RACE Phase — Answer & Movement Loop */}
        {phase === 'RACE' && (
          <div className="bg-slate-900/95 backdrop-blur-2xl border-2 border-slate-700/80 rounded-3xl p-5 md:p-6 shadow-2xl">
            {/* Condition 1: Player Finished */}
            {myTeamState?.finished ? (
              <div className="text-center py-4 space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-black border border-amber-500/40">
                  <Trophy className="w-4 h-4 text-amber-400" />
                  Finished — Rank #{myTeamState.finishRank}
                </div>
                <h3 className="text-2xl font-black text-white">Congratulations, {meta.label}!</h3>
                <p className="text-xs text-slate-300">
                  You successfully navigated the garden maze and reached the championship finish in{' '}
                  <b className="text-amber-400">
                    {Math.floor((myTeamState.finishTimeMs || 0) / 60000)}m{' '}
                    {Math.floor(((myTeamState.finishTimeMs || 0) % 60000) / 1000)}s
                  </b>
                  . Other teams continue until the 30-minute race deadline!
                </p>
              </div>
            ) : hasPendingMove ? (
              /* Condition 2: Question answered correctly -> Unlocks Direction Movement */
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2 text-emerald-400 font-black text-sm">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span>✓ CORRECT! Choose your direction to move:</span>
                  </div>
                  <span className="text-[11px] font-bold text-slate-400 bg-slate-800 px-2.5 py-1 rounded-lg">
                    +10 pts per step
                  </span>
                </div>

                {myTeamState?.lastAnswerResult?.explanation && (
                  <p className="text-xs text-slate-300 italic bg-emerald-950/30 border border-emerald-800/40 p-2.5 rounded-xl">
                    💡 {myTeamState.lastAnswerResult.explanation}
                  </p>
                )}

                {/* First-Person Direction Pad */}
                <div className="flex flex-col items-center justify-center gap-2 py-2">
                  {/* FORWARD */}
                  <button
                    disabled={!validDirections.includes('FORWARD')}
                    onClick={() => handleDirectionClick('FORWARD')}
                    className={`px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-wider flex items-center gap-2 transition shadow-xl active:scale-95 ${
                      validDirections.includes('FORWARD')
                        ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 cursor-pointer shadow-emerald-500/30'
                        : 'bg-slate-800/60 text-slate-600 border border-slate-700/50 cursor-not-allowed opacity-50'
                    }`}
                  >
                    <ArrowUp className="w-4 h-4" /> ⬆ FORWARD
                  </button>

                  {/* LEFT and RIGHT */}
                  <div className="flex items-center gap-4">
                    <button
                      disabled={!validDirections.includes('LEFT')}
                      onClick={() => handleDirectionClick('LEFT')}
                      className={`px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-wider flex items-center gap-2 transition shadow-xl active:scale-95 ${
                        validDirections.includes('LEFT')
                          ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 cursor-pointer shadow-emerald-500/30'
                          : 'bg-slate-800/60 text-slate-600 border border-slate-700/50 cursor-not-allowed opacity-50'
                      }`}
                    >
                      <ArrowLeft className="w-4 h-4" /> ⬅ LEFT
                    </button>

                    <button
                      disabled={!validDirections.includes('RIGHT')}
                      onClick={() => handleDirectionClick('RIGHT')}
                      className={`px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-wider flex items-center gap-2 transition shadow-xl active:scale-95 ${
                        validDirections.includes('RIGHT')
                          ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 cursor-pointer shadow-emerald-500/30'
                          : 'bg-slate-800/60 text-slate-600 border border-slate-700/50 cursor-not-allowed opacity-50'
                      }`}
                    >
                      ➡ RIGHT <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* BACKWARD */}
                  <button
                    disabled={!validDirections.includes('BACKWARD')}
                    onClick={() => handleDirectionClick('BACKWARD')}
                    className={`px-8 py-2.5 rounded-2xl font-black text-xs uppercase tracking-wider flex items-center gap-2 transition shadow-xl active:scale-95 ${
                      validDirections.includes('BACKWARD')
                        ? 'bg-slate-700 hover:bg-slate-600 text-slate-100 cursor-pointer'
                        : 'bg-slate-800/60 text-slate-600 border border-slate-700/50 cursor-not-allowed opacity-50'
                    }`}
                  >
                    <ArrowDown className="w-4 h-4" /> ⬇ BACKWARD
                  </button>
                </div>
              </div>
            ) : currentQuestion ? (
              /* Condition 3: Question Display Card */
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Previous answer feedback if wrong */}
                {myTeamState?.lastAnswerResult?.correct === false && (
                  <div className="flex items-start gap-2 bg-rose-950/40 border border-rose-800/50 p-2.5 rounded-xl text-xs text-rose-300">
                    <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold">Incorrect answer — no movement awarded.</span>{' '}
                      {myTeamState.lastAnswerResult.explanation}
                    </div>
                  </div>
                )}

                {/* Question Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-md text-slate-950"
                      style={{ backgroundColor: meta.primaryColor }}
                    >
                      {currentQuestion.category}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Difficulty: {currentQuestion.difficulty}
                    </span>
                  </div>
                  <span className="text-[11px] font-black text-emerald-400">+100 PTS</span>
                </div>

                {/* Question Text */}
                <div className="text-sm md:text-base font-bold text-white leading-snug">
                  {currentQuestion.question}
                </div>

                {/* 4 Options Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {currentQuestion.options.map((opt, idx) => {
                    const isSel = selectedOption === idx;
                    const letter = ['A', 'B', 'C', 'D'][idx];
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleOptionSelect(idx)}
                        className={`text-left p-3 rounded-2xl border text-xs md:text-sm font-semibold transition active:scale-95 flex items-start gap-2.5 ${
                          isSel
                            ? 'bg-indigo-600/30 border-indigo-400 text-white shadow-lg shadow-indigo-600/20'
                            : 'bg-slate-800/60 border-slate-700/80 text-slate-200 hover:bg-slate-800 hover:border-slate-600'
                        }`}
                      >
                        <span
                          className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-black shrink-0 ${
                            isSel ? 'bg-indigo-400 text-slate-950' : 'bg-slate-700 text-slate-300'
                          }`}
                        >
                          {letter}
                        </span>
                        <span className="leading-tight">{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Submit Action */}
                <div className="flex items-center justify-end pt-1">
                  <button
                    type="submit"
                    disabled={selectedOption === null}
                    className={`px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-wider transition shadow-xl active:scale-95 ${
                      selectedOption !== null
                        ? 'bg-indigo-500 hover:bg-indigo-400 text-white cursor-pointer shadow-indigo-500/30'
                        : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    Submit Answer & Unlock Step
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-4 text-slate-400 text-sm">
                Loading next team question from referee server...
              </div>
            )}
          </div>
        )}

        {/* State D: FINISHED Phase */}
        {phase === 'FINISHED' && (
          <div className="bg-slate-900/95 backdrop-blur-2xl border-2 border-amber-500/80 rounded-3xl p-6 shadow-2xl text-center space-y-4 animate-in zoom-in-95">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-black border border-amber-500/40">
              <Trophy className="w-4 h-4 text-amber-400" />
              Tournament Concluded
            </div>
            <h3 className="text-2xl font-black text-white">Championship Final Results</h3>
            <div className="grid grid-cols-4 gap-2 max-w-lg mx-auto">
              {leaderboard.map((team) => (
                <div
                  key={team.teamId}
                  className="bg-slate-800/80 p-3 rounded-2xl border border-slate-700 text-center"
                >
                  <div className="text-lg font-black text-amber-400">#{team.rank}</div>
                  <div className="text-xs font-bold text-white mt-0.5">{team.teamId}</div>
                  <div className="text-xs font-black text-emerald-400 mt-1">{team.score} pts</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayerGameView;
