
        import * as THREE from 'three';
        import { OrbitControls } from 'jsm/controls/OrbitControls.js';
        import {GUI} from 'dat.gui';

        const clock = new THREE.Clock()
        let k = 0;
        const greetings = ["HELLO", "BONJOUR", "CHIAO","你好", "こんにちは","HALLO", "안녕하세요", "नमस्ते", "مرحبا", "שלום","HOLA","Сайн уу","OLÁ", "SALVE"];
        let scene, camera, renderer, controls, sprites = [];
        let particleCount = 5000;
        let positions = new Float32Array(particleCount * 3);
        let targetPositions = new Float32Array(particleCount * 3);
        const asciiChars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`';
          const settings = {
            particleColor: '#00ffff',
            particleOpacity: 0.8,
            particleSize: 1
        };
        
        function init() {
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.z = 25;
            
            renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            renderer.setSize(window.innerWidth, window.innerHeight);
            document.body.appendChild(renderer.domElement);
            
           
           // OrbitControls: attach to the renderer DOM element
           controls = new OrbitControls(camera, renderer.domElement);
           controls.enableDamping = true; // smooth motion
        //    controls.dampingFactor = 0.05;
           controls.minDistance = 10;
           controls.maxDistance = 200;
           // adjust as needed:
           // controls.rotateSpeed = 0.7;
           // controls.panSpeed = 0.5;
           // controls.enablePan = true;
            createAsciiParticles();
            createTextParticles('HELLO');

            //GUI Controls
            const gui = new GUI({autoPlace: false});
            document.getElementById('controls').appendChild(gui.domElement);
            const colorFolder = gui.addFolder("Color");
            const particleFolder = gui.addFolder("Particle");
            particleFolder.add(settings, 'particleSize').name('Particle Size').min(0.1).max(5).step(0.1).onChange((value) => {
                sprites.forEach(sprite => {
                    sprite.scale.set(value, value, value);
                });
            });
            colorFolder.addColor(settings, 'particleColor').name('Particle Color').onChange((value) => {
                const color = new THREE.Color(value);
                sprites.forEach(sprite => {
                    sprite.material.color = color;
                });
            });
            colorFolder.add(settings, 'particleOpacity').name('Particle Opacity').min(0).max(1).step(0.01).onChange((value) => {
                sprites.forEach(sprite => {
                    sprite.material.opacity = value;
                });
            });
            document.getElementById('textInput').addEventListener('input', (e) => {
                const text = e.target.value.toUpperCase() || 'HELLO';
                createTextParticles(text);
            });
            
            window.addEventListener('resize', onResize);
            animate();
        }
        
        function createAsciiTexture(char) {
            const canvas = document.createElement('canvas');
            canvas.width = 64;
            canvas.height = 64;
            const ctx = canvas.getContext('2d');
            
            ctx.fillStyle = 'rgba(0, 0, 0, 0)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#5861e7f8';
            ctx.font = 'bold 48px monospace';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(char, canvas.width / 2, canvas.height / 2);
            
            const texture = new THREE.CanvasTexture(canvas);
            texture.needsUpdate = true;
            return texture;
        }
        
        function createAsciiParticles() {
            for (let i = 0; i < particleCount; i++) {
                const char = asciiChars[Math.floor(Math.random() * asciiChars.length)];
                const texture = createAsciiTexture(char);
                
                const material = new THREE.SpriteMaterial({
                    map: texture,
                    color: 0x00ffff,
                    transparent: true,
                    opacity: 0.8,
                    blending: THREE.AdditiveBlending
                });
                
                const sprite = new THREE.Sprite(material);
                sprite.scale.set(1, 1, 1);
                
                positions[i * 3] = (Math.random() - 0.5) * 100;
                positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
                positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
                
                sprite.position.set(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
                
                scene.add(sprite);
                sprites.push(sprite);
            }
        }
        
        function createTextParticles(text) {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = 800;
            canvas.height = 200;
            
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'white';
            ctx.font = 'bold 120px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(text, canvas.width / 2, canvas.height / 2);
            
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const pixels = [];
            
            for (let y = 0; y < canvas.height; y += 3) {
                for (let x = 0; x < canvas.width; x += 3) {
                    const i = (y * canvas.width + x) * 4;
                    if (imageData.data[i] > 128) {
                        pixels.push({
                            x: (x - canvas.width / 2) / 10,
                            y: -(y - canvas.height / 2) / 10,
                            z: 0
                        });
                    }
                }
            }
            
            for (let i = 0; i < particleCount; i++) {
                const pixel = pixels[i % pixels.length];
                targetPositions[i * 3] = pixel.x + (Math.random() - 0.5) ;
                targetPositions[i * 3 + 1] = pixel.y + (Math.random() - 0.5) ;
                targetPositions[i * 3 + 2] = pixel.z + (Math.random() - 0.5) * 2;
            }
        }
        let lastTriggered = 0;
        function animate() {
            const elapsedTime = clock.getElapsedTime()
            requestAnimationFrame(animate);

            const tanValue = Math.tan(elapsedTime * 0.2);
    
    // Trigger when tan exceeds a threshold (approaching asymptote)
            if (Math.abs(tanValue) > 25 && elapsedTime - lastTriggered > 2) {
                k += 1;
                createTextParticles(greetings[k % greetings.length]);
                lastTriggered = elapsedTime;
            }
            for (let i = 0; i < particleCount; i++) {
                positions[i * 3] += (targetPositions[i * 3] - positions[i * 3]) * 0.05 + (Math.random() - 0.5) * (0.3 * Math.tan(elapsedTime*.2));
                positions[i * 3 + 1] += (targetPositions[i * 3 + 1] - positions[i * 3 + 1]) * 0.05 + (Math.random() - 0.5) * (0.3 * Math.tan(elapsedTime*.2));
                positions[i * 3 + 2] += (targetPositions[i * 3 + 2] - positions[i * 3 + 2]) * 0.05 + (Math.random() - 0.5) * (0.3 * Math.tan(elapsedTime*.2));
                
                sprites[i].position.set(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
            }
            
            //scene.rotation.y += 0.001;
            
            renderer.render(scene, camera);
        }
        
        function onResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }
        
        init();