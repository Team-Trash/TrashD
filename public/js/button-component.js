AFRAME.registerComponent('button-control', {
    schema : {
        car: {type: 'selector'}
    },

    init : function(){
        console.log('init button control');

        //set context
        let button = this;
        let boxCount = 0;

        //Toggle highlight
        this.el.addEventListener('raycaster-intersected', function(e){
            button.el.setAttribute("material", {color: 'orange'});
        });
        this.el.addEventListener('raycaster-intersected-cleared', function(e){
            button.el.setAttribute("material", {color: 'red'});
        });

        this.el.addEventListener('click', function(e){
            //keep color changed
            button.el.setAttribute("material", {color: 'orange'});

            //Create object
            boxCount++;
            let entity = document.createElement("a-entity");
            entity.classList.add("raycastable");
            entity.setAttribute("id", "box" + boxCount);
            entity.setAttribute("geometry", {primitive: "box"});
            entity.setAttribute("material", {color: "blue"});
            entity.setAttribute("box-control", {});
            entity.setAttribute("position", button.data.car.getAttribute('position'));
            document.getElementById("fog").appendChild(entity);
        });
    }
});