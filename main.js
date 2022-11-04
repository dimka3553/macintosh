import "./style.css";

import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import gsap from "gsap";

const scene = new THREE.Scene();

let camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
  alpha: true,
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);

// const controls = new OrbitControls(camera, renderer.domElement);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(0, 3, 2);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight, pointLight);

const loader = new GLTFLoader();

let mac;

function loadModel() {
  loader.load("./model/scene.gltf", function (gltf) {
    gltf.scene.position.set(0, -0.3, -1.3);
    mac = gltf.scene;
    scene.add(gltf.scene);
    return gltf.scene;
  });
}

mac = loadModel();

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
addEventListener("resize", (event) => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  moveCamera();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

document.body.onscroll = moveCamera;

let topSec = document.querySelector(".y");
let ti = document.querySelector(".x");
let m = document.querySelector(".m");
let mouse = document.querySelector(".mouse");
let folder = document.querySelector(".folder");
let watch = document.querySelector(".watch");
let canvas = document.querySelector("#bg");
let sec2 = document.querySelector(".sec2");
let spectable = document.querySelector(".spectable");
let o = document.querySelector(".o");
let q = document.querySelector(".q");
let nav = document.querySelector("nav");

function moveCamera() {
  const t = -document.body.getBoundingClientRect().top / 5;
  if (mac) {
    if (t < 0) {
      camera.position.z = 0;
      mac.rotation.y = 0;
      camera.position.y = 0;
    } else if (t < 300 && t >= 0) {
      camera.position.z = t * 0.01;
      topSec.style.opacity = 1 - t * 0.0055;
      topSec.style.scale = 1 + t * 0.0055;
      mac.rotation.y = 0;
      ti.style.opacity = 0;
      ti.style.scale = 0;
      camera.position.y = 0;
    } else if (t >= 300 && t < 380) {
      ti.style.opacity = (t - 300) * 0.0125;
      ti.style.scale = (t - 300) * 0.0125;
      topSec.style.opacity = 0;
      camera.position.z = t * 0.01;
      camera.position.y = (t - 300) * 0.02;
      mac.rotation.y = 0;
      m.style.top = 0 + "px";
      canvas.style.top = 0 + "px";
    } else if (t >= 380 && t < 694.25) {
      ti.style.opacity = 1;
      ti.style.scale = 1;
      topSec.style.opacity = 0;
      mac.rotation.y = (t - 380) * 0.02;
      canvas.style.top = 0 + "px";
      m.style.top = 0 + "px";
    } else if (t >= 694.25 && t < 920) {
      canvas.style.top = -(t - 694.25) * 3 + "px";
      m.style.top = -(t - 694.25) * 2 + "px";
      mac.rotation.y = 0;
      topSec.style.opacity = 0;
      mouse.style.top = 0 + "px";
      mouse.style.left = 0 + "px";
    } else if (t >= 920 && t < 1046) {
      canvas.style.top = -(t - 694.25) * 3 + "px";
      m.style.top = -(t - 694.25) * 2 + "px";
      mac.rotation.y = 0;
      topSec.style.opacity = 0;
      mouse.style.top = (t - 920) * 0.3571 + "%";
      mouse.style.left = (t - 920) * 0.3571 + "%";
      topSec.style.opacity = 0;
      mouse.style.transform = "translate(0%, 0%)";
      folder.style.filter = "invert(" + 0 + ")";
      folder.setAttribute("style", "-webkit-filter:invert(" + 0 + ")");
      mouse.style.scale = 1;
    } else if (t >= 1046 && t < 1146) {
      mouse.style.left = "44%";
      mouse.style.transform = "translate(0%, 0%)";
      topSec.style.opacity = 0;
      mouse.style.top = 44 + "%";
      folder.style.filter = "invert(" + (t - 1046) * 0.01 + ")";
      folder.setAttribute(
        "style",
        "-webkit-filter:invert(" + (t - 1046) * 0.01 + ")"
      );
      mouse.style.width = 136 + "px";
      mouse.style.height = 139 + "px";
      mouse.style.scale = 1 - (t - 1046) * 0.01;
      topSec.style.opacity = 0;
      watch.style.width = 0 + "%";
      sec2.style.opacity = 100 + "%";
      watch.style.opacity = 0 + "%";
    } else if (t >= 1146 && t < 1480) {
      folder.style.filter = "invert(" + 1 + ")";
      watch.style.left = "50%";
      topSec.style.opacity = 0;
      watch.style.transform = "translate(-50%, -50%)";
      watch.style.top = 50 + "%";
      folder.setAttribute("style", "-webkit-filter:invert(" + 1 + ")");
      watch.style.width = (t - 1146) * 0.5 + "%";
      watch.style.scale = 100 + "%";
      watch.style.opacity = (t - 1146) * 2 + "%";
      q.style.scale = 1;
      o.style.scale = 1;
      q.style.opacity = 0;
      o.style.opacity = 0;
    } else if (t >= 1480 && t < 1680) {
      mouse.style.scale = 0;
      topSec.style.opacity = 0;
      let specWidth = spectable.offsetWidth;
      let marginTo = (window.innerWidth - specWidth) / 2 + specWidth;
      marginTo = marginTo / 200;
      spectable.style.marginLeft = (t - 1480) * marginTo - specWidth + "px";
      spectable.style.marginTop = (t - 1480) * 2 + "px";
      o.style.scale = 1 + (t - 1480) * 0.0075;
      o.style.opacity = (t - 1480) * 0.0075;
      q.style.scale = 1 + (t - 1480) * 0.0075;
      q.style.opacity = (t - 1480) * 0.0075;
      nav.style.height = 60 + "px";
    } else if (t >= 1680 && t < 1780) {
      spectable.style.marginLeft = "auto";
      spectable.style.marginRight = "auto";
      nav.style.height = 60 + "px";
    } else if (t >= 1780 && t < 1880) {
      nav.style.height = (t - 1780) * 1 + "vh";
    } else {
      nav.style.height = 100 + "vh";
    }
  }
}

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};
