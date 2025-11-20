let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Player cube
let geometry = new THREE.BoxGeometry(1,1,1);
let material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
let player = new THREE.Mesh(geometry, material);
scene.add(player);

player.position.y = 0.5;

// Camera offset behind player
let camOffset = new THREE.Vector3(0, 2, -5);

// Movement variables
let moveForward = false;
let moveRight = false;
let cameraLeft = false;
let cameraRight = false;

document.addEventListener('keydown', (e) => {
  if (e.key === 'w') moveForward = true;
  if (e.key === 'd') moveRight = true;
  if (e.key === 'a') cameraLeft = true;
  if (e.key === 's') cameraRight = true;
});

document.addEventListener('keyup', (e) => {
  if (e.key === 'w') moveForward = false;
  if (e.key === 'd') moveRight = false;
  if (e.key === 'a') cameraLeft = false;
  if (e.key === 's') cameraRight = false;
});

function animate() {
  requestAnimationFrame(animate);

  // Camera rotation left-right
  if (cameraLeft) player.rotation.y += 0.03;
  if (cameraRight) player.rotation.y -= 0.03;

  // Movement
  if (moveForward) {
    player.position.x -= Math.sin(player.rotation.y) * 0.1;
    player.position.z -= Math.cos(player.rotation.y) * 0.1;
  }
  if (moveRight) {
    player.position.x -= Math.sin(player.rotation.y - Math.PI/2) * 0.1;
    player.position.z -= Math.cos(player.rotation.y - Math.PI/2) * 0.1;
  }

  // Camera follows player
  let camPos = player.position.clone().add(
    camOffset.clone().applyAxisAngle(new THREE.Vector3(0,1,0), player.rotation.y)
  );
  camera.position.copy(camPos);
  camera.lookAt(player.position);

  renderer.render(scene, camera);
}

animate();
