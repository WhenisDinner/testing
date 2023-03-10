import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js'

class Application{
    constructor(){
        this.scene = new THREE.Scene();
        
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setClearColor(0xffffff, 1.0);
        this.renderer.setSize(window.innerWidth/2.00, window.innerHeight/2.00);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        
        this.clock = new THREE.Clock();

        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);
        this.camera.position.set(8, 25, 12);
        this.camera.lookAt(this.scene.position);

        //set up light
        this.light = new THREE.DirectionalLight( 0xffffff, 1 );
        this.light.position.set( 5, 8, 0 );
        this.light.target.position.set(-3, -5, 5);
        this.light.castShadow = true;
        this.scene.add( this.light );
        this.scene.add(this.light.target);
        this.helper = new THREE.DirectionalLightHelper(this.light);
        this.scene.add( this.helper );

        //load textures and meshes
        this.textureLoader = new THREE.TextureLoader();
        let texture = this.textureLoader.load('static/qt.jpg');
        const geom_cube = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshStandardMaterial({
            map: texture
        });
        this.mesh = new THREE.Mesh(geom_cube, material);
        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;
        this.scene.add(this.mesh);
        
        const geom_floor = new THREE.BoxGeometry(20, 1, 20);
        let floor = new THREE.Mesh(geom_floor, material);
        floor.castShadow = true;
        floor.receiveShadow = true;
        floor.position.y = -3;
        this.scene.add(floor);
        
        //initial render
        document.body.appendChild(this.renderer.domElement);
        this.renderer.domElement.id = "title_effect";
        this.renderer.render(this.scene, this.camera);
    }
}

var app = new Application()
console.log(document.body)
document.getElementById("title_effect").addEventListener("click", MouseClick)

var initial_scale = app.mesh.scale;

function animate(){
    const elapsedTime = app.clock.getElapsedTime()
    app.mesh.scale.set(2 + Math.sin(elapsedTime*2)/7.0,
                       2 + Math.sin(elapsedTime*2)/7.0,
                       2 + Math.sin(elapsedTime*2)/7.0)
    requestAnimationFrame(animate)
    app.renderer.render(app.scene, app.camera)
    app.helper.update()
}

function MouseClick(evt) {
    var mouse_pos = evt.clientX
    console.log(mouse_pos)
}

animate()