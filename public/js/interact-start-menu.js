let socket;

AFRAME.registerComponent('interact-start-menu', {
    schema : {
        
    },

    init : function() {
        console.log('Initalize Start Menu');
        //Init context
        const context = this;
        context.setupStartMenu();
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
                    context.enterMulti();
                }
            });
        });
    },

    //Generate start menu
    setupStartMenu : function(){
        console.log("Star menu created")
        var startMenu = document.getElementById('startMenu');
        var trashLogo = document.createElement('a-image');
        var singePlayer = document.createElement('a-image');
        var multiplePlayer = document.createElement('a-image');

        trashLogo.setAttribute('src', '#logo');
        trashLogo.setAttribute('position', '0 1 -2');
        trashLogo.setAttribute('width', '3.7');
        trashLogo.setAttribute('height', '1');
        trashLogo.setAttribute('scale', '0.8 0.8 0.8');

        singePlayer.setAttribute('class', 'menu');
        singePlayer.setAttribute('id', 'singleButton');
        singePlayer.setAttribute('src', '#single-button');
        singePlayer.setAttribute('position', '-0.8 0 -2');
        singePlayer.setAttribute('width', '1.29');
        singePlayer.setAttribute('height', '.363');

        multiplePlayer.setAttribute('class', 'menu');
        multiplePlayer.setAttribute('id', 'multiButton');
        multiplePlayer.setAttribute('src', '#multi-button');
        multiplePlayer.setAttribute('position', '0.8 0 -2');
        multiplePlayer.setAttribute('width', '1.29');
        multiplePlayer.setAttribute('height', '.363');

        startMenu.append(trashLogo);
        startMenu.append(singePlayer);
        startMenu.append(multiplePlayer);
    },

    enterSingle: function(){
        console.log('Entering Single Player');

        var start = document.getElementById('start');
        var ingame = document.getElementById('ingame');

        start.setAttribute('visible', 'false');
        start.querySelector('#start-camera').setAttribute('camera', 'active: false');
        ingame.setAttribute('visible', 'true');
        ingame.querySelector('#game-camera').setAttribute('camera', 'active: true');
        ingame.querySelector('#game-camera').setAttribute('fps-look-controls', 'userHeight: 1');
    },

    enterMulti: function(){
        socket = io();

        socket.on('connect', function() {
            console.log(socket.id + " connected!");
        });
    }
});
