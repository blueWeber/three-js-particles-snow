import * as THREE from 'three';

export default class Camera {
  constructor(sizes) {
    this.camera = new THREE.PerspectiveCamera(
      75,
      sizes.width / sizes.height,
      0.1,
      1000
    );

    return this.camera;
  }
}
