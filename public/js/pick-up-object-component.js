AFRAME.registerComponent('pick-up-object', {
    schema : {
        cursor: {type: 'selector', default: "#game-cursor"},
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
        var camera = document.querySelector("#game-camera");
        this.el.removeAttribute("dynamic-body");
        this.el.object3D.position.set(0, 0, -2)
        this.el.object3D.rotation.x = 0;
        this.el.object3D.rotation.y = 0;
        this.el.object3D.rotation.z = 0;
        camera.object3D.add(this.el.object3D);

        console.log("This is a position x: " + this.el.object3D.position.x);
        console.log("This is a position y: " + this.el.object3D.position.y);
        console.log("This is a position z: " + this.el.object3D.position.z);

        //STOP THE ANIMATION FROMT THE TRASH
        this.el.removeAttribute('animation');
    },

    dropObject: function(){
        var scene = document.getElementById("scene");
        
        this.el.object3D.getWorldPosition(this.el.object3D.position);
        
        this.el.object3D.getWorldQuaternion(this.el.object3D.rotation);
        this.el.setAttribute("dynamic-body", '');
        scene.object3D.add(this.el.object3D);
    }
});
