AFRAME.registerComponent('pick-up-object', {
    schema : {
        cursor: {type: 'selector', default: "#game-cursor"},
        pickUpStatus: {type: 'boolean', default: false},
        mouseButton: {type: 'int'},
        destroyStatus: {type: 'boolean', default: false},
        scoreValue: {type: 'int', default: 10},
    },

    //INITIAL FUNCTION
    init : function() {
        
        //Init context
        const context = this;
        let vr = document.getElementById('scene').is('vr-mode');
        let left = document.getElementById('hand-left');
        let right = document.getElementById('hand-right');

        //Mouse hover over object
        context.el.addEventListener('raycaster-intersected', function(e){
            context.data.cursor.setAttribute("material", {color: 'green'});
        });

        //Mouse hover out of object
        context.el.addEventListener('raycaster-intersected-cleared', function(e){
            context.data.cursor.setAttribute("material", {color: 'red'});
        });

        //Pickup and drop on dektop
        if(vr == false){
            context.el.addEventListener('mousedown', function(e){
                context.pickUpObject();
                context.data.pickUpStatus = true;
            });

            document.addEventListener('mouseup', function(e){
                if(context.data.pickUpStatus == true){
                    if(e.button == 0){
                        context.dropObject();
                        context.data.pickUpStatus = false;
                    }
                    if(e.button == 2){
                        context.throwObject();
                        context.data.pickUpStatus = false;
                    }
                }
            });
        }

        //Pickup and drop on VR
        if(vr == true){
            left.addEventListener('gripdown', function(e){
                context.pickUpObject(left);
            });
            right.addEventListener('gripdown', function(e){
                context.pickUpObject(right);
            });
            left.addEventListener('gripup', function(e){
                context.dropObject();
            });
            right.addEventListener('gripup', function(e){
                context.dropObject();
            });
        }

        //Object collide on
        context.el.addEventListener('collide', function(e){
            let ingame = document.querySelector("#ingame");
            let collider = e.detail.body.el.getAttribute('data-trash-type');
            let colliderTarget = context.el.getAttribute('data-trash-type');
            
            if (e.detail.body.el.getAttribute('class') == 'clickable trash' || e.detail.body.el.getAttribute('class') == 'conveyor' || e.detail.body.el.getAttribute('class') == null || e.detail.body.el.getAttribute('class') == undefined){
                return;
            }

            if(context.data.destroyStatus == false){
                if(e.detail.body.el.getAttribute('class') == 'binCollider'){ 
                    if(collider == colliderTarget){ //Object is same type as bin
                        ingame.components['ingame'].data.score += context.data.scoreValue;

                        setTimeout(function() {//Set timeout because would crash for not finishing calculate physics
                            if(e.detail.target.el){
                                let index = ingame.components['ingame'].data.trashArray.findIndex(checkId, e.detail.target.el.getAttribute("id"));
                                e.detail.target.el.remove();
                                ingame.components['ingame'].data.trashArray.splice(index,1);
                            }
                        }, 0);

                        //context.data.destroyStatus = true;
                    }
                    else{ //Object is not the same type as bin
                        ingame.components['ingame'].data.score -= 10;

                        setTimeout(function() {//Set timeout because would crash for not finishing calculate physics
                            if(e.detail.target.el){
                                let index = ingame.components['ingame'].data.trashArray.findIndex(checkId, e.detail.target.el.getAttribute("id"));
                                e.detail.target.el.remove();
                                ingame.components['ingame'].data.trashArray.splice(index,1);
                            }
                        }, 0);

                        //context.data.destroyStatus = true;
                    }
                } else if (e.detail.body.el.getAttribute('class') == 'delete'){ //Object reaches end of conveyor
                    setTimeout(function() {//Set timeout because would crash for not finishing calculate physics
                        if(e.detail.target.el){
                            let index = ingame.components['ingame'].data.trashArray.findIndex(checkId, e.detail.target.el.getAttribute("id"));
                            e.detail.target.el.remove();
                            ingame.components['ingame'].data.trashArray.splice(index,1);
                        }
                    }, 0);

                    //context.data.destroyStatus = true;
                }
            }
        });
    },

    //This is how the object that is selected will be follow the mouse
    pickUpObject: function(hand){
        var camera = document.querySelector("#game-camera");
        this.el.removeAttribute("dynamic-body");
        let vr = document.getElementById('scene').is('vr-mode');
        
        this.el.object3D.rotation.x = 0;
        this.el.object3D.rotation.y = 0;
        this.el.object3D.rotation.z = 0;
        
        if(vr == false){
            this.el.object3D.position.set(0, 0, -2)
            camera.object3D.add(this.el.object3D);
        }
        if (vr == true){
            this.el.object3D.position.set(0, 0, 0);
            hand.object3D.add(this.el.object3D);
        }

        //STOP THE ANIMATION FROM THE TRASH
        this.el.removeAttribute('animation');
    },

    //DROP OBJECT FUNCTION
    dropObject: function(){
        var scene = document.getElementById("scene");
        
        this.el.object3D.getWorldPosition(this.el.object3D.position);
        
        this.el.object3D.getWorldQuaternion(this.el.object3D.rotation);
        this.el.setAttribute("dynamic-body", '');
        scene.object3D.add(this.el.object3D);
    },

    //THROW OBJECT FUNCTION
    throwObject: function(){
        var scene = document.getElementById("scene");
        
        this.el.object3D.getWorldPosition(this.el.object3D.position);
        
        this.el.object3D.getWorldQuaternion(this.el.object3D.rotation);
        this.el.setAttribute("dynamic-body", '');
        scene.object3D.add(this.el.object3D);
        this.el.body.applyLocalImpulse(new CANNON.Vec3(0, 1, -40), new CANNON.Vec3(0, 0, 0));
    },    
});