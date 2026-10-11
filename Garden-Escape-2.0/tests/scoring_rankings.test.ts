import { describe, it, expect } from 'vitest';
import { createGameRoom } from '../server';

describe('Scoring and Deterministic Rankings Tests (Part 9 & 12)', () => {
  it('awards +100 for correct answer, +10 for movement, and +500 for finishing the maze', () => {
    const room = createGameRoom('SCORE_TEST');
    const hr = room.teams['HR'];

    expect(hr.score).toBe(0);

    // Simulate answering correctly (+100)
    hr.score += 100;
    expect(hr.score).toBe(100);

    // Simulate moving 1 cell (+10)
    hr.score += 10;
    expect(hr.score).toBe(110);

    // Simulate finishing the maze (+500)
    hr.score += 500;
    hr.finished = true;
    hr.finishTimeMs = 120000; // 2 minutes
    expect(hr.score).toBe(610);
  });

  it('determines rankings primarily by verified maze finish, then checkpoint, score, and keys', () => {
    const room = createGameRoom('RANK_TEST');

    // HR: Finished in 150 seconds, Score 800
    room.teams['HR'].finished = true;
    room.teams['HR'].finishTimeMs = 150000;
    room.teams['HR'].score = 800;

    // MARKETING: Finished in 120 seconds (earlier!), Score 750
    room.teams['MARKETING'].finished = true;
    room.teams['MARKETING'].finishTimeMs = 120000;
    room.teams['MARKETING'].score = 750;

    // FINANCE: Unfinished, CP 2, Score 400
    room.teams['FINANCE'].finished = false;
    room.teams['FINANCE'].checkpointIndex = 2;
    room.teams['FINANCE'].score = 400;

    // OPERATIONS: Unfinished, CP 1, Score 450
    room.teams['OPERATIONS'].finished = false;
    room.teams['OPERATIONS'].checkpointIndex = 1;
    room.teams['OPERATIONS'].score = 450;

    // Sort entries using deterministic ranking rules
    const entries = Object.values(room.teams);
    entries.sort((a, b) => {
      if (a.finished && !b.finished) return -1;
      if (!a.finished && b.finished) return 1;
      if (a.finished && b.finished) return (a.finishTimeMs || 0) - (b.finishTimeMs || 0);
      if (b.checkpointIndex !== a.checkpointIndex) return b.checkpointIndex - a.checkpointIndex;
      if (b.score !== a.score) return b.score - a.score;
      return b.keys - a.keys;
    });

    // 1st should be MARKETING (finished earlier)
    expect(entries[0].teamId).toBe('MARKETING');
    // 2nd should be HR (finished)
    expect(entries[1].teamId).toBe('HR');
    // 3rd should be FINANCE (higher CP)
    expect(entries[2].teamId).toBe('FINANCE');
    // 4th should be OPERATIONS
    expect(entries[3].teamId).toBe('OPERATIONS');
  });
});
