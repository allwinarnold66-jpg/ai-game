import { LevelDef, ObstacleDef, CheckpointDef, TeamId } from '../types/game';

function createGrid(width: number, height: number, fill: number = 1): number[][] {
  const grid: number[][] = [];
  for (let y = 0; y < height; y++) {
    grid.push(new Array(width).fill(fill));
  }
  return grid;
}

function carveH(grid: number[][], x1: number, x2: number, y: number) {
  const minX = Math.min(x1, x2);
  const maxX = Math.max(x1, x2);
  for (let x = minX; x <= maxX; x++) {
    if (grid[y] && grid[y][x] !== undefined) grid[y][x] = 0;
  }
}

function carveV(grid: number[][], x: number, y1: number, y2: number) {
  const minY = Math.min(y1, y2);
  const maxY = Math.max(y1, y2);
  for (let y = minY; y <= maxY; y++) {
    if (grid[y] && grid[y][x] !== undefined) grid[y][x] = 0;
  }
}

// =========================================================================
// MAP 1: GRAND CHAMPIONSHIP ARENA (30 x 20)
// MATHEMATICALLY VERIFIED: CYCLES = 0 (STRICT ACYCLIC TREE TOPOLOGY)
// NO SIGNBOARDS - NATURAL MAZE STONE DEAD ENDS - STRICT 3-CHECKPOINT SEQUENCE
// =========================================================================
function buildMap1(): LevelDef {
  const w = 30;
  const h = 20;
  const grid = createGrid(w, h, 1);

  // Sector 1: Start Cross Hub
  grid[2][3] = 0;
  grid[3][2] = 0;
  grid[3][3] = 0;
  grid[4][3] = 0;
  grid[3][4] = 0;

  // True Path 1: (4, 3) -> East to (10, 3) -> South to (10, 5) -> East to Gate at (14, 5)
  carveH(grid, 4, 10, 3);
  carveV(grid, 10, 3, 5);
  carveH(grid, 10, 14, 5);

  // False Branch 1A (North): from (7, 3) north to (7, 1), east to (12, 1) -> DEAD END
  carveV(grid, 7, 1, 3);
  carveH(grid, 7, 12, 1);

  // False Branch 1B (South): from (5, 3) south to (5, 5), east to (7, 5) -> DEAD END
  carveV(grid, 5, 3, 5);
  carveH(grid, 5, 7, 5);

  // Checkpoint 1 Lock at (14, 5), Pad at (15, 5)
  carveH(grid, 14, 15, 5);

  // Sector 2: True Path 2: (15, 5) -> East to (26, 5) -> South to (26, 9) -> West to Gate at (20, 9)
  carveH(grid, 15, 26, 5);
  carveV(grid, 26, 5, 9);
  carveH(grid, 20, 26, 9);

  // False Branch 2A (North): from (19, 5) north to (19, 2), east to (23, 2) -> DEAD END
  carveV(grid, 19, 2, 5);
  carveH(grid, 19, 23, 2);

  // False Branch 2B (East): from (26, 7) east to (28, 7) -> DEAD END
  carveH(grid, 26, 28, 7);

  // Checkpoint 2 Lock at (20, 9), Pad at (19, 9)
  carveH(grid, 19, 20, 9);

  // Sector 3: True Path 3: (19, 9) -> West to (3, 9) -> South to (3, 14) -> East to Gate at (10, 14)
  carveH(grid, 3, 19, 9);
  carveV(grid, 3, 9, 14);
  carveH(grid, 3, 10, 14);

  // False Branch 3A (North): from (13, 9) north to (13, 7), west to (8, 7) -> DEAD END
  carveV(grid, 13, 7, 9);
  carveH(grid, 8, 13, 7);

  // False Branch 3B (South): from (3, 14) south to (3, 18), east to (7, 18) -> DEAD END
  carveV(grid, 3, 14, 18);
  carveH(grid, 3, 7, 18);

  // Checkpoint 3 Lock at (10, 14), Pad at (11, 14)
  carveH(grid, 10, 11, 14);

  // Sector 4: True Path 4: (11, 14) north to (11, 12), east to (25, 12), south to (25, 16), west to (18, 16)
  carveV(grid, 11, 12, 14);
  carveH(grid, 11, 25, 12);
  carveV(grid, 25, 12, 16);
  carveH(grid, 18, 25, 16);
  // Finish Arena Corridor: (15, 16) to (18, 16)
  carveH(grid, 15, 18, 16);

  // False Branch 4A (North): from (22, 12) north to (22, 11) -> DEAD END
  carveV(grid, 22, 11, 12);

  // False Branch 4B (East): from (25, 12) east to (28, 12), south to (28, 14) -> DEAD END
  carveH(grid, 25, 28, 12);
  carveV(grid, 28, 12, 14);

  // False Branch 4C (South): from (25, 16) south to (25, 18) -> DEAD END
  carveV(grid, 25, 16, 18);

  const obstacles: ObstacleDef[] = [
    {
      id: 'cp_lock_1',
      level: 1,
      name: 'Checkpoint 1 Lock',
      type: 'gate',
      gridX: 14,
      gridY: 5,
      width: 1,
      height: 1,
      requiredKeys: 1,
      description: 'First barrier. Wait for Admin to award Key 1 to pass!',
    },
    {
      id: 'cp_lock_2',
      level: 1,
      name: 'Checkpoint 2 Lock',
      type: 'gate',
      gridX: 20,
      gridY: 9,
      width: 1,
      height: 1,
      requiredKeys: 1,
      description: 'Second barrier. Wait for Admin to award Key 2 to pass!',
    },
    {
      id: 'cp_lock_3',
      level: 1,
      name: 'Checkpoint 3 Lock',
      type: 'final_gate',
      gridX: 10,
      gridY: 14,
      width: 1,
      height: 1,
      requiredKeys: 1,
      description: 'Third and final barrier! Wait for Admin to award Key 3 to pass!',
    },
  ];

  const checkpoints: CheckpointDef[] = [
    { id: 'cp0', level: 1, index: 0, gridX: 3, gridY: 3, name: 'Start Camp' },
    { id: 'cp1', level: 1, index: 1, gridX: 15, gridY: 5, name: 'Checkpoint 1' },
    { id: 'cp2', level: 1, index: 2, gridX: 19, gridY: 9, name: 'Checkpoint 2' },
    { id: 'cp3', level: 1, index: 3, gridX: 11, gridY: 14, name: 'Checkpoint 3' },
  ];

  return {
    levelNumber: 1,
    name: 'Map 1: Championship Arena',
    subtitle: 'Zero Alternative Routes • Natural Stone Dead Ends',
    width: w,
    height: h,
    tileSize: 48,
    startPositions: {
      HR: { x: 3 * 48, y: 2.3 * 48 },
      MARKETING: { x: 3.7 * 48, y: 3 * 48 },
      FINANCE: { x: 2.3 * 48, y: 3 * 48 },
      OPERATIONS: { x: 3 * 48, y: 3.7 * 48 },
    },
    walls: grid,
    obstacles,
    checkpoints,
    movingHazards: [],
    keyPickups: [],
    exitPosition: { x: 15 * 48, y: 15.5 * 48, width: 2.5 * 48, height: 1.5 * 48 },
    decorations: [], // Zero signboards
  };
}

