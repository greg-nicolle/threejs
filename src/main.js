var camera;
var scene;
var renderer;
var controls;

init();
animate();

function init() {

  // Create a scene
  scene = new THREE.Scene();

  // Add the camera
  camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.set(0, 100, 250);

  // Add scene elements
  addSceneElements();

  // Add lights
  addLights();

  // Create the WebGL Renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );

  // Append the renderer to the body
  document.body.appendChild( renderer.domElement );

  // Add a resize event listener
  window.addEventListener( 'resize', onWindowResize, false );

  // Add the orbit controls
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.target = new THREE.Vector3(0, 100, 0);
}

function addLights() {  //TODO
  var dirLight = new THREE.DirectionalLight(0xffffff, 1);
  dirLight.position.set(100, 100, 50);
  scene.add(dirLight);

  var hemLight = new THREE.HemisphereLight(0xffe5bb, 0xFFBF00, .1);
  scene.add(hemLight);

  var spotLight = new THREE.SpotLight(0xffffff, 1, 200, 20, 10);
  spotLight.position.set( 0, 150, 0 );

  var spotTarget = new THREE.Object3D();
  spotTarget.position.set(0, 0, 0);
  spotLight.target = spotTarget;

  scene.add(spotLight);
  scene.add(new THREE.PointLightHelper(spotLight, 1));
}

function addSceneElements() {
  // Create a cube used to build the floor and walls
  var cube = new THREE.CubeGeometry( 200, 1, 200);

  // create different materials
  var floorMat = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('data/grass_diffuse.png') } );
  var wallMat = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('data/Noise.jpg') } );
  var redMat = new THREE.MeshPhongMaterial( { color: 0xff3300, specular: 0x555555, shininess: 30 } );
  var purpleMat = new THREE.MeshPhongMaterial( { color: 0x6F6CC5, specular: 0x555555, shininess: 30 } );

  // Floor
  var floor = new THREE.Mesh(cube, floorMat );
  scene.add( floor );

  // Back wall
  var backWall = new THREE.Mesh(cube, wallMat );
  backWall.rotation.x = Math.PI/180 * 90;
  backWall.position.set(0,100,-100);
  scene.add( backWall );

  // Left wall
  var leftWall = new THREE.Mesh(cube, wallMat );
  leftWall.rotation.x = Math.PI/180 * 90;
  leftWall.rotation.z = Math.PI/180 * 90;
  leftWall.position.set(-100,100,0);
  scene.add( leftWall );

  // Right wall
  var rightWall = new THREE.Mesh(cube, wallMat );
  rightWall.rotation.x = Math.PI/180 * 90;
  rightWall.rotation.z = Math.PI/180 * 90;
  rightWall.position.set(100,100,0);
  scene.add( rightWall );

  // Sphere
  var sphere = new THREE.Mesh(new THREE.SphereGeometry(20, 70, 20), redMat);
  sphere.position.set(-25, 100, -20);
  scene.add(sphere);

  // Knot thingy
  var knot = new THREE.Mesh(new THREE.TorusKnotGeometry( 40, 3, 100, 16 ), purpleMat);
  knot.position.set(0, 60, 30);
  scene.add(knot);
}

function animate() {
  renderer.render( scene, camera );
  requestAnimationFrame( animate );
  controls.update();
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}