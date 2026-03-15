"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type Node = { x: number; y: number; z: number };
type Edge = { a: number; b: number; strength: number };
type Signal = {
  edgeIndex: number;
  startTime: number;
  duration: number;
  fromNodeA: boolean;
  color: THREE.Color;
};

const NODE_COUNT = 176;
const CONNECTION_DISTANCE = 4.2;
const FIELD_WIDTH = 24.5;
const FIELD_HEIGHT = 14.6;
const INNER_HALF_WIDTH = 7.6;
const INNER_HALF_HEIGHT = 4.3;
const MAX_SIGNALS = 30;

function createRingNode(): Node {
  while (true) {
    const x = (Math.random() - 0.5) * FIELD_WIDTH;
    const y = (Math.random() - 0.5) * FIELD_HEIGHT;
    const insideInner = Math.abs(x) < INNER_HALF_WIDTH && Math.abs(y) < INNER_HALF_HEIGHT;

    if (!insideInner) {
      return {
        x,
        y,
        z: (Math.random() - 0.5) * 3.2,
      };
    }
  }
}

export function NeuralNetworkScene() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 120);
    camera.position.set(0, 0, 13.6);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0xffffff, 0);

    const nodes: Node[] = Array.from({ length: NODE_COUNT }, () => createRingNode());

    const edges: Edge[] = [];
    const degrees = new Array(nodes.length).fill(0);

    for (let i = 0; i < nodes.length; i += 1) {
      for (let j = i + 1; j < nodes.length; j += 1) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dz = nodes[i].z - nodes[j].z;
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (distance <= CONNECTION_DISTANCE) {
          edges.push({
            a: i,
            b: j,
            strength: 1 - distance / CONNECTION_DISTANCE,
          });
          degrees[i] += 1;
          degrees[j] += 1;
        }
      }
    }

    const pointGeometry = new THREE.BufferGeometry();
    const pointPositions = new Float32Array(nodes.length * 3);
    const pointColors = new Float32Array(nodes.length * 3);

    nodes.forEach((node, index) => {
      pointPositions[index * 3] = node.x;
      pointPositions[index * 3 + 1] = node.y;
      pointPositions[index * 3 + 2] = node.z;

      pointColors[index * 3] = 0.08;
      pointColors[index * 3 + 1] = 0.08;
      pointColors[index * 3 + 2] = 0.08;
    });

    pointGeometry.setAttribute("position", new THREE.BufferAttribute(pointPositions, 3));
    pointGeometry.setAttribute("color", new THREE.BufferAttribute(pointColors, 3));

    const points = new THREE.Points(
      pointGeometry,
      new THREE.PointsMaterial({
        size: 0.12,
        vertexColors: true,
        transparent: true,
        opacity: 0.96,
      }),
    );

    scene.add(points);

    const edgeGeometry = new THREE.BufferGeometry();
    const edgePositions = new Float32Array(edges.length * 2 * 3);
    const edgeColors = new Float32Array(edges.length * 2 * 3);

    edges.forEach((edge, edgeIndex) => {
      const nodeA = nodes[edge.a];
      const nodeB = nodes[edge.b];

      const baseIndex = edgeIndex * 6;
      edgePositions[baseIndex] = nodeA.x;
      edgePositions[baseIndex + 1] = nodeA.y;
      edgePositions[baseIndex + 2] = nodeA.z;
      edgePositions[baseIndex + 3] = nodeB.x;
      edgePositions[baseIndex + 4] = nodeB.y;
      edgePositions[baseIndex + 5] = nodeB.z;

      const baseColor = 0.11 + edge.strength * 0.08;
      edgeColors[baseIndex] = baseColor;
      edgeColors[baseIndex + 1] = baseColor;
      edgeColors[baseIndex + 2] = baseColor;
      edgeColors[baseIndex + 3] = baseColor;
      edgeColors[baseIndex + 4] = baseColor;
      edgeColors[baseIndex + 5] = baseColor;
    });

    edgeGeometry.setAttribute("position", new THREE.BufferAttribute(edgePositions, 3));
    edgeGeometry.setAttribute("color", new THREE.BufferAttribute(edgeColors, 3));

    const lines = new THREE.LineSegments(
      edgeGeometry,
      new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
      }),
    );

    scene.add(lines);

    const hubIndices = degrees
      .map((degree, index) => ({ degree, index }))
      .filter((item) => item.degree >= 6)
      .map((item) => item.index);

    const hubGeometry = new THREE.BufferGeometry();
    const hubPositions = new Float32Array(hubIndices.length * 3);
    const hubColors = new Float32Array(hubIndices.length * 3);

    hubIndices.forEach((nodeIndex, index) => {
      const node = nodes[nodeIndex];
      hubPositions[index * 3] = node.x;
      hubPositions[index * 3 + 1] = node.y;
      hubPositions[index * 3 + 2] = node.z;

      hubColors[index * 3] = 0.06;
      hubColors[index * 3 + 1] = 0.06;
      hubColors[index * 3 + 2] = 0.06;
    });

    hubGeometry.setAttribute("position", new THREE.BufferAttribute(hubPositions, 3));
    hubGeometry.setAttribute("color", new THREE.BufferAttribute(hubColors, 3));

    const hubs = new THREE.Points(
      hubGeometry,
      new THREE.PointsMaterial({
        size: 0.24,
        vertexColors: true,
        transparent: true,
        opacity: 0.9,
      }),
    );

    scene.add(hubs);

    const signalGeometry = new THREE.BufferGeometry();
    const signalPositions = new Float32Array(MAX_SIGNALS * 3);
    const signalColors = new Float32Array(MAX_SIGNALS * 3);
    const signals = new Array<Signal | null>(MAX_SIGNALS).fill(null);

    for (let index = 0; index < MAX_SIGNALS; index += 1) {
      signalPositions[index * 3] = 9999;
      signalPositions[index * 3 + 1] = 9999;
      signalPositions[index * 3 + 2] = 9999;
      signalColors[index * 3] = 0;
      signalColors[index * 3 + 1] = 0;
      signalColors[index * 3 + 2] = 0;
    }

    signalGeometry.setAttribute("position", new THREE.BufferAttribute(signalPositions, 3));
    signalGeometry.setAttribute("color", new THREE.BufferAttribute(signalColors, 3));

    const signalPoints = new THREE.Points(
      signalGeometry,
      new THREE.PointsMaterial({
        size: 0.18,
        vertexColors: true,
        transparent: true,
        opacity: 0.98,
      }),
    );

    scene.add(signalPoints);

    const baseBlue = new THREE.Color("#2f8fff");
    let nextSignalSpawnAt = 0.58;

    const randomSignalColor = () => {
      if (Math.random() < 0.55) {
        return baseBlue.clone();
      }

      const randomColor = new THREE.Color();
      randomColor.setHSL(Math.random(), 0.85, 0.62);
      return randomColor;
    };

    const spawnSignal = (elapsed: number) => {
      const availableIndex = signals.findIndex((signal) => signal === null);
      if (availableIndex === -1 || edges.length === 0) {
        return;
      }

      const edgeIndex = Math.floor(Math.random() * edges.length);

      signals[availableIndex] = {
        edgeIndex,
        startTime: elapsed,
        duration: 1.25 + Math.random() * 1.7,
        fromNodeA: Math.random() > 0.5,
        color: randomSignalColor(),
      };
    };

    const pointer = { x: 0, y: 0, active: false };
    let pulseStart = 0;

    const onPointerMove = (event: PointerEvent | MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) {
        return;
      }

      pointer.x = ((event.clientX - rect.left) / rect.width - 0.5) * FIELD_WIDTH;
      pointer.y = (0.5 - (event.clientY - rect.top) / rect.height) * FIELD_HEIGHT;
      pointer.active = true;
      pulseStart = performance.now() * 0.001;
    };

    const onPointerLeave = () => {
      pointer.active = false;
    };

    canvas.addEventListener("pointermove", onPointerMove);
    window.addEventListener("mousemove", onPointerMove);
    window.addEventListener("mouseleave", onPointerLeave);

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      if (width === 0 || height === 0) {
        return;
      }

      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    resize();

    const resizeObserver = new ResizeObserver(resize);
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    let rafId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();
      const waveRadius = Math.max(0, (elapsed - pulseStart) * 3.8);

      if (elapsed >= nextSignalSpawnAt) {
        spawnSignal(elapsed);

        if (Math.random() < 0.48) {
          spawnSignal(elapsed + 0.02);
        }

        nextSignalSpawnAt = elapsed + 0.34 + Math.random() * 1.05;
      }

      nodes.forEach((node, nodeIndex) => {
        const driftX = Math.sin(elapsed * 0.48 + nodeIndex * 0.31) * 0.13;
        const driftY = Math.cos(elapsed * 0.4 + nodeIndex * 0.27) * 0.12;
        const candidateX = node.x + driftX;
        const candidateY = node.y + driftY;
        const insideInner = Math.abs(candidateX) < INNER_HALF_WIDTH && Math.abs(candidateY) < INNER_HALF_HEIGHT;

        pointPositions[nodeIndex * 3] = insideInner ? node.x : candidateX;
        pointPositions[nodeIndex * 3 + 1] = insideInner ? node.y : candidateY;
        pointPositions[nodeIndex * 3 + 2] = node.z;

        const distanceToPointer = Math.hypot(pointPositions[nodeIndex * 3] - pointer.x, pointPositions[nodeIndex * 3 + 1] - pointer.y);
        const pulse = pointer.active
          ? Math.exp(-distanceToPointer * 0.98) + Math.exp(-Math.abs(distanceToPointer - waveRadius) * 1.85) * 0.95
          : 0;
        const intensity = Math.min(0.09 + pulse * 0.52, 1);

        pointColors[nodeIndex * 3] = intensity;
        pointColors[nodeIndex * 3 + 1] = intensity;
        pointColors[nodeIndex * 3 + 2] = intensity;
      });

      edges.forEach((edge, edgeIndex) => {
        const pointAIndex = edge.a * 3;
        const pointBIndex = edge.b * 3;
        const edgeBase = edgeIndex * 6;

        const ax = pointPositions[pointAIndex];
        const ay = pointPositions[pointAIndex + 1];
        const az = pointPositions[pointAIndex + 2];
        const bx = pointPositions[pointBIndex];
        const by = pointPositions[pointBIndex + 1];
        const bz = pointPositions[pointBIndex + 2];

        edgePositions[edgeBase] = ax;
        edgePositions[edgeBase + 1] = ay;
        edgePositions[edgeBase + 2] = az;
        edgePositions[edgeBase + 3] = bx;
        edgePositions[edgeBase + 4] = by;
        edgePositions[edgeBase + 5] = bz;

        const midpointDistance = Math.hypot((ax + bx) * 0.5 - pointer.x, (ay + by) * 0.5 - pointer.y);
        const pulse = pointer.active
          ? Math.exp(-midpointDistance * 0.98) + Math.exp(-Math.abs(midpointDistance - waveRadius) * 1.8) * 0.82
          : 0;

        const base = 0.1 + edge.strength * 0.12;
        const value = Math.min(base + pulse * 0.42, 0.95);

        edgeColors[edgeBase] = value;
        edgeColors[edgeBase + 1] = value;
        edgeColors[edgeBase + 2] = value;
        edgeColors[edgeBase + 3] = value;
        edgeColors[edgeBase + 4] = value;
        edgeColors[edgeBase + 5] = value;
      });

      (pointGeometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
      (pointGeometry.attributes.color as THREE.BufferAttribute).needsUpdate = true;
      (edgeGeometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
      (edgeGeometry.attributes.color as THREE.BufferAttribute).needsUpdate = true;

      hubIndices.forEach((nodeIndex, index) => {
        const pointIndex = nodeIndex * 3;
        const hubIndex = index * 3;
        const hx = pointPositions[pointIndex];
        const hy = pointPositions[pointIndex + 1];
        const hz = pointPositions[pointIndex + 2];

        hubPositions[hubIndex] = hx;
        hubPositions[hubIndex + 1] = hy;
        hubPositions[hubIndex + 2] = hz;

        const hubDistance = Math.hypot(hx - pointer.x, hy - pointer.y);
        const hubPulse = pointer.active
          ? Math.exp(-hubDistance * 0.98) + Math.exp(-Math.abs(hubDistance - waveRadius) * 1.7)
          : 0;
        const hubIntensity = Math.min(0.1 + hubPulse * 0.58, 1);

        hubColors[hubIndex] = hubIntensity;
        hubColors[hubIndex + 1] = hubIntensity;
        hubColors[hubIndex + 2] = hubIntensity;
      });

      (hubGeometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
      (hubGeometry.attributes.color as THREE.BufferAttribute).needsUpdate = true;

      for (let signalIndex = 0; signalIndex < signals.length; signalIndex += 1) {
        const signal = signals[signalIndex];
        const baseIndex = signalIndex * 3;

        if (!signal) {
          signalPositions[baseIndex] = 9999;
          signalPositions[baseIndex + 1] = 9999;
          signalPositions[baseIndex + 2] = 9999;
          signalColors[baseIndex] = 0;
          signalColors[baseIndex + 1] = 0;
          signalColors[baseIndex + 2] = 0;
          continue;
        }

        const progress = (elapsed - signal.startTime) / signal.duration;
        if (progress >= 1) {
          signals[signalIndex] = null;
          signalPositions[baseIndex] = 9999;
          signalPositions[baseIndex + 1] = 9999;
          signalPositions[baseIndex + 2] = 9999;
          signalColors[baseIndex] = 0;
          signalColors[baseIndex + 1] = 0;
          signalColors[baseIndex + 2] = 0;
          continue;
        }

        const edgeBase = signal.edgeIndex * 6;
        const ax = edgePositions[edgeBase];
        const ay = edgePositions[edgeBase + 1];
        const az = edgePositions[edgeBase + 2];
        const bx = edgePositions[edgeBase + 3];
        const by = edgePositions[edgeBase + 4];
        const bz = edgePositions[edgeBase + 5];
        const t = signal.fromNodeA ? progress : 1 - progress;

        signalPositions[baseIndex] = ax + (bx - ax) * t;
        signalPositions[baseIndex + 1] = ay + (by - ay) * t;
        signalPositions[baseIndex + 2] = az + (bz - az) * t;

        const alpha = 0.6 + Math.sin(progress * Math.PI) * 0.4;
        signalColors[baseIndex] = signal.color.r * alpha;
        signalColors[baseIndex + 1] = signal.color.g * alpha;
        signalColors[baseIndex + 2] = signal.color.b * alpha;
      }

      (signalGeometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
      (signalGeometry.attributes.color as THREE.BufferAttribute).needsUpdate = true;

      const rotationZ = Math.sin(elapsed * 0.1) * 0.018;

      points.rotation.z = rotationZ;
      lines.rotation.z = rotationZ;
      hubs.rotation.z = rotationZ;
      signalPoints.rotation.z = rotationZ;

      renderer.render(scene, camera);
      rafId = window.requestAnimationFrame(animate);
    };

    rafId = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(rafId);
      canvas.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("mouseleave", onPointerLeave);
      resizeObserver.disconnect();

      pointGeometry.dispose();
      edgeGeometry.dispose();
      hubGeometry.dispose();
      signalGeometry.dispose();
      (points.material as THREE.PointsMaterial).dispose();
      (lines.material as THREE.LineBasicMaterial).dispose();
      (hubs.material as THREE.PointsMaterial).dispose();
      (signalPoints.material as THREE.PointsMaterial).dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="h-full w-full" aria-hidden="true" />;
}