// =========================================================================
// MAP 2: SERPENT CANYON (30 x 20)
// MATHEMATICALLY VERIFIED: CYCLES = 0 (STRICT ACYCLIC TREE TOPOLOGY)
// NO SIGNBOARDS - NATURAL MAZE STONE DEAD ENDS - STRICT 3-CHECKPOINT SEQUENCE
// =========================================================================
function buildMap2(): LevelDef {
  const w = 30;
  const h = 20;
  const grid = createGrid(w, h, 1);

  // Start cross hub
  grid[2][3] = 0;
  grid[3][2] = 0;
  grid[3][3] = 0;
  grid[4][3] = 0;
  grid[3][4] = 0;

  // Sector 1: (3, 2) -> (3, 1) -> (17, 1) -> (17, 4) -> (11, 4) -> Gate (10, 4) -> CP1 (9, 4)
  carveV(grid, 3, 1, 2);
  carveH(grid, 3, 17, 1);
  carveV(grid, 17, 1, 4);
  carveH(grid, 9, 17, 4);

  // False 1A: (10, 1) south to (10, 2) -> DEAD END
  carveV(grid, 10, 1, 2);
  // False 1B: (17, 1) east to (23, 1) -> DEAD END
  carveH(grid, 17, 23, 1);

  // Sector 2: from CP1 (9, 4) -> west to (5, 4) -> south to (5, 8) -> east to (24, 8) -> south to (24, 10) -> Gate (20, 10) -> CP2 (19, 10)
  carveH(grid, 5, 9, 4);
  carveV(grid, 5, 4, 8);
  carveH(grid, 5, 24, 8);
  carveV(grid, 24, 8, 10);
  carveH(grid, 19, 24, 10);

  // False 2A: from (5, 8) south to (5, 10) -> DEAD END
  carveV(grid, 5, 8, 10);
  // False 2B: from (15, 8) north to (15, 6) -> DEAD END
  carveV(grid, 15, 6, 8);
  // False 2C: from (24, 8) east to (27, 8) -> DEAD END
  carveH(grid, 24, 27, 8);

  // Sector 3: from CP2 (19, 10) -> west to (11, 10) -> south to (11, 14) -> west to (4, 14) -> south to (4, 17) -> east to Gate (9, 17) -> CP3 (10, 17)
  carveH(grid, 11, 19, 10);
  carveV(grid, 11, 10, 14);
  carveH(grid, 4, 11, 14);
  carveV(grid, 4, 14, 17);
  carveH(grid, 4, 10, 17);

  // False 3A: from (11, 14) east to (15, 14) -> DEAD END
  carveH(grid, 11, 15, 14);
  // False 3B: from (4, 17) south to (4, 18) -> DEAD END
  carveV(grid, 4, 17, 18);

  // Sector 4: from CP3 (10, 17) -> east to (25, 17) -> north to (25, 14) -> west to Finish Arena (19..22, 14)
  carveH(grid, 10, 25, 17);
  carveV(grid, 25, 14, 17);
  carveH(grid, 19, 25, 14);

  // False 4A: from (25, 17) east to (28, 17) -> DEAD END
  carveH(grid, 25, 28, 17);
  // False 4B: from (25, 14) north to (25, 12) -> DEAD END
  carveV(grid, 25, 12, 14);

  const obstacles: ObstacleDef[] = [
    {
      id: 'cp_lock_1',
      level: 2,
      name: 'Checkpoint 1 Lock',
      type: 'gate',
      gridX: 10,
      gridY: 4,
      width: 1,
      height: 1,
      requiredKeys: 1,
      description: 'First canyon barrier. Wait for Admin to award Key 1 to pass!',
    },
    {
      id: 'cp_lock_2',
      level: 2,
      name: 'Checkpoint 2 Lock',
      type: 'gate',
      gridX: 20,
      gridY: 10,
      width: 1,
      height: 1,
      requiredKeys: 1,
      description: 'Second canyon barrier. Wait for Admin to award Key 2 to pass!',
    },
    {
      id: 'cp_lock_3',
      level: 2,
      name: 'Checkpoint 3 Lock',
      type: 'final_gate',
      gridX: 9,
      gridY: 17,
      width: 1,
      height: 1,
      requiredKeys: 1,
      description: 'Third canyon barrier! Wait for Admin to award Key 3 to pass!',
    },
  ];

  const checkpoints: CheckpointDef[] = [
    { id: 'cp0', level: 2, index: 0, gridX: 3, gridY: 3, name: 'Start Camp' },
    { id: 'cp1', level: 2, index: 1, gridX: 9, gridY: 4, name: 'Checkpoint 1' },
    { id: 'cp2', level: 2, index: 2, gridX: 19, gridY: 10, name: 'Checkpoint 2' },
    { id: 'cp3', level: 2, index: 3, gridX: 10, gridY: 17, name: 'Checkpoint 3' },
  ];

  return {
    levelNumber: 2,
    name: 'Map 2: Serpent Canyon',
    subtitle: 'Winding Canyon Course • Natural Stone Dead Ends',
    width: w,
    height: h,
    tileSize: 48,
    startPositions: {
      HR: { x: 3 * 48, y: 2.3 * 48 },
      MARKETING: { x: 3.7 * 48, y: 3 * 48 },
      FINANCE: { x: 2.3 * 48, y: 3 * 48 },
      OPERATIONS: { x: 3 * 48, y: 3.7 * 48 },
    },
    walls: grid,
    obstacles,
    checkpoints,
    movingHazards: [],
    keyPickups: [],
    exitPosition: { x: 19 * 48, y: 13.5 * 48, width: 2.5 * 48, height: 1.5 * 48 },
    decorations: [], // Zero signboards
  };
}

