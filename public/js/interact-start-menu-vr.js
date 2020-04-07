AFRAME.registerComponent('interact-start-menu-vr', {
    schema : {
        cursor: {type: 'selector'},
    },

    //INITIAL FUNCTION
    init : function() {       
        //Init context
        console.log('Initalize VR Start Menu ' + this.el.getAttribute('hand-controls'));
    },

    //MENU LISTENER FUNCTION
    menuEventListener : function(menuButtons){
        let startMenu = document.querySelector('#startMenu');
        let currentButton;

        //Raycaster Listeners
        menuButtons.forEach(function(menuButton) {
            menuButton.addEventListener('mouseenter', function(e){
                menuButton.object3D.scale.set(1.05, 1.05, 1.05);
                currentButton = e.target;
            });

            menuButton.addEventListener('mouseleave', function(e){
                menuButton.object3D.scale.set(1.0, 1.0, 1.0);
                currentButton = null;
            });
        });

        //VR Listeners
        this.el.addEventListener('xbuttondown', function(e){
            if(currentButton){
                startMenu.components['interact-start-menu'].clickMenu(currentButton);
            }
            
        });

        this.el.addEventListener('abuttondown', function(e){
            if(currentButton){
                startMenu.components['interact-start-menu'].clickMenu(currentButton);
            }
        });

        this.el.addEventListener('triggerdown', function(e){
            if(currentButton){
                startMenu.components['interact-start-menu'].clickMenu(currentButton);
            }
        });
    },
});
