import React, { useState } from 'react';
import { ObstacleDef } from '../types/game';
import { sound } from '../utils/audio';
import { Lock, Key, Bell, CheckCircle2, ShieldAlert, Sparkles } from 'lucide-react';

interface ObstacleWaitModalProps {
  obstacle: ObstacleDef;
  teamKeys: number;
  onClose: () => void;
  onAttemptUnlock: () => void;
  onRequestAdminKey: () => void;
}

export const ObstacleWaitModal: React.FC<ObstacleWaitModalProps> = ({
  obstacle,
  teamKeys,
  onClose,
  onAttemptUnlock,
  onRequestAdminKey,
}) => {
  const [pingSent, setPingSent] = useState(false);

  const hasEnoughKeys = teamKeys >= obstacle.requiredKeys;

  const handlePingAdmin = () => {
    onRequestAdminKey();
    setPingSent(true);
    sound.playCheckpoint();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-900 border-2 border-slate-700/80 rounded-3xl shadow-2xl p-6 overflow-hidden">
        {/* Top colored accent header */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-500" />

        <div className="text-center space-y-5">
          {/* Main Icon */}
          <div
            className={`mx-auto w-20 h-20 rounded-3xl flex items-center justify-center border-2 ${
              hasEnoughKeys
                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40 shadow-emerald-500/20'
                : 'bg-amber-500/15 text-amber-400 border-amber-500/40 shadow-amber-500/20'
            }`}
          >
            {hasEnoughKeys ? (
              <Key className="w-10 h-10 animate-bounce" />
            ) : (
              <Lock className="w-10 h-10 animate-pulse" />
            )}
          </div>

          {/* Title & Description */}
          <div>
            <span
              className={`text-xs uppercase tracking-widest font-black ${
                hasEnoughKeys ? 'text-emerald-400' : 'text-amber-400'
              }`}
            >
              {hasEnoughKeys ? '✨ Key Ready to Unlock' : '🔒 Obstacle Gate Locked'}
            </span>
            <h2 className="text-2xl font-black text-white mt-1">{obstacle.name}</h2>
            <p className="text-xs text-slate-400 mt-2 font-medium">
              {obstacle.description}
            </p>
          </div>

          {/* Key Balance Card */}
          <div className="bg-slate-800/80 rounded-2xl p-4 border border-slate-700 flex items-center justify-around">
            <div className="text-center">
              <span className="text-[11px] text-slate-400 block font-bold uppercase">
                Required
              </span>
              <span className="text-xl font-black text-amber-400 flex items-center justify-center gap-1 mt-0.5">
                🔑 {obstacle.requiredKeys} Key
              </span>
            </div>
            <div className="h-10 w-px bg-slate-700" />
            <div className="text-center">
              <span className="text-[11px] text-slate-400 block font-bold uppercase">
                Your Inventory
              </span>
              <span
                className={`text-xl font-black flex items-center justify-center gap-1 mt-0.5 ${
                  hasEnoughKeys ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                🔑 {teamKeys} Key{teamKeys !== 1 ? 's' : ''}
              </span>
            </div>
          </div>

          {/* Instructions / Status */}
          {hasEnoughKeys ? (
            <div className="bg-emerald-950/40 border border-emerald-800/60 rounded-xl p-3.5 text-xs text-emerald-300 font-bold">
              ✅ You have the required key! Click below to unlock the barrier and proceed.
            </div>
          ) : (
            <div className="bg-slate-850 border border-slate-700/80 rounded-xl p-4 text-xs text-slate-300 space-y-1.5">
              <p className="font-extrabold text-amber-300 flex items-center justify-center gap-1.5">
                <Bell className="w-4 h-4 text-amber-400" />
                Checkpoint Wait Station
              </p>
              <p className="text-slate-400">
                You have reached this obstacle. Please wait for the referee/admin to grant your team a key!
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3 pt-2">
            {hasEnoughKeys ? (
              <button
                onClick={() => {
                  sound.playGateUnlock();
                  onAttemptUnlock();
                  onClose();
                }}
                className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black rounded-2xl shadow-xl shadow-emerald-500/30 text-lg transition-transform active:scale-95 flex items-center justify-center gap-2"
              >
                <Key className="w-6 h-6 text-slate-950" />
                UNLOCK OBSTACLE WITH 1 KEY
              </button>
            ) : (
              <button
                onClick={handlePingAdmin}
                disabled={pingSent}
                className={`w-full py-4 font-black rounded-2xl shadow-xl text-base transition-all flex items-center justify-center gap-2 active:scale-95 ${
                  pingSent
                    ? 'bg-slate-800 text-amber-400 border border-amber-500/40'
                    : 'bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-600 hover:from-amber-400 hover:to-rose-400 text-white shadow-indigo-600/30'
                }`}
              >
                <Bell className="w-5 h-5 text-amber-300 animate-bounce" />
                {pingSent ? '✅ ADMIN NOTIFIED (WAITING FOR KEY...)' : '🔔 NOTIFY ADMIN TO GRANT KEY'}
              </button>
            )}

            <button
              onClick={onClose}
              className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl transition text-sm"
            >
              RETURN TO MAZE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
