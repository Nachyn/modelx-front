import mapboxgl, { CustomLayerInterface, Map } from 'mapbox-gl';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Camera } from 'three/src/cameras/Camera';
import { Scene } from 'three/src/scenes/Scene';
import { WebGLRenderer } from 'three/src/renderers/WebGLRenderer';
import { MapModel } from '../store/map/models/map-model';

export const createCustomLayer = (
  model: MapModel
): CustomLayerInterface & {
  camera?: Camera;
  scene?: Scene;
  map?: Map;
  renderer?: WebGLRenderer;
} => {
  const { latitude, longitude, id, glbModelUrl } = model;
  const modelAltitude = 0;
  const modelRotate = [Math.PI / 2, 0, 0];

  const modelAsMercatorCoordinate = mapboxgl.MercatorCoordinate.fromLngLat(
    { lat: latitude, lng: longitude },
    modelAltitude
  );

  // transformation parameters to position, rotate and scale the 3D model onto the Map
  const modelTransform = {
    translateX: modelAsMercatorCoordinate.x,
    translateY: modelAsMercatorCoordinate.y,
    translateZ: modelAsMercatorCoordinate.z,
    rotateX: modelRotate[0],
    rotateY: modelRotate[1],
    rotateZ: modelRotate[2],
    // Since the 3D model is in real world meters, a scale transform needs to be
    // applied since the CustomLayerInterface expects units in MercatorCoordinates.
    scale: modelAsMercatorCoordinate.meterInMercatorCoordinateUnits()
  };

  // configuration of the custom layer for a 3D model per the CustomLayerInterface
  return {
    id,
    type: 'custom',
    renderingMode: '3d',
    onAdd: function (map: Map, gl: WebGLRenderingContext) {
      this.camera = new THREE.Camera();
      this.scene = new THREE.Scene();

      // create two three.js lights to illuminate the model
      const directionalLight = new THREE.DirectionalLight(0xffffff);
      directionalLight.position.set(0, -70, 100).normalize();
      this.scene.add(directionalLight);

      const directionalLight2 = new THREE.DirectionalLight(0xffffff);
      directionalLight2.position.set(0, 70, 100).normalize();
      this.scene.add(directionalLight2);

      // use the three.js GLTF loader to add the 3D model to the three.js scene
      const loader = new GLTFLoader();
      loader.load(glbModelUrl, gltf => {
        this.scene!.add(gltf.scene);
      });
      this.map = map;

      // use the Mapbox GL JS Map canvas for three.js
      this.renderer = new THREE.WebGLRenderer({
        canvas: map.getCanvas(),
        context: gl,
        antialias: true
      });

      this.renderer.autoClear = false;
    },
    render: function (gl: WebGLRenderingContext, matrix: number[]) {
      const rotationX = new THREE.Matrix4().makeRotationAxis(
        new THREE.Vector3(1, 0, 0),
        modelTransform.rotateX
      );
      const rotationY = new THREE.Matrix4().makeRotationAxis(
        new THREE.Vector3(0, 1, 0),
        modelTransform.rotateY
      );
      const rotationZ = new THREE.Matrix4().makeRotationAxis(
        new THREE.Vector3(0, 0, 1),
        modelTransform.rotateZ
      );

      const m = new THREE.Matrix4().fromArray(matrix);
      const l = new THREE.Matrix4()
        .makeTranslation(
          modelTransform.translateX,
          modelTransform.translateY,
          modelTransform.translateZ as number
        )
        .scale(
          new THREE.Vector3(
            modelTransform.scale,
            -modelTransform.scale,
            modelTransform.scale
          )
        )
        .multiply(rotationX)
        .multiply(rotationY)
        .multiply(rotationZ);

      this.camera!.projectionMatrix = m.multiply(l);
      this.renderer!.resetState();
      this.renderer!.render(this.scene!, this.camera!);
      this.map!.triggerRepaint();
    }
  };
};
