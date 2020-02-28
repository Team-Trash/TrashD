let socket;
let context;

AFRAME.registerComponent('interact-start-menu', {
    schema : {
        
    },

    init : function() {
        console.log('Initalize Start Menu');
        //Init context
        context = this;
        
        context.startMenu();
    },

    menuEventListener: function(menuButtons){
        menuButtons.forEach(function(menuButton) {
            menuButton.addEventListener('mouseenter', function(e){
                menuButton.object3D.scale.set(1.05, 1.05, 1.05);
            });

            menuButton.addEventListener('mouseleave', function(e){
                menuButton.object3D.scale.set(1.0, 1.0, 1.0);
            });

            menuButton.addEventListener('click', function(e){
                let menuID = menuButton.getAttribute('id');
                
                switch(menuID){
                    case 'singleButton':
                        context.enterSingle();
                        break;

                    case 'multiButton':
                        context.enterMulti();
                        break;

                    case 'back':
                        context.startMenu();
                        break;
                }

            });
        });
    },

    //Generate Start Menu
    startMenu : function(){
        console.log("Start menu created!")

        var startMenu = document.getElementById('startMenu');
        var trashLogo = document.createElement('a-image');
        var singlePlayer = document.createElement('a-image');
        var multiplePlayer = document.createElement('a-image');

        //Empty start menu of child nodes
        while (startMenu.firstChild) {
            startMenu.removeChild(startMenu.lastChild);
        }

        trashLogo.setAttribute('src', '#logo');
        trashLogo.setAttribute('position', '0 1 -2');
        trashLogo.setAttribute('width', '3.7');
        trashLogo.setAttribute('height', '1');
        trashLogo.setAttribute('scale', '0.8 0.8 0.8');

        singlePlayer.setAttribute('class', 'menu');
        singlePlayer.setAttribute('id', 'singleButton');
        singlePlayer.setAttribute('src', '#single-button');
        singlePlayer.setAttribute('position', '-0.8 0 -2');
        singlePlayer.setAttribute('width', '1.29');
        singlePlayer.setAttribute('height', '.363');

        multiplePlayer.setAttribute('class', 'menu');
        multiplePlayer.setAttribute('id', 'multiButton');
        multiplePlayer.setAttribute('src', '#multi-button');
        multiplePlayer.setAttribute('position', '0.8 0 -2');
        multiplePlayer.setAttribute('width', '1.29');
        multiplePlayer.setAttribute('height', '.363');

        startMenu.append(trashLogo);
        startMenu.append(singlePlayer);
        startMenu.append(multiplePlayer);

        context.menuEventListener(context.el.querySelectorAll('.menu'));
    },

    multiMenu: function(){
        var startMenu = document.getElementById('startMenu');
        var multiList = document.createElement('a-entity');
        var multiBG =  document.createElement('a-image');
        var textTest =  document.createElement('a-entity');
        var back =  document.createElement('a-entity');

        //Empty start menu of child nodes
        while (startMenu.firstChild) {
            startMenu.removeChild(startMenu.lastChild);
        }

        multiList.setAttribute('id', 'multiList');
        multiList.setAttribute('position', '0 0 -1');

        multiBG.setAttribute('src', '#multi-list');
        multiBG.setAttribute('scale', '1.5 1.5 1.5');
        multiBG.setAttribute('width', '1.29');
        multiBG.setAttribute('height', '.847');

        socket.emit('get-rooms');

        textTest.setAttribute('text', 'value: New Room; color: f4eed7; align: center; height: 2; width: 1;');
        textTest.setAttribute('geometry', 'primitive: plane; height: 0.1; width: 0.3');
        textTest.setAttribute('material', 'color: #3b3836');
        textTest.setAttribute('position', '-0.65 0.45 0.1');
        textTest.setAttribute('class', 'menu');

        back.setAttribute('text', 'value: Back to start menu; color: f4eed7; align: center; height: 2; width: 1;');
        back.setAttribute('id', 'back');
        back.setAttribute('geometry', 'primitive: plane; height: 0.1; width: 0.4');
        back.setAttribute('material', 'color: #697c37');
        back.setAttribute('position', '-0.6 -0.45 0.1');
        back.setAttribute('class', 'menu');

        startMenu.append(multiList);
        multiList.append(multiBG);
        multiList.append(textTest);
        multiList.append(back);

        context.menuEventListener(context.el.querySelectorAll('.menu'));
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

        this.multiMenu();
    }
});
