import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import {
  TeamId,
  GamePhase,
  RelativeDirection,
  PlayerPrivateState,
  AdminSpectatorPlayer,
} from '../types/game';
import { AUTHORITATIVE_MAZE } from '../data/authoritativeMaze';
import { TEAMS_META } from '../data/mazeData';

interface MazeCanvasProps {
  roomCode?: string;
  phase?: GamePhase;
  myTeamId?: TeamId;
  myTeamState?: PlayerPrivateState;
  adminSpectatorTeams?: Record<TeamId, AdminSpectatorPlayer>;
  unlockedGates?: string[];
  isAdmin?: boolean;
  timeRemainingSec?: number;
  width?: number;
  height?: number;
  // Legacy compatibility props:
  gameState?: any;
  viewLevel?: number;
  cameraMode?: 'follow_me' | 'follow_team' | 'overview';
  focusTeamId?: TeamId;
  localPlayerPosRef?: any;
  onAttemptUnlock?: (obstacleId: string) => void;
}

// Procedural Canvas Textures
function createFoliageTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#1e521e';
  ctx.fillRect(0, 0, 256, 256);

  const leafColors = ['#2d772d', '#1b4a1b', '#3b943b', '#174017', '#48aa48', '#256325'];
  for (let i = 0; i < 2000; i++) {
    ctx.fillStyle = leafColors[Math.floor(Math.random() * leafColors.length)];
    ctx.beginPath();
    const x = Math.random() * 256;
    const y = Math.random() * 256;
    const r = 1.2 + Math.random() * 3.5;
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);
  return texture;
}

function createPathTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#a69076';
  ctx.fillRect(0, 0, 256, 256);

  // Draw cobblestone pebbles
  const pebbleColors = ['#8f7960', '#b8a38a', '#c9b59e', '#79634a', '#d4c2ac'];
  for (let i = 0; i < 900; i++) {
    ctx.fillStyle = pebbleColors[Math.floor(Math.random() * pebbleColors.length)];
    ctx.beginPath();
    const x = Math.random() * 256;
    const y = Math.random() * 256;
    const rx = 2 + Math.random() * 4;
    const ry = 1.5 + Math.random() * 3;
    ctx.ellipse(x, y, rx, ry, Math.random() * Math.PI, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 4);
  return texture;
}

function createGrassTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#326b23';
  ctx.fillRect(0, 0, 256, 256);

  const grassTones = ['#3d822b', '#28591c', '#469632', '#214717'];
  for (let i = 0; i < 3000; i++) {
    ctx.strokeStyle = grassTones[Math.floor(Math.random() * grassTones.length)];
    ctx.lineWidth = 1;
    const x = Math.random() * 256;
    const y = Math.random() * 256;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + (Math.random() - 0.5) * 4, y - 2 - Math.random() * 4);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(24, 24);
  return texture;
}

function createTextSprite(text: string, colorHex: string, subText = ''): THREE.Sprite {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 80;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = 'rgba(10, 25, 15, 0.85)';
  ctx.beginPath();
  ctx.roundRect(8, 6, 240, 68, 12);
  ctx.fill();

  ctx.strokeStyle = colorHex;
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.font = 'bold 26px sans-serif';
  ctx.fillStyle = colorHex;
  ctx.textAlign = 'center';
  ctx.fillText(text, 128, 38);

  if (subText) {
    ctx.font = 'bold 16px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(subText, 128, 62);
  }

  const texture = new THREE.CanvasTexture(canvas);
  const material = new THREE.SpriteMaterial({ map: texture, depthTest: false });
  const sprite = new THREE.Sprite(material);
  sprite.scale.set(7, 2.2, 1);
  return sprite;
}

