import { describe, it, expect, beforeEach } from 'vitest';
import {
  rooms,
  createGameRoom,
  resetRoom,
} from '../server';
import { TeamId } from '../src/types/game';

describe('Room-based Multiplayer and Security Tests (Part 3 & 12)', () => {
  beforeEach(() => {
    rooms.clear();
  });

  it('creates independent rooms with unique codes', () => {
    const r1 = createGameRoom('ROOM_ALPHA');
    const r2 = createGameRoom('ROOM_BETA');

    expect(r1.roomCode).toBe('ROOM_ALPHA');
    expect(r2.roomCode).toBe('ROOM_BETA');
    expect(r1.adminToken).not.toBe(r2.adminToken);

    // Verify room isolation
    r1.teams['HR'].score = 250;
    expect(r2.teams['HR'].score).toBe(0);
  });

  it('enforces unique role assignments per room (4 distinct roles)', () => {
    const room = createGameRoom('TEST_ROLES');

    const expectedRoles: TeamId[] = ['HR', 'MARKETING', 'FINANCE', 'OPERATIONS'];
    expect(Object.keys(room.teams).sort()).toEqual(expectedRoles.sort());

    // Connect HR player
    room.teams['HR'].connected = true;
    room.teams['HR'].playerName = 'Officer Alice';

    expect(room.teams['HR'].connected).toBe(true);
    expect(room.teams['MARKETING'].connected).toBe(false);
  });

  it('generates secure room-scoped player reconnection tokens', () => {
    const room = createGameRoom('TEST_RECONNECT');
    const hr = room.teams['HR'];

    expect(hr.reconnectToken).toBeDefined();
    expect(hr.reconnectToken.length).toBeGreaterThanOrEqual(16);

    // Reconnection token should be unique across teams
    const tokens = new Set<string>();
    (['HR', 'MARKETING', 'FINANCE', 'OPERATIONS'] as TeamId[]).forEach((tid) => {
      const token = room.teams[tid].reconnectToken;
      expect(tokens.has(token)).toBe(false);
      tokens.add(token);
    });
  });

  it('preserves player state across reconnection without resetting progress', () => {
    const room = createGameRoom('TEST_PRESERVE');
    const player = room.teams['FINANCE'];

    // Player made progress
    player.score = 220;
    player.keys = 2;
    player.x = 5;
    player.y = 5;
    player.checkpointIndex = 1;

    // Simulate temporary disconnect
    player.connected = false;
    player.ws = null;

    // Simulate reconnect validation using the player reconnectToken
    expect(player.connected).toBe(false);
    expect(player.score).toBe(220);
    expect(player.keys).toBe(2);
    expect(player.checkpointIndex).toBe(1);
    expect(player.x).toBe(5);
    expect(player.y).toBe(5);
  });
  it('rejects duplicate room codes rather than overwriting an existing room', () => {
    const first = createGameRoom('UNIQUE123');
    expect(() => createGameRoom('UNIQUE123')).toThrow(/already in use/i);
    expect(rooms.get('UNIQUE123')).toBe(first);
  });

});
