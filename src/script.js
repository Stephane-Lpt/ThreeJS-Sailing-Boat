import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'
import { Sky } from 'three/examples/jsm/objects/Sky.js';
import * as dat from 'dat.gui'
import * as MATH from 'mathjs'


// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Loader
// const loader = new GLTFLoader();
// var hobieCat;
//
// loader.load( './models/hobieCatMin1.glb', function ( gltf ){
//   hobieCat = gltf.scene;  // hobieCat 3D object is loaded
//   hobieCat.scale.set(2, 2, 2);
//   hobieCat.position.x = 0;
//   hobieCat.position.y = 0;
//   hobieCat.position.z = 0;
//   hobieCat.rotation.y = -MATH.pi/2;
//   scene.add(gltf.scene)
//   tick();
// });


// Functions

// function inverserX(x){
//   if(x=0){
//     return 0;
//   }
//   else{
//     return (1/x);
//   }
// }
//
// console.log(inverserX(2))

// Objects


// Vecteurs

let vectors = [];
let columnsV = [];
for (let i = 0; i < 40; i++){
  columnsV = [];
  for(let j = 0; j<40; j++){
    columnsV.push(new THREE.Vector3(i+1,0,MATH.inv((i+.1)-0.99*i)));
    // console.log(MATH.inv((i+.1)-0.99*i));
  }
  vectors.push(columnsV);
}

let arrowHelper = [];
let columnsAH = [];
for (let i = 0; i<40; i++){
  columnsAH = [];
  for(let j = 0; j<40; j++){
    columnsAH.push(new THREE.ArrowHelper(vectors[i][j], new THREE.Vector3(i*.6-10,1,j*.6-10), .5, MATH.random()*0xFFFFFF));
  }
  arrowHelper.push(columnsAH);
  for(let j=0;j<40;j++){
    scene.add(arrowHelper[i][j]);
  }
}

console.table(arrowHelper);

// const a = new THREE.Vector3(2, 0, -2)
// a.normalize();
// const arrowHelper = new THREE.ArrowHelper(a, new THREE.Vector3(0,0,0), 1, 0xff0000)
// scene.add(arrowHelper)

// 3D Objects

const geometry = new THREE.BoxGeometry( 3, 0.5, 1 );

// Materials

const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );

// Mesh

const cube = new THREE.Mesh( geometry, material );
cube.position.x = 0;
cube.position.y = 0;
cube.position.z = 0;
scene.add( cube );

// Lights

const pointLight = new THREE.PointLight(0xffffff, 1)
pointLight.position.x = 5
pointLight.position.y = 5
pointLight.position.z = 5
pointLight.intensity = 3.1
scene.add(pointLight)

const pointLightHelper = new THREE.PointLightHelper(pointLight, 2)
scene.add(pointLightHelper)

const light1 = gui.addFolder('Light 1')
light1.add(pointLight.position, 'x').min(-5).max(5).step(0.01)
light1.add(pointLight.position, 'y').min(-5).max(5).step(0.01)
light1.add(pointLight.position, 'z').min(-5).max(5).step(0.01)
light1.add(pointLight, 'intensity').min(-5).max(5).step(0.01)

const light1Color = {
  color: 0x000000
}

light1.addColor(light1Color, 'color')
  .onChange(() => {
    pointLight.color.set(light1Color.color)
  })

  const pointLight2 = new THREE.PointLight(0xffffff, 1)
  pointLight2.position.x = -5
  pointLight2.position.y = 5
  pointLight2.position.z = -5
  pointLight2.intensity = 3.1
  scene.add(pointLight2)

  const pointLightHelper2 = new THREE.PointLightHelper(pointLight2, 2)
  scene.add(pointLightHelper2)

  const light2 = gui.addFolder('Light 2')
  light2.add(pointLight2.position, 'x').min(-5).max(5).step(0.01)
  light2.add(pointLight2.position, 'y').min(-5).max(5).step(0.01)
  light2.add(pointLight2.position, 'z').min(-5).max(5).step(0.01)
  light2.add(pointLight2, 'intensity').min(-5).max(5).step(0.01)

  const light2Color = {
    color: 0x000000
  }

  light2.addColor(light2Color, 'color')
    .onChange(() => {
      pointLight2.color.set(light2Color.color)
    })

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}


window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = -4
scene.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Controls

const controls = new OrbitControls(camera, renderer.domElement);
controls.zoomSpeed = 10;
controls.panSpeed = 7;
controls.maxZoom = 150;
//controls.autoRotate = true;Controls

// controls.enableDamping = true

/**
 * Animate
 */

const clock = new THREE.Clock()

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    // hobieCat.translateY(0.1);
    // controls.update();


    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
