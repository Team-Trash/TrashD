AFRAME.registerComponent('pick-up-object', {
    schema : {
        cursor: {type: 'selector', default: "#main-cursor"},
    },

    init : function() {
        console.log('Pick up the object component');
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
        });

        context.el.addEventListener('mouseup', function(e){
            context.dropObject();
        });

        context.el.addEventListener('collide', function(e){
            console.log(e.detail.body.id);
            if(e.detail.body.id == 3){
                e.detail.target.el.setAttribute('visible', false);
            }
        });
    },

    //This is how the object that is selected will be follow the mouse
    pickUpObject: function(){
        console.log("pick up Object function");
        var camera = document.querySelector("#primary-camera");
        var scene = document.getElementById("scene");
        this.el.removeAttribute("dynamic-body");
        this.el.object3D.position.set(0,0,-2)
        this.el.object3D.rotation.x = 0;
        this.el.object3D.rotation.y = 0;
        this.el.object3D.rotation.z = 0;
        camera.object3D.add(this.el.object3D);
    },

    dropObject: function(){
        console.log("drop object");
        var camera = document.querySelector("#primary-camera");
        var scene = document.getElementById("scene");
        this.el.object3D.getWorldPosition(this.el.object3D.position);
        this.el.object3D.getWorldQuaternion(this.el.object3D.rotation);
        this.el.setAttribute("dynamic-body", '');
        scene.object3D.attach(this.el.object3D);
        
    }
});