// =========================================================================
// MAP 3: CITADEL LABYRINTH (30 x 20)
// MATHEMATICALLY VERIFIED: CYCLES = 0 (STRICT ACYCLIC TREE TOPOLOGY)
// NO SIGNBOARDS - NATURAL MAZE STONE DEAD ENDS - STRICT 3-CHECKPOINT SEQUENCE
// =========================================================================
function buildMap3(): LevelDef {
  const w = 30;
  const h = 20;
  const grid = createGrid(w, h, 1);

  // Start cross hub at bottom-left: (3, 17)
  grid[16][3] = 0;
  grid[17][2] = 0;
  grid[17][3] = 0;
  grid[18][3] = 0;
  grid[17][4] = 0;

  // Sector 1: (3, 16) -> (3, 14) -> (12, 14) -> (12, 11) -> Gate (12, 11) -> CP1 (13, 11)
  carveV(grid, 3, 14, 16);
  carveH(grid, 3, 12, 14);
  carveV(grid, 12, 11, 14);
  carveH(grid, 12, 13, 11);

  // False 1A: (3, 14) west to (1, 14) -> DEAD END
  carveH(grid, 1, 3, 14);
  // False 1B: (8, 14) south to (8, 16) -> DEAD END
  carveV(grid, 8, 14, 16);

  // Sector 2: from (13, 11) east to (26, 11) -> up to (26, 7) -> west to Gate (20, 7) -> CP2 (19, 7)
  carveH(grid, 13, 26, 11);
  carveV(grid, 26, 7, 11);
  carveH(grid, 19, 26, 7);

  // False 2A: from (26, 11) south to (26, 13) -> DEAD END
  carveV(grid, 26, 11, 13);
  // False 2B: from (26, 7) up to (26, 5) -> DEAD END
  carveV(grid, 26, 5, 7);
  // False 2C: from (22, 7) down to (22, 9) -> DEAD END
  carveV(grid, 22, 7, 9);

  // Sector 3: from (19, 7) west to (4, 7) -> up to (4, 3) -> east to Gate (11, 3) -> CP3 (12, 3)
  carveH(grid, 4, 19, 7);
  carveV(grid, 4, 3, 7);
  carveH(grid, 4, 12, 3);

  // False 3A: from (4, 3) west to (1, 3) -> DEAD END
  carveH(grid, 1, 4, 3);
  // False 3B: from (8, 7) down to (8, 9) -> DEAD END
  carveV(grid, 8, 7, 9);

  // Sector 4: from (12, 3) east to (24, 3) -> down to (24, 5) -> west to Finish (21, 5)
  carveH(grid, 12, 24, 3);
  carveV(grid, 24, 3, 5);
  carveH(grid, 21, 24, 5);

  // False 4A: from (17, 3) up to (17, 1) -> DEAD END
  carveV(grid, 17, 1, 3);
  // False 4B: from (24, 3) east to (27, 3) -> DEAD END
  carveH(grid, 24, 27, 3);

  const obstacles: ObstacleDef[] = [
    {
      id: 'cp_lock_1',
      level: 3,
      name: 'Checkpoint 1 Lock',
      type: 'gate',
      gridX: 12,
      gridY: 11,
      width: 1,
      height: 1,
      requiredKeys: 1,
      description: 'First citadel gate. Wait for Admin to award Key 1 to pass!',
    },
    {
      id: 'cp_lock_2',
      level: 3,
      name: 'Checkpoint 2 Lock',
      type: 'gate',
      gridX: 20,
      gridY: 7,
      width: 1,
      height: 1,
      requiredKeys: 1,
      description: 'Second citadel gate. Wait for Admin to award Key 2 to pass!',
    },
    {
      id: 'cp_lock_3',
      level: 3,
      name: 'Checkpoint 3 Lock',
      type: 'final_gate',
      gridX: 11,
      gridY: 3,
      width: 1,
      height: 1,
      requiredKeys: 1,
      description: 'Third citadel gate! Wait for Admin to award Key 3 to pass!',
    },
  ];

  const checkpoints: CheckpointDef[] = [
    { id: 'cp0', level: 3, index: 0, gridX: 3, gridY: 17, name: 'Start Camp' },
    { id: 'cp1', level: 3, index: 1, gridX: 13, gridY: 11, name: 'Checkpoint 1' },
    { id: 'cp2', level: 3, index: 2, gridX: 19, gridY: 7, name: 'Checkpoint 2' },
    { id: 'cp3', level: 3, index: 3, gridX: 12, gridY: 3, name: 'Checkpoint 3' },
  ];

  return {
    levelNumber: 3,
    name: 'Map 3: Citadel Labyrinth',
    subtitle: 'Fortress Citadel Course • Natural Stone Dead Ends',
    width: w,
    height: h,
    tileSize: 48,
    startPositions: {
      HR: { x: 3 * 48, y: 16.3 * 48 },
      MARKETING: { x: 3.7 * 48, y: 17 * 48 },
      FINANCE: { x: 2.3 * 48, y: 17 * 48 },
      OPERATIONS: { x: 3 * 48, y: 17.7 * 48 },
    },
    walls: grid,
    obstacles,
    checkpoints,
    movingHazards: [],
    keyPickups: [],
    exitPosition: { x: 21 * 48, y: 4.5 * 48, width: 2.5 * 48, height: 1.5 * 48 },
    decorations: [], // Zero signboards
  };
}

