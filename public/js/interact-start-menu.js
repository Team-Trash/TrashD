AFRAME.registerComponent('interact-start-menu', {
    schema : {
        
    },

    init : function() {
        console.log('Start menu');
        //Init context
        const context = this;

        context.el.addEventListener('click', function(e){
            console.log("Select")
            context.enterGame();
        });

        context.el.addEventListener('mouseenter', function(e){
            context.el.object3D.scale.set(1.2, 1.2, 1.2);
        });

        context.el.addEventListener('mouseleave', function(e){
            context.el.object3D.scale.set(1.0, 1.0, 1.0);
        });
    },

    enterGame: function(){
        var startMenu = document.getElementById('startMenu');

        startMenu.parentNode.removeChild(startMenu);
    },

});
