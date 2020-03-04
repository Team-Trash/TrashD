AFRAME.registerComponent('pick-up-object', {
    schema : {
        cursor: {type: 'selector', default: "#game-cursor"},
        pickUpStatus: {type: 'boolean', default: false},
        mouseButton: {type: 'int'}
    },

    init : function() {
        console.log('Initialize Pick Up Object');
        //Init context
        const context = this;

        context.clickFunction = function(e){
            console.log("Pick Up Object")
        }

        context.el.addEventListener('raycaster-intersected', function(e){
            context.data.cursor.setAttribute("material", {color: 'green'});
        });

        context.el.addEventListener('raycaster-intersected-cleared', function(e){
            context.data.cursor.setAttribute("material", {color: 'red'});
        });

        context.el.addEventListener('mousedown', function(e){
            context.pickUpObject();
            context.data.pickUpStatus = true;
            console.log(context.data.pickUpStatus);
        });

        document.addEventListener('mouseup', function(e){
            if(context.data.pickUpStatus == true){
                if(e.button == 0){
                    context.dropObject();
                    console.log("drop");
                    context.data.pickUpStatus = false;
                }
                if(e.button == 2){
                    context.throwObject();
                    console.log("throw");
                    context.data.pickUpStatus = false;
                }
            }
        });

        context.el.addEventListener('collide', function(e){
            let collider = e.detail.body.el.getAttribute('id');

            if(collider == 'plastic-bin'){
                //e.detail.target.el.setAttribute('visible', false);
                //e.detail.target.el.removeAttribute('dynamic-body');
                e.preventDefault;
                e.stopPropagation;
                e.detail.target.el.remove();
            }
        });
    },

    //This is how the object that is selected will be follow the mouse
    pickUpObject: function(){
        var camera = document.querySelector("#game-camera");
        this.el.removeAttribute("dynamic-body");
        this.el.object3D.position.set(0, 0, -2)
        this.el.object3D.rotation.x = 0;
        this.el.object3D.rotation.y = 0;
        this.el.object3D.rotation.z = 0;
        camera.object3D.add(this.el.object3D);

        //console.log("This is a position x: " + this.el.object3D.position.x);
        //console.log("This is a position y: " + this.el.object3D.position.y);
        //console.log("This is a position z: " + this.el.object3D.position.z);

        //STOP THE ANIMATION FROM THE TRASH
        this.el.removeAttribute('animation');
    },

    dropObject: function(){
        var scene = document.getElementById("scene");
        
        this.el.object3D.getWorldPosition(this.el.object3D.position);
        
        this.el.object3D.getWorldQuaternion(this.el.object3D.rotation);
        this.el.setAttribute("dynamic-body", '');
        scene.object3D.add(this.el.object3D);
    },

    throwObject: function(){
        var scene = document.getElementById("scene");
        
        this.el.object3D.getWorldPosition(this.el.object3D.position);
        
        this.el.object3D.getWorldQuaternion(this.el.object3D.rotation);
        this.el.setAttribute("dynamic-body", '');
        scene.object3D.add(this.el.object3D);
        this.el.body.applyLocalImpulse(new CANNON.Vec3(0, 1, -40), new CANNON.Vec3(0, 0, 0));
    }
});