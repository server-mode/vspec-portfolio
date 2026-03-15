"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { createMatrixPanels } from "./MatrixPanels";

export function MatrixScene() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(46, 1, 0.1, 100);
    camera.position.set(0, 0, 9);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0xffffff, 0);

    const { group, update } = createMatrixPanels();
    scene.add(group);

    const pointer = { x: 0, y: 0 };

    const onMouseMove = (event: MouseEvent) => {
      pointer.x = (event.clientX / window.innerWidth - 0.5) * 2;
      pointer.y = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("mousemove", onMouseMove);

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

    const clock = new THREE.Clock();
    let rafId = 0;

    const loop = () => {
      const elapsed = clock.getElapsedTime();

      group.rotation.y = THREE.MathUtils.lerp(group.rotation.y, elapsed * 0.04 + pointer.x * 0.12, 0.04);
      group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, pointer.y * -0.08, 0.05);

      update(elapsed);
      renderer.render(scene, camera);
      rafId = window.requestAnimationFrame(loop);
    };

    rafId = window.requestAnimationFrame(loop);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      resizeObserver.disconnect();

      scene.traverse((object: THREE.Object3D) => {
        if (object instanceof THREE.LineSegments) {
          object.geometry.dispose();
          if (Array.isArray(object.material)) {
            object.material.forEach((material: THREE.Material) => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });

      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="h-full w-full" aria-hidden="true" />;
}
