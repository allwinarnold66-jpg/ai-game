import React, { useState, useEffect } from 'react';
import { TeamId } from '../types/game';
import { TEAMS_META } from '../data/mazeData';
import { Lock, Tv, Sparkles, Trophy, RotateCcw, Key } from 'lucide-react';

interface LoginScreenProps {
  onJoinRoom: (roomCode: string, teamId: TeamId, playerName: string, reconnectToken?: string) => void;
  onAdminLogin: (roomCode: string, password?: string, token?: string) => void;
  onOpenAudience: (roomCode: string) => void;
  // Legacy compatibility props
  gameState?: any;
  onJoinTeam?: (teamId: TeamId, playerName: string) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onJoinRoom,
  onAdminLogin,
  onOpenAudience,
}) => {
  // Query param auto-fill
  const urlParams = new URLSearchParams(window.location.search);
  const initialRoom = urlParams.get('room') || localStorage.getItem('ge_room_code') || 'GARDEN123';

  const [roomCode, setRoomCode] = useState<string>(initialRoom.toUpperCase());
  const [selectedTeam, setSelectedTeam] = useState<TeamId | null>(null);
  const [playerName, setPlayerName] = useState<string>('');
  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);
  const [adminPass, setAdminPass] = useState<string>('');
  const [adminError, setAdminError] = useState<string | null>(null);
  const [joinError, setJoinError] = useState<string | null>(null);

  // Stored reconnection session
  const storedRoom = localStorage.getItem('ge_room_code');
  const storedTeam = localStorage.getItem('ge_team_id') as TeamId | null;
  const storedToken = localStorage.getItem('ge_reconnect_token');
  const storedPlayer = localStorage.getItem('ge_player_name');

  const hasSavedSession = storedRoom && storedTeam && storedToken;

  const teamList: TeamId[] = ['HR', 'MARKETING', 'FINANCE', 'OPERATIONS'];

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    setJoinError(null);

    const cleanCode = roomCode.trim().toUpperCase();
    if (!cleanCode) {
      setJoinError('Please enter a valid Room Code (e.g. GARDEN123)!');
      return;
    }
    if (!selectedTeam) {
      setJoinError('Please select a team role to represent!');
      return;
    }
    if (!playerName.trim()) {
      setJoinError('Please enter your player identification or nickname!');
      return;
    }

    onJoinRoom(cleanCode, selectedTeam, playerName.trim());
  };

  const handleQuickReconnect = () => {
    if (storedRoom && storedTeam && storedToken) {
      onJoinRoom(storedRoom, storedTeam, storedPlayer || `${storedTeam} Player`, storedToken);
    }
  };

  const handleAdminSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdminError(null);

    const cleanCode = roomCode.trim().toUpperCase();
    if (!cleanCode) {
      setAdminError('Please enter or verify the Room Code!');
      return;
    }
    if (!adminPass) {
      setAdminError('Please enter the Admin Master Password!');
      return;
    }

    onAdminLogin(cleanCode, adminPass);
  };

  return (
    <div className="min-h-screen w-screen bg-slate-950 flex flex-col items-center justify-center p-6 select-none font-sans relative overflow-hidden">
      {/* Aesthetic glowing background orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-emerald-600/15 blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-amber-500/15 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/3 w-80 h-80 rounded-full bg-indigo-500/15 blur-[100px] pointer-events-none" />

      {/* Reset local saved identity before selecting player/admin; server match reset remains an admin action. */}
      <div className="absolute top-6 left-6 flex items-center gap-3 z-20">
        <button onClick={() => { ['ge_role','ge_team_id','ge_reconnect_token','ge_admin_token','ge_player_name','ge_room_code'].forEach((k) => localStorage.removeItem(k)); setPlayerName(''); setSelectedTeam(null); setRoomCode('GARDEN123'); setJoinError(null); setAdminError(null); window.history.replaceState({}, '', window.location.pathname); }} className="px-4 py-2 rounded-2xl bg-rose-950/90 border border-rose-500/50 text-rose-200 text-xs font-black flex items-center gap-2 shadow-xl hover:bg-rose-900"><RotateCcw className="w-4 h-4"/> Reset / Clear Saved Login</button>
      </div>
      {/* Top action shortcuts */}
      <div className="absolute top-6 right-6 flex items-center gap-3 z-20">
        <button
          onClick={() => onOpenAudience(roomCode.trim().toUpperCase())}
          className="px-4 py-2 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-slate-700/80 text-slate-300 hover:text-white text-xs font-black transition flex items-center gap-2 shadow-xl hover:border-indigo-400 active:scale-95"
        >
          <Tv className="w-4 h-4 text-indigo-400" />
          Projector View
        </button>

        <button
          onClick={() => {
            setIsAdminMode(!isAdminMode);
            setAdminError(null);
            setJoinError(null);
          }}
          className={`px-4 py-2 rounded-2xl text-xs font-black transition flex items-center gap-2 border shadow-xl active:scale-95 ${
            isAdminMode
              ? 'bg-rose-500/20 text-rose-300 border-rose-500/50'
              : 'bg-slate-900/90 backdrop-blur-md border-slate-700/80 text-slate-300 hover:text-white'
          }`}
        >
          <Lock className="w-4 h-4 text-amber-400" />
          {isAdminMode ? 'Player Mode' : 'Admin Login'}
        </button>
      </div>

      {/* Main Glassmorphic Card Container */}
      <div className="relative w-full max-w-2xl bg-slate-900/80 backdrop-blur-2xl border-2 border-slate-700/80 rounded-3xl shadow-2xl p-8 md:p-10 z-10 overflow-hidden">
        {/* Top vibrant rainbow glow bar */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-emerald-400 via-sky-400 to-amber-500" />

        {/* Header Branding */}
        <div className="text-center space-y-2 mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-extrabold uppercase tracking-widest shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            3D Multiplayer Championship Maze
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white flex items-center justify-center gap-2">
            🌿 GARDEN ESCAPE
          </h1>
          <p className="text-xs md:text-sm text-slate-400 font-medium max-w-md mx-auto">
            {isAdminMode
              ? 'Referee Master Console — Control the 20s study & 30-minute race'
              : 'Complete Level 1 business reasoning, then enter the Level 2 3D garden maze.'}
          </p>
        </div>

        {/* Reconnect Banner if previous token exists */}
        {!isAdminMode && hasSavedSession && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 block">
                Active Session Detected
              </span>
              <p className="text-xs text-white font-bold">
                Resume as <span className="text-emerald-300">{storedPlayer}</span> ({storedTeam} in room {storedRoom})
              </p>
            </div>
            <button
              onClick={handleQuickReconnect}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs rounded-xl transition flex items-center gap-1.5 shadow-lg active:scale-95"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reconnect
            </button>
          </div>
        )}

        {/* --- VIEW A: PLAYER REGISTRATION & ROOM JOIN --- */}
        {!isAdminMode ? (
          <form onSubmit={handleJoin} className="space-y-6">
            {/* Room Code Input */}
            <div>
              <label className="text-xs font-black uppercase tracking-wider text-slate-300 block mb-2">
                Room Code (Must match across all 5 laptops)
              </label>
              <input
                type="text"
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                placeholder="e.g. GARDEN123"
                className="w-full bg-slate-950/80 border-2 border-slate-700/80 rounded-2xl px-5 py-3 text-base font-mono font-bold text-emerald-400 placeholder-slate-600 focus:outline-none focus:border-emerald-400 transition"
              />
            </div>

            {/* Team Role Selection */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-black uppercase tracking-wider text-slate-300">
                  Select Your Team Role (1 Laptop per Team)
                </label>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {teamList.map((tid) => {
                  const meta = TEAMS_META[tid];
                  const isSelected = selectedTeam === tid;

                  return (
                    <button
                      key={tid}
                      type="button"
                      onClick={() => {
                        setSelectedTeam(tid);
                        setJoinError(null);
                      }}
                      style={{
                        borderColor: isSelected ? meta.primaryColor : undefined,
                        boxShadow: isSelected ? `0 0 20px ${meta.primaryColor}50` : undefined,
                      }}
                      className={`p-4 rounded-2xl border-2 flex flex-col items-center justify-center text-center transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-slate-800/90 scale-105 ring-2 ring-white/40'
                          : 'bg-slate-950/70 border-slate-800 hover:border-slate-600 hover:bg-slate-800/60'
                      }`}
                    >
                      <div
                        style={{ backgroundColor: meta.primaryColor }}
                        className="w-12 h-12 rounded-2xl flex items-center justify-center text-slate-950 font-black text-lg shadow-lg mb-2"
                      >
                        {meta.badge}
                      </div>
                      <span className="text-sm font-black text-white">{tid}</span>
                      <span className="text-[10px] text-slate-400 mt-0.5 leading-tight font-semibold">
                        {meta.label.split(' ')[0]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Player Nickname */}
            <div>
              <label className="text-xs font-black uppercase tracking-wider text-slate-300 block mb-2">
                Player Nickname / Laptop ID
              </label>
              <input
                type="text"
                value={playerName}
                onChange={(e) => {
                  setPlayerName(e.target.value);
                  setJoinError(null);
                }}
                placeholder="e.g. Lead Officer, Sarah..."
                maxLength={20}
                className="w-full bg-slate-950/80 border-2 border-slate-700/80 rounded-2xl px-5 py-3 text-base text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 transition"
              />
            </div>

            {/* Error Message */}
            {joinError && (
              <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-bold text-center">
                {joinError}
              </div>
            )}

            {/* Submit Join */}
            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-emerald-500 via-sky-500 to-indigo-600 hover:from-emerald-400 hover:to-indigo-500 text-slate-950 font-black text-base rounded-2xl shadow-xl transition-transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>JOIN 3D GARDEN MAZE</span>
              <Trophy className="w-5 h-5" />
            </button>
          </form>
        ) : (
          /* --- VIEW B: ADMIN / REFEREE LOGIN --- */
          <form onSubmit={handleAdminSubmit} className="space-y-5">
            <div>
              <label className="text-xs font-black uppercase tracking-wider text-slate-300 block mb-1.5">
                Room Code to Administer
              </label>
              <input
                type="text"
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                placeholder="GARDEN123"
                className="w-full bg-slate-950/80 border border-slate-700 rounded-xl px-4 py-2.5 text-sm font-mono text-emerald-400 placeholder-slate-600 focus:outline-none focus:border-rose-400"
              />
            </div>

            <div>
              <label className="text-xs font-black uppercase tracking-wider text-slate-300 block mb-1.5">
                Admin Master Password
              </label>
              <input
                type="password"
                value={adminPass}
                onChange={(e) => setAdminPass(e.target.value)}
                placeholder="Enter referee password..."
                className="w-full bg-slate-950/80 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-rose-400"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Configured via the <code className="text-indigo-400 font-mono">ADMIN_PASSWORD</code> environment variable.
              </p>
            </div>

            {adminError && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-bold text-center">
                {adminError}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-400 hover:to-amber-400 text-white font-black text-sm rounded-2xl shadow-xl transition-transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>ACCESS REFEREE DASHBOARD</span>
              <Lock className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginScreen;
