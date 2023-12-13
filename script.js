import * as THREE from 'three';
import Camera from './render-studio/Camera.module.js';
import Renderer from './render-studio/Renderer.module.js';
import Scene from './render-studio/Scene.module.js';

/** Scene */
const scene = new Scene(false);

/** Objects */
// Points 메쉬 생성
// 지오메트리
const verticesAmount = 1000;
// 점 하나는 x, y, z 구성
const positionArray = new Float32Array(verticesAmount * 3);
// [x, y, z, x, y, z, x, y, z, .....]
for (let i = 0; i < verticesAmount * 3; i++) {
  positionArray[i] = (Math.random() - 0.5) * 4;
}
const geometry = new THREE.BufferGeometry();
geometry.setAttribute('position', new THREE.BufferAttribute(positionArray, 3));

// 마테리얼
// Textures
const textureLoader = new THREE.TextureLoader();
const particleTexture = textureLoader.load('./textures/snow.png');

const material = new THREE.PointsMaterial({
  color: 'white',
  map: particleTexture,
});
material.size = 0.03;
material.transparent = true;

const points = new THREE.Points(geometry, material);
scene.add(points);

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Sizes
const sizes = {
  width: 500,
  height: 300,
};

/** Render Studio - Camera, Renderer */
const camera = new Camera(sizes);
camera.position.z = 2;

//
const renderer = new Renderer(sizes, canvas, camera);
// renderer.setOrbitControls(false, true);

/**
 * Animations
 */
const clock = new THREE.Clock();

(function tick() {
  const elapsedTime = clock.getElapsedTime();
  const speed = elapsedTime * 0.05;

  points.rotation.x = speed;
  points.rotation.y = speed;

  //
  renderer.render(scene);

  //
  requestAnimationFrame(tick);
})();
