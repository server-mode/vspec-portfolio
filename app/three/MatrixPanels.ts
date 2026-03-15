import * as THREE from "three";

export type MatrixPanelsController = {
  group: THREE.Group;
  update: (elapsedTime: number) => void;
};

export function createMatrixPanels(): MatrixPanelsController {
  const group = new THREE.Group();
  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.28,
  });

  const panels: THREE.LineSegments[] = [];

  const columns = 5;
  const rows = 4;
  const spacingX = 1.6;
  const spacingY = 1.05;

  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      const panel = new THREE.PlaneGeometry(1.22, 0.72, 2, 2);
      const edges = new THREE.EdgesGeometry(panel);
      const lines = new THREE.LineSegments(edges, lineMaterial.clone());

      const x = (column - (columns - 1) / 2) * spacingX + (row % 2 === 0 ? 0 : 0.32);
      const y = (row - (rows - 1) / 2) * spacingY;
      const z = -row * 0.9 + column * 0.08;

      lines.position.set(x, y, z);
      lines.rotation.x = -0.15;
      lines.rotation.y = row % 2 === 0 ? 0.14 : -0.14;

      lines.userData.base = {
        x,
        y,
        z,
        index: row * columns + column,
      };

      group.add(lines);
      panels.push(lines);
    }
  }

  return {
    group,
    update: (elapsedTime: number) => {
      panels.forEach((panel) => {
        const base = panel.userData.base as {
          x: number;
          y: number;
          z: number;
          index: number;
        };

        panel.position.y = base.y + Math.sin(elapsedTime * 0.4 + base.index * 0.45) * 0.1;
        panel.position.x = base.x + Math.cos(elapsedTime * 0.26 + base.index * 0.18) * 0.05;
        panel.rotation.z = Math.sin(elapsedTime * 0.22 + base.index * 0.24) * 0.08;
      });
    },
  };
}
