import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
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
//import { ThreeMFLoader } from "three/examples/jsm/Addons.js";
//Setup Renderer
const w = window.innerWidth;
const h = window.innerHeight;
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(w,h);
document.body.appendChild(renderer.domElement);
//
//Setup Camera
const fov = 75;
const aspect = w / h;
const near = 0.1;
const far = 10;
const camera = new THREE.PerspectiveCamera(fov,aspect, near, far);
camera.position.z = 2; //Scooch camera back so we can see whats in the center of the screen
//Create a Scene
const scene = new THREE.Scene();

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.03;

const particlesGeometry = new THREE.BufferGeometry;
const particlesCount = 5000;
const posArray = new Float32Array(particlesCount*3);
for(let i = 0; i < particlesCount * 3; i++){
    posArray[i] = (Math.random() - 0.5)* (Math.log(i));
}
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray,3));

const cubeGeo= new THREE.BoxGeometry(1)

const geo1 = new THREE.IcosahedronGeometry(1.1,2);
const mat1 = new THREE.PointsMaterial({
    transparent: true,
    size: 0.002

});
const particlesMesh = new THREE.Points(particlesGeometry, mat1);
scene.add(particlesMesh);

const points1 = new THREE.Points(geo1,mat1);
//scene.add(points1);

const geo = new THREE.IcosahedronGeometry(1.0,2);
const mat = new THREE.MeshStandardMaterial({
    color: 0xccff,
    flatShading: true
})
const mesh = new THREE.Mesh(geo,mat);
//scene.add(mesh);

const wireMat = new THREE.MeshBasicMaterial({
    color:0xffffff,
    wireframe:true
});
const wireMesh = new THREE.Mesh(cubeGeo,wireMat);
//mesh.add(wireMesh);
wireMesh.scale.setScalar(.75);
scene.add(wireMesh);

const hemiLight = new THREE.HemisphereLight(0xFFBF00,0xffffff);
scene.add(hemiLight);

function animate(){
    requestAnimationFrame(animate);
    renderer.render(scene,camera);
    controls.update();
}
animate();

