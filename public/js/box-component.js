AFRAME.registerComponent('box-control', {
    init : function(){
        console.log('init box control');

        let box = this;

        //Toggle highlight
        this.el.addEventListener('raycaster-intersected', function(e){
            box.el.setAttribute("material", {color: 'purple'});
        });
        this.el.addEventListener('raycaster-intersected-cleared', function(e){
            box.el.setAttribute("material", {color: 'blue'});
        });

        this.el.addEventListener('click', function(e){
            let el = document.getElementById(box.el.getAttribute("id"));
            el.remove();
        });
    }
});