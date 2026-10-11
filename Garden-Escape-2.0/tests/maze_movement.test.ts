import { describe, it, expect } from 'vitest';
import {
  AUTHORITATIVE_MAZE,
  DIRS,
  RELATIVE_OFFSETS,
  getAbsoluteDirection,
  getValidRelativeDirections,
  isTraversable,
} from '../src/data/authoritativeMaze';
import { TeamId } from '../src/types/game';

describe('Maze and Movement Engine Tests (Part 7, 8 & 12)', () => {
  it('has valid dimensions, starts, finish, and checkpoints on walkable path cells', () => {
    const { walls, starts, finish, keys, gates, checkpoints } = AUTHORITATIVE_MAZE;

    // Check all team starts
    (['HR', 'MARKETING', 'FINANCE', 'OPERATIONS'] as TeamId[]).forEach((tid) => {
      const s = starts[tid];
      expect(walls[s.y][s.x]).toBe(0); // 0 = path
    });

    // Check finish
    expect(walls[finish.y][finish.x]).toBe(0);

    // Check all keys
    keys.forEach((k) => {
      expect(walls[k.y][k.x]).toBe(0);
    });

    // Check all gates
    gates.forEach((g) => {
      expect(walls[g.y][g.x]).toBe(0);
    });

    // Check all checkpoints
    checkpoints.forEach((cp) => {
      expect(walls[cp.y][cp.x]).toBe(0);
    });
  });

  it('guarantees BFS path connectivity from each team start to all keys and to finish', () => {
    const { width, height, walls, starts, finish, keys } = AUTHORITATIVE_MAZE;

    function bfs(startX: number, startY: number, targetX: number, targetY: number): number {
      const queue: [number, number, number][] = [[startX, startY, 0]];
      const visited = new Set<string>([`${startX},${startY}`]);

      while (queue.length > 0) {
        const [cx, cy, dist] = queue.shift()!;
        if (cx === targetX && cy === targetY) return dist;

        for (const { dx, dy } of DIRS) {
          const nx = cx + dx;
          const ny = cy + dy;
          const key = `${nx},${ny}`;

          if (nx >= 0 && nx < width && ny >= 0 && ny < height && walls[ny][nx] === 0) {
            if (!visited.has(key)) {
              visited.add(key);
              queue.push([nx, ny, dist + 1]);
            }
          }
        }
      }
      return -1;
    }

    // Every team can reach finish and every key
    (['HR', 'MARKETING', 'FINANCE', 'OPERATIONS'] as TeamId[]).forEach((tid) => {
      const s = starts[tid];
      const distToFinish = bfs(s.x, s.y, finish.x, finish.y);
      expect(distToFinish).toBeGreaterThan(0);

      keys.forEach((k) => {
        const distToKey = bfs(s.x, s.y, k.x, k.y);
        expect(distToKey).toBeGreaterThan(0);
      });
    });
  });

  it('correctly validates traversability against walls and gates', () => {
    const { walls, gates } = AUTHORITATIVE_MAZE;
    const gate = gates[0];

    // Out of bounds is not traversable
    expect(isTraversable(walls, -1, 0)).toBe(false);
    expect(isTraversable(walls, 100, 100)).toBe(false);

    // Wall cell is not traversable
    expect(isTraversable(walls, 0, 0)).toBe(false);

    // Locked gate is not traversable without key
    expect(isTraversable(walls, gate.x, gate.y, [], gates)).toBe(false);

    // Unlocked gate is traversable once unlocked
    expect(isTraversable(walls, gate.x, gate.y, [gate.id], gates)).toBe(true);
  });

  it('correctly transforms relative movement based on player orientation', () => {
    // 0 = North, 1 = East, 2 = South, 3 = West
    // Facing North (0)
    expect(getAbsoluteDirection(0, 'FORWARD')).toBe(0); // North
    expect(getAbsoluteDirection(0, 'RIGHT')).toBe(1); // East
    expect(getAbsoluteDirection(0, 'BACKWARD')).toBe(2); // South
    expect(getAbsoluteDirection(0, 'LEFT')).toBe(3); // West

    // Facing East (1)
    expect(getAbsoluteDirection(1, 'FORWARD')).toBe(1); // East
    expect(getAbsoluteDirection(1, 'RIGHT')).toBe(2); // South
    expect(getAbsoluteDirection(1, 'BACKWARD')).toBe(3); // West
    expect(getAbsoluteDirection(1, 'LEFT')).toBe(0); // North

    // Facing South (2)
    expect(getAbsoluteDirection(2, 'FORWARD')).toBe(2); // South
    expect(getAbsoluteDirection(2, 'RIGHT')).toBe(3); // West
    expect(getAbsoluteDirection(2, 'BACKWARD')).toBe(0); // North
    expect(getAbsoluteDirection(2, 'LEFT')).toBe(1); // East

    // Facing West (3)
    expect(getAbsoluteDirection(3, 'FORWARD')).toBe(3); // West
    expect(getAbsoluteDirection(3, 'RIGHT')).toBe(0); // North
    expect(getAbsoluteDirection(3, 'BACKWARD')).toBe(1); // East
    expect(getAbsoluteDirection(3, 'LEFT')).toBe(2); // South
  });

  it('returns valid relative directions from current position and orientation', () => {
    const { walls, starts } = AUTHORITATIVE_MAZE;
    const hr = starts['HR']; // (1, 1), facing East (1)

    const dirs = getValidRelativeDirections(walls, hr.x, hr.y, hr.orientation);

    // From (1, 1) facing East:
    // Forward is (2, 1) -> path
    // Right is (1, 2) -> path
    // Backward is (0, 1) -> wall
    // Left is (1, 0) -> wall
    expect(dirs).toContain('FORWARD');
    expect(dirs).toContain('RIGHT');
    expect(dirs).not.toContain('BACKWARD');
    expect(dirs).not.toContain('LEFT');
  });
  it('offers a locked-gate direction only when the player has enough keys', () => {
    const { walls, gates } = AUTHORITATIVE_MAZE;
    const gate = gates.find((g) => g.id === 'gate_north')!;
    // Stand immediately south of the north gate, facing north.
    const x = gate.x;
    const y = gate.y + 1;
    expect(walls[y][x]).toBe(0);

    const withoutKey = getValidRelativeDirections(walls, x, y, 0, [], gates, 0);
    const withKey = getValidRelativeDirections(walls, x, y, 0, [], gates, gate.requiredKeys);
    expect(withoutKey).not.toContain('FORWARD');
    expect(withKey).toContain('FORWARD');
  });

});
