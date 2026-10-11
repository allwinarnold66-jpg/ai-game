import React, { useRef, useState, useEffect, useCallback } from 'react';

interface JoystickProps {
  onMove: (vector: { x: number; y: number; isMoving: boolean; direction: 'up' | 'down' | 'left' | 'right' }) => void;
  size?: number;
}

export const VirtualJoystick: React.FC<JoystickProps> = ({ onMove, size = 130 }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [knobPos, setKnobPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const isDraggingRef = useRef(false);

  const radius = size / 2;
  const maxDistance = radius * 0.72;

  const updatePosition = useCallback(
    (clientX: number, clientY: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      let dx = clientX - centerX;
      let dy = clientY - centerY;
      const distance = Math.hypot(dx, dy);

      if (distance > maxDistance) {
        dx = (dx / distance) * maxDistance;
        dy = (dy / distance) * maxDistance;
      }

      setKnobPos({ x: dx, y: dy });

      const normX = dx / maxDistance;
      const normY = dy / maxDistance;
      const isMoving = Math.hypot(normX, normY) > 0.12;

      let direction: 'up' | 'down' | 'left' | 'right' = 'down';
      if (Math.abs(normX) > Math.abs(normY)) {
        direction = normX > 0 ? 'right' : 'left';
      } else {
        direction = normY > 0 ? 'down' : 'up';
      }

      onMove({
        x: normX,
        y: normY,
        isMoving,
        direction,
      });
    },
    [maxDistance, onMove]
  );

  const stopDragging = useCallback(() => {
    isDraggingRef.current = false;
    setIsDragging(false);
    setKnobPos({ x: 0, y: 0 });
    onMove({
      x: 0,
      y: 0,
      isMoving: false,
      direction: 'down',
    });
  }, [onMove]);

  // Window-level pointer listeners so user can drag outside circle smoothly
  useEffect(() => {
    const handleWindowPointerMove = (e: PointerEvent) => {
      if (!isDraggingRef.current) return;
      updatePosition(e.clientX, e.clientY);
    };

    const handleWindowPointerUp = () => {
      if (!isDraggingRef.current) return;
      stopDragging();
    };

    window.addEventListener('pointermove', handleWindowPointerMove);
    window.addEventListener('pointerup', handleWindowPointerUp);
    window.addEventListener('pointercancel', handleWindowPointerUp);

    return () => {
      window.removeEventListener('pointermove', handleWindowPointerMove);
      window.removeEventListener('pointerup', handleWindowPointerUp);
      window.removeEventListener('pointercancel', handleWindowPointerUp);
    };
  }, [updatePosition, stopDragging]);

  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    isDraggingRef.current = true;
    setIsDragging(true);
    updatePosition(e.clientX, e.clientY);
  };

  const activeDir = knobPos.x === 0 && knobPos.y === 0 ? null : Math.abs(knobPos.x) > Math.abs(knobPos.y) ? (knobPos.x > 0 ? 'right' : 'left') : (knobPos.y > 0 ? 'down' : 'up');

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      style={{ width: size, height: size }}
      className="relative rounded-full bg-slate-900/85 backdrop-blur-xl border-2 border-slate-700/80 shadow-[0_8px_32px_rgba(0,0,0,0.5)] flex items-center justify-center select-none touch-none cursor-pointer"
    >
      {/* Direction Guide Indicators */}
      <span className={`absolute top-2 text-[10px] font-black transition-colors ${activeDir === 'up' ? 'text-cyan-400 scale-110 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]' : 'text-slate-500'}`}>▲ UP</span>
      <span className={`absolute bottom-2 text-[10px] font-black transition-colors ${activeDir === 'down' ? 'text-cyan-400 scale-110 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]' : 'text-slate-500'}`}>▼ DOWN</span>
      <span className={`absolute left-2 text-[10px] font-black transition-colors ${activeDir === 'left' ? 'text-cyan-400 scale-110 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]' : 'text-slate-500'}`}>◀</span>
      <span className={`absolute right-2 text-[10px] font-black transition-colors ${activeDir === 'right' ? 'text-cyan-400 scale-110 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]' : 'text-slate-500'}`}>▶</span>

      {/* Target ring */}
      <div className="w-12 h-12 rounded-full border border-dashed border-cyan-500/30 flex items-center justify-center pointer-events-none">
        <div className="w-2.5 h-2.5 rounded-full bg-cyan-400/40 animate-ping" />
      </div>

      {/* Knob handle */}
      <div
        style={{
          transform: `translate(${knobPos.x}px, ${knobPos.y}px)`,
          transition: isDragging ? 'none' : 'transform 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        }}
        className={`w-14 h-14 rounded-full shadow-2xl border-2 flex items-center justify-center pointer-events-none transition-colors ${
          isDragging
            ? 'bg-gradient-to-tr from-cyan-500 to-blue-600 border-white text-white shadow-cyan-500/70 scale-105'
            : 'bg-gradient-to-tr from-slate-800 to-slate-700 border-slate-500 text-slate-300'
        }`}
      >
        <div className="w-5 h-5 rounded-full bg-white/40 shadow-inner" />
      </div>
    </div>
  );
};
