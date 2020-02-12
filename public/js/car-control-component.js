let context;

AFRAME.registerComponent('car-control', {
    schema : {
        inCarCamera: {type: 'selector'},
        outCamera: {type: 'selector'},
        fog: {type: 'selector'},
        mode: {type: 'boolean'},
        acceleration: {type: 'number', default: 0.025},
        decceleration: {type: 'number', default: 0.0025},
        speed: {type: 'number', default: 0},
        topSpeed: {type: 'number', default: 0.5},
    },

    init : function() {
        console.log('init car control');

        //Init context
        context = this;
        console.log(context.el.components.sound.isPlaying);

        //Get mode
        //console.log("mode: " + context.data.mode); //Debug car mode

        //Functions
        context.clickFunction = function(e){ //on click
            context.el.setAttribute('car-control', {'mode': true});
            context.el.setAttribute("light", {type: 'ambient', color: '#fff', intensity: 1});
            context.el.classList.remove("raycastable");
            
            //Adjust Fog
            context.data.fog.setAttribute("fog", {far: 80});

            //Change Cameras
            context.data.inCarCamera.setAttribute("camera", {active: true});
            context.data.outCamera.setAttribute("camera", {active: false});
            context.data.inCarCamera.setAttribute("wasd-controls", {enabled: false});
            context.data.outCamera.setAttribute("sound", {volume: 0});
            context.data.outCamera.removeAttribute("walk");
            

            //Change variable values
            console.log("mode: " + context.data.mode);
            console.log(THREE.Math.radToDeg(context.el.object3D.rotation.y));
        }

        context.carHighlight = function(e){//Highlight car on hover
            context.el.setAttribute("light", {type: 'ambient', color: '#fff', intensity: 5});
        }

        context.carLowlight =  function(e){//Lowlight on hover out
            context.el.setAttribute("light", {type: 'ambient', color: '#fff', intensity: 1});
        }

        context.escCar = function(e){ //On keypress q
            if(e.keyCode === 81) {
                context.el.setAttribute('car-control', {inCarCamera: context.data.inCarCamera, mode: false});
                console.log("mode: " + context.data.mode);
                context.el.classList.add("raycastable");

                //Adjust Fog
                context.data.fog.setAttribute("fog", {far: 650});

                //Change Cameras
                context.data.outCamera.setAttribute("position", {x: context.el.object3D.position.x - 3, y: 1, z: context.el.object3D.position.z + 3});
                context.data.inCarCamera.setAttribute("camera", {active: false});
                context.data.outCamera.setAttribute("camera", {active: true});
                context.data.outCamera.setAttribute("sound", {volume: 1});
                context.data.outCamera.setAttribute("walk");
                context.el.setAttribute("wasd-controls", {enabled: false});
                
            }
        }

        var map = {}; //Map multiple keys. Source: https://stackoverflow.com/questions/5203407/how-to-detect-if-multiple-keys-are-pressed-at-once-using-javascript

        context.carKeyDown = function(e){ //On keydown

            //set multiple keys
            map[e.keyCode] = e.type == 'keydown';

            if(map[87]) { //On w
                if(context.data.speed < context.data.topSpeed){
                    context.data.speed += context.data.acceleration;
                }
                context.el.components.sound.playSound();
            }
            if(map[65]) {
                context.el.object3D.rotation.set(
                    0,
                    context.el.object3D.rotation.y + THREE.Math.degToRad(1),
                    0
                );
            }
            if(map[68]) {
                context.el.object3D.rotation.set(
                    0,
                    context.el.object3D.rotation.y - THREE.Math.degToRad(1),
                    0
                );
            }
        }

        context.carKeyUp = function(e){ //On keyup

            //set multiple keys
            map[e.keyCode] = e.type == 'keydown';

            if(!map[87]) { //On w
                context.el.components.sound.stopSound();
            }
        }
    },

    update : function(oldData){

        //Effectuate change on 'mode'
        if (context.data.mode !== oldData.mode && context.data.mode == true) {
        
            //Remove event listeners
            context.el.removeEventListener('click', context.clickFunction);
            context.el.removeEventListener('raycaster-intersected', context.carHighlight);
            context.el.removeEventListener('raycaster-intersected-cleared', context.carLowlight);

            //Add event listeners
            window.addEventListener("keydown", context.escCar);
            window.addEventListener("keydown", context.carKeyDown);
            window.addEventListener("keyUp", context.carKeyUp);
        }

        if (context.data.mode !== oldData.mode && context.data.mode == false){
            
            //Remove event listeners
            window.removeEventListener("keydown", context.escCar);
            window.removeEventListener("keydown", context.carKeyDown);
            window.removeEventListener("keyUp", context.carKeyUp);

            //Add event listeners
            context.el.addEventListener('click', context.clickFunction);
            context.el.addEventListener('raycaster-intersected', context.carHighlight);
            context.el.addEventListener('raycaster-intersected-cleared', context.carLowlight);
        }

        if (context.data.speed <= 0){
            context.el.components.sound.stopSound();
        }
    },

    tick : function(){
        //Adjust volume of sound
        context.el.setAttribute("sound", {volume: context.data.speed * 0.1});
        //console.log(context.el.components.sound.isPlaying);

        //Newtonion physics of car
        context.data.speed -= context.data.decceleration;
        let carAngle = THREE.Math.radToDeg(context.el.object3D.rotation.y);
        if (carAngle >= 0){
            carAngle = (THREE.Math.radToDeg(context.el.object3D.rotation.y)) % 360;
        }
        if (carAngle < 0){
            carAngle = 360 + (THREE.Math.radToDeg(context.el.object3D.rotation.y) % 360);
        }
        let carTranslate;
        let quadrant;

        if(context.data.speed > 0){
            //Correct for direction
            if(carAngle <= 135 && carAngle > 45){ //+x +z
                let opposite = Math.sin(carAngle) * context.data.speed;
                let adjacent = Math.cos(carAngle) * context.data.speed;
                carTranslate = new THREE.Vector3( adjacent, 0, opposite );
                context.el.object3D.position.add(carTranslate);
                quadrant = 2;
            }
            else if(carAngle <= 45 || carAngle > 315){ //-x +z
                carAngle += 45;
                let opposite = Math.sin(carAngle) * context.data.speed;
                let adjacent = Math.cos(carAngle) * context.data.speed;
                carTranslate = new THREE.Vector3(0 - opposite, 0, adjacent);
                context.el.object3D.position.add(carTranslate)
                quadrant = 1;
            }
            else if(carAngle <= 315 && carAngle > 225){ //-x -z
                let opposite = Math.sin(carAngle) * context.data.speed;
                let adjacent = Math.cos(carAngle) * context.data.speed;
                carTranslate = new THREE.Vector3( 0 - adjacent, 0, 0 - opposite );
                context.el.object3D.position.add(carTranslate)
                quadrant = 3;
            }
            else if(carAngle <= 225 && carAngle > 135){ //+x -z
                let opposite = Math.sin(carAngle) * context.data.speed;
                let adjacent = Math.cos(carAngle) * context.data.speed;
                carTranslate = new THREE.Vector3( opposite, 0, 0 - adjacent );
                context.el.object3D.position.add(carTranslate)
                quadrant = 4;
            }
            //console.log("angle: " + carAngle + ", quadrant:" + quadrant);
        }
    }
});