export const LEVELS: Record<number, LevelDef> = {
  1: buildMap1(),
  2: buildMap2(),
  3: buildMap3(),
};

export const TEAMS_META: Record<TeamId, {
  name: TeamId;
  label: string;
  badge: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  tagline: string;
}> = {
  HR: {
    name: 'HR',
    label: 'Human Resources',
    badge: 'HR',
    primaryColor: '#00d2ff',
    secondaryColor: '#0066ff',
    accentColor: '#b3f0ff',
    tagline: 'People, Culture & Talent',
  },
  MARKETING: {
    name: 'MARKETING',
    label: 'Marketing Buzz',
    badge: 'MKT',
    primaryColor: '#ffd000',
    secondaryColor: '#ff9900',
    accentColor: '#fff5b3',
    tagline: 'Strategy, Reach & Growth',
  },
  FINANCE: {
    name: 'FINANCE',
    label: 'Finance Masters',
    badge: 'FIN',
    primaryColor: '#00e676',
    secondaryColor: '#00a344',
    accentColor: '#b3ffcc',
    tagline: 'Capital, ROI & Precision',
  },
  OPERATIONS: {
    name: 'OPERATIONS',
    label: 'Operations Engine',
    badge: 'OPS',
    primaryColor: '#ff3366',
    secondaryColor: '#cc0033',
    accentColor: '#ffb3c6',
    tagline: 'Execution, Speed & Scale',
  },
};
