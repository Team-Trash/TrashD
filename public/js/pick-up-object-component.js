AFRAME.registerComponent('pick-up-object', {
    init : function() {
        console.log('Pick up the object component');
        //Init context
        const context = this;

        context.clickFunction = function(e){
            console.log("Pick Up Object")
        }

        context.el.addEventListener('click', function(event){
            console.log("Pickup Object");
            context.pickUpObject();
            });
        },
    //This is how the object that is selected will be follow the mouse
    pickUpObject: function(){
        console.log("pick up Object function");
        var camera = document.querySelector("#primary-camera");
        var child = document.getElementById("cube");
        console.log(this.el.object3D.position);
        camera.object3D.localToWorld(this.el.object3D.position);
        camera.object3D.add(this.el.object3D);
    },

    dropObject: function(){
        
    }
});
