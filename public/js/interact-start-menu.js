AFRAME.registerComponent('interact-start-menu', {
    schema : {
        
    },

    init : function() {
        console.log('Initalize Start Menu');
        //Init context
        const context = this;
        let menuButtons = context.el.querySelectorAll('.menu');

        menuButtons.forEach(function(menuButton) {
            menuButton.addEventListener('mouseenter', function(e){
                menuButton.object3D.scale.set(1.05, 1.05, 1.05);
            });

            menuButton.addEventListener('mouseleave', function(e){
                menuButton.object3D.scale.set(1.0, 1.0, 1.0);
            });

            menuButton.addEventListener('click', function(e){
                let menuID = menuButton.getAttribute('id');
                
                if(menuID == 'singleButton'){
                    context.enterSingle();
                }

                if(menuID == 'multiButton'){
                    
                }
            });
        });
    },

    enterSingle: function(){
        console.log('Entering Single Player');

        var start = document.getElementById('start');
        var ingame = document.getElementById('ingame');

        start.setAttribute('visible', 'false');
        start.querySelector('#start-camera').setAttribute('camera', 'active: false');;
        ingame.setAttribute('visible', 'true');
        ingame.querySelector('#game-camera').setAttribute('camera', 'active: true');;
    },
});
