import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  rooms,
  createGameRoom,
  startStudyPhase,
  startRacePhase,
  finishRace,
} from '../server';

describe('Game Timing and State Machine Tests (Part 4, 5 & 12)', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    rooms.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('starts in LOBBY phase with 20s study and 1800s race configured', () => {
    const room = createGameRoom('TIMING_ROOM');
    expect(room.phase).toBe('LOBBY');
    expect(room.studyDurationSec).toBe(20);
    expect(room.raceDurationSec).toBe(1800);
  });

  it('transitions LOBBY -> STUDY for exactly 20 seconds, then STUDY -> RACE', () => {
    const room = createGameRoom('FLOW_ROOM');

    // Start study phase
    startStudyPhase(room);
    expect(room.phase).toBe('STUDY');
    expect(room.phaseEndsAt).toBeDefined();

    // Advance 19 seconds - still in STUDY
    vi.advanceTimersByTime(19 * 1000);
    expect(room.phase).toBe('STUDY');

    // Advance 1 more second (total 20s) - transitions to RACE!
    vi.advanceTimersByTime(1 * 1000);
    expect(room.phase).toBe('RACE');
    expect(room.raceStartedAt).toBeDefined();
  });

  it('runs RACE phase for exactly 30 minutes (1800s), then transitions to FINISHED', () => {
    const room = createGameRoom('RACE_ROOM');
    startStudyPhase(room);
    vi.advanceTimersByTime(20 * 1000); // Complete study

    expect(room.phase).toBe('RACE');

    // Advance 29 minutes - still racing
    vi.advanceTimersByTime(29 * 60 * 1000);
    expect(room.phase).toBe('RACE');

    // Advance remaining 1 minute (total 30 mins) - transitions to FINISHED!
    vi.advanceTimersByTime(1 * 60 * 1000);
    expect(room.phase).toBe('FINISHED');
  });

  it('freezes player movement and pending moves upon transition to FINISHED', () => {
    const room = createGameRoom('FREEZE_ROOM');
    startStudyPhase(room);
    vi.advanceTimersByTime(20 * 1000);

    // Give player a pending move
    room.teams['HR'].hasPendingMove = true;
    room.teams['HR'].validDirections = ['FORWARD', 'RIGHT'];

    // End race
    finishRace(room);

    expect(room.phase).toBe('FINISHED');
    expect(room.teams['HR'].hasPendingMove).toBe(false);
    expect(room.teams['HR'].validDirections).toEqual([]);
  });
});
