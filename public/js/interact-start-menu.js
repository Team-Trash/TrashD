AFRAME.registerComponent('interact-start-menu', {
    schema : {
        
    },

    init : function() {
        console.log('Initalize Start Menu');
        //Init context
        const context = this;
        menuButtons = context.el.querySelectorAll('.menu');

        context.el.addEventListener('click', function(e){
            console.log("Select")
            context.enterSingle();
        });

        menuButtons.forEach(function(menuButton) {
            menuButton.addEventListener('mouseenter', function(e){
                menuButton.object3D.scale.set(1.05, 1.05, 1.05);
            });

            menuButton.addEventListener('mouseleave', function(e){
                menuButton.object3D.scale.set(1.0, 1.0, 1.0);
            });
        });
    },

    enterSingle: function(){
        var start = document.getElementById('start');
        var ingame = document.getElementById('ingame');

        start.setAttribute('visible', 'false');
        ingame.setAttribute('visible', 'true');
    },
});
