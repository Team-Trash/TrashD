AFRAME.registerComponent('pick-up-object', {
    schema : {
        cursor: {type: 'selector', default: "#game-cursor"},
        pickUpStatus: {type: 'boolean', default: false},
        mouseButton: {type: 'int'},
        score : {type: 'int', default: 0},
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
                    //console.log("drop");
                    context.data.pickUpStatus = false;
                }
                if(e.button == 2){
                    context.throwObject();
                    //console.log("throw");
                    context.data.pickUpStatus = false;
                }
            }
        });

        context.el.addEventListener('collide', function(e){
            let collider = e.detail.body.el.getAttribute('data-trash-type');
            let ingameEl = document.querySelector("#ingame");
            let colliedTarget = context.el.getAttribute('data-trash-type');
            
            if(collider == colliedTarget){
                console.log("SAME");
                e.detail.target.el.setAttribute('visible', false);
                context.data.score += 10;
                ingameEl.setAttribute("ingame", "score: " + context.data.score);

                setTimeout(function() {
                    if(e.detail.target.el){
                        e.detail.target.el.remove();
                    }
                }, 0);
            }
            else{
                console.log("NOT THE SAME");
                context.data.score -= 10;
                ingameEl.setAttribute("ingame", "score: " + context.data.score);

                setTimeout(function() {
                    if(e.detail.target.el){
                        e.detail.target.el.remove();
                    }
                }, 0);
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