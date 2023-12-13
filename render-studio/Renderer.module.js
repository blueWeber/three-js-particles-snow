import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls';

export default class Renderer {
  //
  constructor(sizes, canvas, camera, alpha = true) {
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      alpha,
      antialias: true,
    });
    this.renderer.setSize(sizes.width, sizes.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    this.canvas = canvas;
    this.camera = camera;
  }

  setCamera(camera) {
    this.camera = camera;
  }

  setOrbitControls(enableZoom = true, enableRotate = true) {
    this.controls = new OrbitControls(this.camera, this.canvas);
    this.controls.enableDamping = true;
    this.controls.enableZoom = enableZoom;
    this.controls.enableRotate = enableRotate;
  }

  //
  render(scene) {
    this.controls?.update();
    this.renderer.render(scene, this.camera);
  }
}
