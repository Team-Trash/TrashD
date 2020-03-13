AFRAME.registerComponent('interact-start-menu-vr', {
    schema : {
        cursor: {type: 'selector'},
    },

    init : function() {       
        //Init context
        console.log('Initalize VR Start Menu ' + this.el.getAttribute('hand-controls'));
        
        this.menuEventListener();
    },

    menuEventListener: function(){
        let startMenu = document.querySelector('#startMenu');
        let menuButtons = startMenu.querySelectorAll('.menu')
        let currentButton;

        //Raycaster Listeners
        menuButtons.forEach(function(menuButton) {
            menuButton.addEventListener('mouseenter', function(e){
                currentButton = e.target;
            });

            menuButton.addEventListener('mouseleave', function(e){
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