export const MazeCanvas: React.FC<MazeCanvasProps> = ({
  roomCode = 'GARDEN123',
  phase = 'LOBBY',
  myTeamId,
  myTeamState,
  adminSpectatorTeams,
  unlockedGates = [],
  isAdmin = false,
  timeRemainingSec = 0,
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  // Three.js instances
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const overviewCameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const playerCameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  // Animated objects
  const trophyRef = useRef<THREE.Mesh | null>(null);
  const keyMeshesRef = useRef<Map<string, THREE.Group>>(new Map());
  const gateMeshesRef = useRef<Map<string, THREE.Group>>(new Map());
  const playerPawnsRef = useRef<Map<TeamId, { mesh: THREE.Group; label: THREE.Sprite }>>(new Map());

  // Camera interpolation states
  const playerCamPos = useRef<THREE.Vector3>(new THREE.Vector3(0, 1.65, 0));
  const playerCamTargetPos = useRef<THREE.Vector3>(new THREE.Vector3(0, 1.65, 0));
  const playerCamYaw = useRef<number>(0);
  const playerCamTargetYaw = useRef<number>(0);
  const headBobTime = useRef<number>(0);
  const studyOrbitAngle = useRef<number>(0);

  // Helper: Grid to 3D World coordinates
  const { width: GW, height: GH, cellSize: CS, wallHeight: WH } = AUTHORITATIVE_MAZE;
  const gridToWorld = (x: number, y: number): THREE.Vector3 => {
    const wx = (x - (GW - 1) / 2) * CS;
    const wz = (y - (GH - 1) / 2) * CS;
    return new THREE.Vector3(wx, 0, wz);
  };

  // Convert orientation to camera yaw angle
  // 0 = North (facing -Z, yaw = PI), 1 = East (facing +X, yaw = -PI/2), 2 = South (facing +Z, yaw = 0), 3 = West (facing -X, yaw = PI/2)
  const orientationToYaw = (orientation: number): number => {
    switch (orientation) {
      case 0:
        return Math.PI; // North
      case 1:
        return -Math.PI / 2; // East
      case 2:
        return 0; // South
      case 3:
        return Math.PI / 2; // West
      default:
        return 0;
    }
  };

  // Setup Three.js Scene
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth || window.innerWidth;
    const height = mount.clientHeight || window.innerHeight;

    // 1. Scene & Atmosphere
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xa6d8f8); // Natural garden sky blue
    scene.fog = new THREE.FogExp2(0xb8e0f8, 0.007); // Soft morning mist
    sceneRef.current = scene;

    // 2. Cameras
    const aspect = width / height;
    const overviewCamera = new THREE.PerspectiveCamera(48, aspect, 0.5, 500);
    overviewCamera.position.set(0, 95, 80);
    overviewCamera.lookAt(0, 0, 0);
    overviewCameraRef.current = overviewCamera;

    const playerCamera = new THREE.PerspectiveCamera(75, aspect, 0.1, 150);
    playerCamera.rotation.order = 'YXZ';
    playerCameraRef.current = playerCamera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;
    mount.appendChild(renderer.domElement);

    // 4. Natural Lighting
    const ambientLight = new THREE.HemisphereLight(0xecf8ff, 0x4a6b30, 0.85);
    scene.add(ambientLight);

    const sun = new THREE.DirectionalLight(0xfff7db, 1.3);
    sun.position.set(65, 120, 50);
    sun.castShadow = true;
    sun.shadow.mapSize.width = 2048;
    sun.shadow.mapSize.height = 2048;
    sun.shadow.camera.near = 10;
    sun.shadow.camera.far = 280;
    const d = 75;
    sun.shadow.camera.left = -d;
    sun.shadow.camera.right = d;
    sun.shadow.camera.top = d;
    sun.shadow.camera.bottom = -d;
    sun.shadow.bias = -0.0005;
    scene.add(sun);

    // 5. Ground Planes
    const foliageTex = createFoliageTexture();
    const pathTex = createPathTexture();
    const grassTex = createGrassTexture();

    // Vast surrounding meadow
    const grassGeo = new THREE.PlaneGeometry(350, 350);
    const grassMat = new THREE.MeshStandardMaterial({ map: grassTex, roughness: 0.9 });
    const grassMesh = new THREE.Mesh(grassGeo, grassMat);
    grassMesh.rotation.x = -Math.PI / 2;
    grassMesh.receiveShadow = true;
    scene.add(grassMesh);

    // Pathway soil/cobblestone layer under maze
    const pathGeo = new THREE.PlaneGeometry(GW * CS + 2, GH * CS + 2);
    const pathMat = new THREE.MeshStandardMaterial({ map: pathTex, roughness: 0.85 });
    const pathMesh = new THREE.Mesh(pathGeo, pathMat);
    pathMesh.rotation.x = -Math.PI / 2;
    pathMesh.position.y = 0.02;
    pathMesh.receiveShadow = true;
    scene.add(pathMesh);

    // 6. Realistic Instanced Hedge Walls
    const wallCells: { x: number; y: number }[] = [];
    for (let y = 0; y < GH; y++) {
      for (let x = 0; x < GW; x++) {
        if (AUTHORITATIVE_MAZE.walls[y][x] === 1) {
          wallCells.push({ x, y });
        }
      }
    }

    const hedgeGeo = new THREE.BoxGeometry(CS, WH, CS);
    const hedgeMat = new THREE.MeshStandardMaterial({
      map: foliageTex,
      roughness: 0.95,
      metalness: 0.05,
    });

    const hedgeInstanced = new THREE.InstancedMesh(hedgeGeo, hedgeMat, wallCells.length);
    hedgeInstanced.castShadow = true;
    hedgeInstanced.receiveShadow = true;

    // Organic shrub crown blobs on top of hedge walls
    const blobGeo = new THREE.IcosahedronGeometry(1.2, 1);
    const blobInstanced = new THREE.InstancedMesh(blobGeo, hedgeMat, wallCells.length * 3);
    blobInstanced.castShadow = true;

    const dummy = new THREE.Object3D();
    let blobIdx = 0;

    wallCells.forEach(({ x, y }, i) => {
      const pos = gridToWorld(x, y);
      const hVar = WH + (Math.random() - 0.5) * 0.3;
      dummy.position.set(pos.x, hVar / 2, pos.z);
      dummy.scale.set(1.02, 1, 1.02);
      dummy.rotation.set(0, 0, 0);
      dummy.updateMatrix();
      hedgeInstanced.setMatrixAt(i, dummy.matrix);

      // Add leafy canopy bubbles for lush natural texture
      for (let b = 0; b < 3; b++) {
        const ox = (Math.random() - 0.5) * (CS * 0.7);
        const oz = (Math.random() - 0.5) * (CS * 0.7);
        const oy = hVar + (Math.random() - 0.2) * 0.3;
        dummy.position.set(pos.x + ox, oy, pos.z + oz);
        const s = 0.8 + Math.random() * 0.5;
        dummy.scale.set(s, s * 0.7, s);
        dummy.rotation.set(Math.random(), Math.random(), Math.random());
        dummy.updateMatrix();
        blobInstanced.setMatrixAt(blobIdx++, dummy.matrix);
      }
    });

    hedgeInstanced.instanceMatrix.needsUpdate = true;
    blobInstanced.instanceMatrix.needsUpdate = true;
    scene.add(hedgeInstanced);
    scene.add(blobInstanced);

    // 7. Central Royal Gazebo & Finish Area
    const finishPos = gridToWorld(AUTHORITATIVE_MAZE.finish.x, AUTHORITATIVE_MAZE.finish.y);
    const gazeboGroup = new THREE.Group();
    gazeboGroup.position.copy(finishPos);

    // Stone courtyard circular podium
    const podiumGeo = new THREE.CylinderGeometry(8.5, 9, 0.4, 32);
    const stoneMat = new THREE.MeshStandardMaterial({ color: 0xdfd7c5, roughness: 0.6 });
    const podium = new THREE.Mesh(podiumGeo, stoneMat);
    podium.position.y = 0.2;
    podium.receiveShadow = true;
    gazeboGroup.add(podium);

    // Gazebo 8 Classical Pillars
    const pillarGeo = new THREE.CylinderGeometry(0.25, 0.28, 4.5, 12);
    const marbleMat = new THREE.MeshStandardMaterial({ color: 0xf5f3ee, roughness: 0.4 });
    for (let p = 0; p < 8; p++) {
      const angle = (p / 8) * Math.PI * 2;
      const pil = new THREE.Mesh(pillarGeo, marbleMat);
      pil.position.set(Math.cos(angle) * 4.2, 2.45, Math.sin(angle) * 4.2);
      pil.castShadow = true;
      gazeboGroup.add(pil);
    }

    // Gazebo Domed Roof
    const roofGeo = new THREE.ConeGeometry(5.0, 2.4, 8);
    const copperRoofMat = new THREE.MeshStandardMaterial({ color: 0x42755e, roughness: 0.5 }); // Patina copper
    const roof = new THREE.Mesh(roofGeo, copperRoofMat);
    roof.position.y = 5.8;
    roof.castShadow = true;
    gazeboGroup.add(roof);

    // Golden Trophy on central pedestal
    const trophyStand = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 1.0, 1.2, 16), marbleMat);
    trophyStand.position.y = 0.8;
    gazeboGroup.add(trophyStand);

    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xffc83b,
      metalness: 0.9,
      roughness: 0.2,
      emissive: 0x664400,
    });
    const trophyCup = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.2, 0.9, 16), goldMat);
    trophyCup.position.y = 1.85;
    trophyCup.castShadow = true;
    trophyRef.current = trophyCup;
    gazeboGroup.add(trophyCup);

    // Finish Banner
    const finishLabel = createTextSprite('👑 ROYAL GAZEBO', '#ffd700', 'FINISH SANCTUARY');
    finishLabel.position.set(0, 8.5, 0);
    gazeboGroup.add(finishLabel);

    scene.add(gazeboGroup);

    // 8. Classical Stone Fountain at Landmark (19, 12)
    const fountainPos = gridToWorld(19, 12);
    const fountainGroup = new THREE.Group();
    fountainGroup.position.copy(fountainPos);

    const basin = new THREE.Mesh(new THREE.CylinderGeometry(3.5, 3.8, 1.0, 24), stoneMat);
    basin.position.y = 0.5;
    basin.receiveShadow = true;
    fountainGroup.add(basin);

    const waterMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      roughness: 0.1,
      metalness: 0.1,
      transparent: true,
      opacity: 0.8,
    });
    const water = new THREE.Mesh(new THREE.CylinderGeometry(3.2, 3.2, 0.1, 24), waterMat);
    water.position.y = 0.85;
    fountainGroup.add(water);

    const fountainCenter = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.8, 2.5, 12), stoneMat);
    fountainCenter.position.y = 1.4;
    fountainGroup.add(fountainCenter);

    scene.add(fountainGroup);

    // 9. Interactive 3D Golden Keys
    const keyMap = new Map<string, THREE.Group>();
    AUTHORITATIVE_MAZE.keys.forEach((k) => {
      const kGroup = new THREE.Group();
      const pos = gridToWorld(k.x, k.y);
      kGroup.position.set(pos.x, 1.4, pos.z);

      const keyRing = new THREE.Mesh(new THREE.TorusGeometry(0.35, 0.08, 12, 24), goldMat);
      const keyShaft = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.9, 8), goldMat);
      keyShaft.position.y = -0.55;
      const keyTooth = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.12, 0.06), goldMat);
      keyTooth.position.set(0.12, -0.85, 0);

      kGroup.add(keyRing, keyShaft, keyTooth);

      // Sparkle light around key
      const keyLight = new THREE.PointLight(0xffea79, 1.2, 8);
      keyLight.position.y = 0.2;
      kGroup.add(keyLight);

      scene.add(kGroup);
      keyMap.set(k.id, kGroup);
    });
    keyMeshesRef.current = keyMap;

    // 10. Rose Arches & Locked Gates
    const gateMap = new Map<string, THREE.Group>();
    AUTHORITATIVE_MAZE.gates.forEach((g) => {
      const gGroup = new THREE.Group();
      const pos = gridToWorld(g.x, g.y);
      gGroup.position.copy(pos);

      // Stone Arch pillars on either side of path
      const archPillarGeo = new THREE.BoxGeometry(0.8, WH + 0.5, 0.8);
      const p1 = new THREE.Mesh(archPillarGeo, stoneMat);
      p1.position.set(-CS / 2 + 0.4, (WH + 0.5) / 2, 0);
      const p2 = new THREE.Mesh(archPillarGeo, stoneMat);
      p2.position.set(CS / 2 - 0.4, (WH + 0.5) / 2, 0);

      // Lintel beam across top
      const beamGeo = new THREE.BoxGeometry(CS, 0.8, 0.8);
      const beam = new THREE.Mesh(beamGeo, stoneMat);
      beam.position.set(0, WH + 0.5, 0);
      gGroup.add(p1, p2, beam);

      // Wooden gate barrier
      const woodMat = new THREE.MeshStandardMaterial({ color: 0x6e4321, roughness: 0.8 });
      const doorMesh = new THREE.Mesh(new THREE.BoxGeometry(CS - 0.8, 2.2, 0.25), woodMat);
      doorMesh.position.y = 1.1;
      doorMesh.name = 'doorMesh';
      gGroup.add(doorMesh);

      const gateLabel = createTextSprite(`🔒 ${g.name}`, '#f59e0b', 'Answer quiz correctly to unlock');
      gateLabel.position.set(0, 4.2, 0);
      gGroup.add(gateLabel);

      scene.add(gGroup);
      gateMap.set(g.id, gGroup);
    });
    gateMeshesRef.current = gateMap;

    // 11. Checkpoints
    AUTHORITATIVE_MAZE.checkpoints.forEach((cp) => {
      const cpGroup = new THREE.Group();
      const pos = gridToWorld(cp.x, cp.y);
      cpGroup.position.copy(pos);

      const flagPole = new THREE.Mesh(
        new THREE.CylinderGeometry(0.08, 0.08, 4.2, 8),
        new THREE.MeshStandardMaterial({ color: 0xd4d4d8 })
      );
      flagPole.position.y = 2.1;

      const flag = new THREE.Mesh(
        new THREE.PlaneGeometry(1.2, 0.7),
        new THREE.MeshStandardMaterial({ color: 0x3b82f6, side: THREE.DoubleSide })
      );
      flag.position.set(0.65, 3.6, 0);
      cpGroup.add(flagPole, flag);

      const cpLabel = createTextSprite(`🏁 ${cp.name}`, '#38bdf8');
      cpLabel.position.set(0, 5.0, 0);
      cpGroup.add(cpLabel);

      scene.add(cpGroup);
    });

    // 12. Team Starting Plazas & 3D Pawns
    const pawns = new Map<TeamId, { mesh: THREE.Group; label: THREE.Sprite }>();
    const roles: TeamId[] = ['HR', 'MARKETING', 'FINANCE', 'OPERATIONS'];

    roles.forEach((tid) => {
      const meta = TEAMS_META[tid];
      const startInfo = AUTHORITATIVE_MAZE.starts[tid];
      const startPos = gridToWorld(startInfo.x, startInfo.y);

      // Starting Plaza Flag & Pillar
      const startBanner = createTextSprite(`🚀 ${tid} START`, meta.primaryColor);
      startBanner.position.set(startPos.x, 6.0, startPos.z);
      scene.add(startBanner);

      // 3D Player Avatar / Pawn
      const pGroup = new THREE.Group();
      pGroup.position.set(startPos.x, 0, startPos.z);

      const teamColor = new THREE.Color(meta.primaryColor);
      const avatarMat = new THREE.MeshStandardMaterial({
        color: teamColor,
        roughness: 0.3,
        metalness: 0.1,
      });

      // Body (stylized chess knight / pawn capsule)
      const body = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.55, 1.4, 16), avatarMat);
      body.position.y = 0.7;
      body.castShadow = true;

      // Head
      const head = new THREE.Mesh(new THREE.SphereGeometry(0.35, 16, 16), avatarMat);
      head.position.y = 1.7;
      head.castShadow = true;

      // Forward direction visor/pointer
      const visor = new THREE.Mesh(
        new THREE.ConeGeometry(0.18, 0.4, 8),
        new THREE.MeshStandardMaterial({ color: 0xffffff })
      );
      visor.rotation.x = Math.PI / 2;
      visor.position.set(0, 1.7, 0.4);

      pGroup.add(body, head, visor);

      const nameLabel = createTextSprite(`${tid}`, meta.primaryColor);
      nameLabel.position.set(0, 2.7, 0);
      pGroup.add(nameLabel);

      scene.add(pGroup);
      pawns.set(tid, { mesh: pGroup, label: nameLabel });
    });
    playerPawnsRef.current = pawns;

    // Handle Window Resize
    const handleResize = () => {
      if (!mountRef.current || !rendererRef.current) return;
      const w = mountRef.current.clientWidth || window.innerWidth;
      const h = mountRef.current.clientHeight || window.innerHeight;
      const asp = w / h;

      if (overviewCameraRef.current) {
        overviewCameraRef.current.aspect = asp;
        overviewCameraRef.current.updateProjectionMatrix();
      }
      if (playerCameraRef.current) {
        playerCameraRef.current.aspect = asp;
        playerCameraRef.current.updateProjectionMatrix();
      }
      rendererRef.current.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Main 60FPS Render Loop
    let animId: number;
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      animId = requestAnimationFrame(animate);
      const dt = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      // 1. Rotate Golden Trophy & Keys
      if (trophyRef.current) {
        trophyRef.current.rotation.y += dt * 1.5;
      }
      keyMeshesRef.current.forEach((kGroup) => {
        kGroup.rotation.y += dt * 2.0;
        kGroup.position.y = 1.4 + Math.sin(currentTime * 0.003) * 0.15;
      });

      // 2. Camera Animation & Rendering
      const isOverview = isAdmin || phase === 'LOBBY' || phase === 'STUDY' || !myTeamId;

      if (isOverview) {
        // Elevated cinematic rotating overview during study/lobby
        studyOrbitAngle.current += dt * (phase === 'STUDY' ? 0.15 : 0.06);
        const orbitRadius = 90;
        const camY = phase === 'STUDY' ? 70 : 85;

        if (overviewCameraRef.current && rendererRef.current) {
          overviewCameraRef.current.position.set(
            Math.sin(studyOrbitAngle.current) * orbitRadius,
            camY,
            Math.cos(studyOrbitAngle.current) * orbitRadius
          );
          overviewCameraRef.current.lookAt(0, 0, 0);

          // All player avatars visible in overhead view
          playerPawnsRef.current.forEach(({ mesh }) => {
            mesh.visible = true;
          });

          rendererRef.current.render(scene, overviewCameraRef.current);
        }
      } else {
        // First-Person Mode for Players during Race
        if (playerCameraRef.current && rendererRef.current) {
          // Smoothly interpolate position (camera slide between cells)
          playerCamPos.current.lerp(playerCamTargetPos.current, Math.min(1.0, dt * 6.5));

          // Smoothly interpolate yaw rotation
          let diffYaw = playerCamTargetYaw.current - playerCamYaw.current;
          // Normalize angle difference to [-PI, PI]
          diffYaw = ((diffYaw + Math.PI) % (Math.PI * 2)) - Math.PI;
          playerCamYaw.current += diffYaw * Math.min(1.0, dt * 8.0);

          // Calculate walking head-bob
          const distToTarget = playerCamPos.current.distanceTo(playerCamTargetPos.current);
          const isWalking = distToTarget > 0.05;
          if (isWalking) headBobTime.current += dt * 10;
          const bobY = isWalking ? Math.sin(headBobTime.current) * 0.06 : 0;

          playerCameraRef.current.position.set(
            playerCamPos.current.x,
            1.65 + bobY,
            playerCamPos.current.z
          );
          playerCameraRef.current.rotation.set(0, playerCamYaw.current, 0);

          // Hide my own pawn in first-person so it doesn't block the screen
          playerPawnsRef.current.forEach(({ mesh }, tid) => {
            mesh.visible = tid !== myTeamId;
          });

          rendererRef.current.render(scene, playerCameraRef.current);
        }
      }
    };

    animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      if (rendererRef.current && rendererRef.current.domElement) {
        mount.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
      scene.clear();
    };
  }, [isAdmin, phase, myTeamId]);

  // Sync Dynamic State Updates (Player Positions, Keys, Gates)
  useEffect(() => {
    // 1. Update Keys visibility (hide collected keys)
    const collectedKeys = new Set<string>();
    if (myTeamState) {
      myTeamState.collectedKeys.forEach((k) => collectedKeys.add(k));
    }
    if (adminSpectatorTeams) {
      Object.values(adminSpectatorTeams).forEach((p) => {
        p.collectedKeys.forEach((k) => collectedKeys.add(k));
      });
    }

    keyMeshesRef.current.forEach((mesh, keyId) => {
      mesh.visible = !collectedKeys.has(keyId);
    });

    // 2. Update Gates visibility / open status
    const openGates = new Set<string>(unlockedGates);
    if (myTeamState) {
      myTeamState.unlockedGates.forEach((g) => openGates.add(g));
    }

    gateMeshesRef.current.forEach((gGroup, gateId) => {
      const isUnlocked = openGates.has(gateId);
      const doorMesh = gGroup.getObjectByName('doorMesh') as THREE.Mesh;
      if (doorMesh) {
        doorMesh.visible = !isUnlocked; // Lower / open door when unlocked
      }
    });

    // 3. Update Player Pawn Positions (for Admin or other players)
    if (adminSpectatorTeams) {
      Object.entries(adminSpectatorTeams).forEach(([tid, p]) => {
        const pawn = playerPawnsRef.current.get(tid as TeamId);
        if (pawn) {
          const worldPos = gridToWorld(p.x, p.y);
          pawn.mesh.position.set(worldPos.x, 0, worldPos.z);
          pawn.mesh.rotation.y = orientationToYaw(p.orientation);
        }
      });
    }

    // 4. Update First-Person Camera target for myTeamState
    if (myTeamState) {
      const targetPos = gridToWorld(myTeamState.x, myTeamState.y);
      playerCamTargetPos.current.set(targetPos.x, 1.65, targetPos.z);
      playerCamTargetYaw.current = orientationToYaw(myTeamState.orientation);

      // Update my pawn position for when spectator switches
      const myPawn = playerPawnsRef.current.get(myTeamState.teamId);
      if (myPawn) {
        myPawn.mesh.position.set(targetPos.x, 0, targetPos.z);
        myPawn.mesh.rotation.y = playerCamTargetYaw.current;
      }
    }
  }, [myTeamState, adminSpectatorTeams, unlockedGates]);

  return (
    <div className="relative w-full h-full overflow-hidden select-none bg-slate-950">
      {/* Three.js Canvas Container */}
      <div ref={mountRef} className="w-full h-full" />

      {/* 20-Second Synchronized Study Banner */}
      {phase === 'STUDY' && (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
          <div className="bg-slate-900/90 backdrop-blur-md border-2 border-emerald-500/80 px-8 py-4 rounded-3xl shadow-2xl text-center animate-in zoom-in-95 duration-300">
            <div className="text-xs font-black uppercase tracking-widest text-emerald-400">
              🌿 Phase 2: Synchronized Maze Study
            </div>
            <div className="text-3xl font-black text-white mt-1">
              Study the Maze: <span className="text-emerald-400 font-mono">{timeRemainingSec}s</span>
            </div>
            <p className="text-xs text-slate-300 mt-1 max-w-sm">
              Memorize the pathways, key locations, and central victory gazebo. Race starts in {timeRemainingSec} seconds!
            </p>
          </div>
        </div>
      )}

      {/* Admin Spectator Mode Overlay Badge */}
      {isAdmin && (
        <div className="absolute top-4 left-4 z-20 pointer-events-none bg-slate-900/80 backdrop-blur-md border border-slate-700/80 px-4 py-2 rounded-2xl flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-bold text-slate-200">
            👑 3D Overhead Referee Spectator Feed (Room: {roomCode})
          </span>
        </div>
      )}
    </div>
  );
};

export default MazeCanvas;
