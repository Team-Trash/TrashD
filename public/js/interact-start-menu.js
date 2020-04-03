let socket;

AFRAME.registerComponent('interact-start-menu', {
    schema : {
        
    },

    init : function() {
        console.log('Initalize Start Menu');
        
        this.startMenu();
    },

    //Add event listeners to button
    menuEventListener: function(menuButtons){
        let context = this
        menuButtons.forEach(function(menuButton) {
            let scene = document.getElementById('scene');
            var trashLogo = document.getElementById('startLogo');
            var singlePlayer = document.getElementById('singleButton');
            var multiplePlayer = document.getElementById('multiButton');
            var controlButton = document.getElementById('controlsButton');

            //Raycaster Listeners
            menuButton.addEventListener('mouseenter', function(e){
                menuButton.object3D.scale.set(1.05, 1.05, 1.05);
            });

            menuButton.addEventListener('mouseleave', function(e){
                menuButton.object3D.scale.set(1.0, 1.0, 1.0);
            });

            //Desktop Listeners
            menuButton.addEventListener('click', function(e){
                context.clickMenu(menuButton);
            });

            //Enter/Exit VR
            scene.addEventListener('enter-vr', function(e){
                trashLogo.setAttribute('position', '0 2 -2');
                singlePlayer.setAttribute('position', '-0.8 1 -2');
                multiplePlayer.setAttribute('position', '0.8 1 -2');
                controlButton.setAttribute('position', '-0.8 2 -2');
            });

            scene.addEventListener('exit-vr', function(e){
                trashLogo.setAttribute('position', '0 1 -2');
                singlePlayer.setAttribute('position', '-0.8 0 -2');
                multiplePlayer.setAttribute('position', '0.8 0 -2');
                controlButton.setAttribute('position', '0 2 -2');
            });
        });
    },

    //Generate Start Menu
    startMenu : function(){
        console.log("Start menu created!");

        let scene = document.getElementById('scene');
        var startMenu = document.getElementById('startMenu');
        var trashLogo = document.createElement('a-image');
        var singlePlayer = document.createElement('a-image');
        var multiplePlayer = document.createElement('a-image');
        var controlsButton = document.createElement('a-image');

        //Empty start menu of child nodes
        this.emptyElement(startMenu);

        trashLogo.setAttribute('id', 'startLogo');
        trashLogo.setAttribute('src', '#logo');
        if(scene.is('vr-mode')){
            trashLogo.setAttribute('position', '0 2 -2');
        } else {
            trashLogo.setAttribute('position', '0 1 -2');
        }
        trashLogo.setAttribute('width', '3.7');
        trashLogo.setAttribute('height', '1');
        trashLogo.setAttribute('scale', '0.8 0.8 0.8');

        singlePlayer.setAttribute('class', 'menu');
        singlePlayer.setAttribute('id', 'singleButton');
        singlePlayer.setAttribute('src', '#single-button');
        if(scene.is('vr-mode')){
            singlePlayer.setAttribute('position', '-0.8 1 -2');
        } else {
            singlePlayer.setAttribute('position', '-0.8 0 -2');
        }
        singlePlayer.setAttribute('width', '1.29');
        singlePlayer.setAttribute('height', '.363');

        multiplePlayer.setAttribute('class', 'menu');
        multiplePlayer.setAttribute('id', 'multiButton');
        multiplePlayer.setAttribute('src', '#multi-button');
        if(scene.is('vr-mode')){
            multiplePlayer.setAttribute('position', '0.8 1 -2');
        } else {
            multiplePlayer.setAttribute('position', '0.8 0 -2');
        }
        multiplePlayer.setAttribute('width', '1.29');
        multiplePlayer.setAttribute('height', '.363');

        controlsButton.setAttribute('class', 'menu');
        controlsButton.setAttribute('id', 'controlsButton');
        controlsButton.setAttribute('src', '#controls-button');
        if(scene.is('vr-mode')){
            controlsButton.setAttribute('position', '0 0.5 -2');
        } else {
            controlsButton.setAttribute('position', '0 -0.5 -2');
        }
        controlsButton.setAttribute('width', '1.29');
        controlsButton.setAttribute('height', '.363');

        startMenu.append(trashLogo);
        startMenu.append(singlePlayer);
        startMenu.append(multiplePlayer);
        startMenu.append(controlsButton);

        this.menuEventListener(this.el.querySelectorAll('.menu'));
    },

    multiMenu: function(){
        let context = this;
        var startMenu = document.getElementById('startMenu');
        var multiList = document.createElement('a-entity');
        var multiBG =  document.createElement('a-image');
        var newRoom =  document.createElement('a-entity');
        var back =  document.createElement('a-entity');
        let rooms = [];
        let position = 0.45;

        //Empty start menu of child nodes
        this.emptyElement(startMenu);

        multiList.setAttribute('id', 'multiList');
        multiList.setAttribute('position', '0 0 -1');

        multiBG.setAttribute('src', '#multi-list');
        multiBG.setAttribute('scale', '1.5 1.5 1.5');
        multiBG.setAttribute('width', '1.29');
        multiBG.setAttribute('height', '.847');

        socket.emit('get-rooms');
        socket.on('return-rooms', function(data){
            let roomCount = 1;
            console.log(data);
            for (room in data){
                if(room.includes("room") && data[room].length < 2){
                    position -= 0.15;
                    rooms[roomCount] = document.createElement('a-entity');
                    rooms[roomCount].setAttribute('text', 'value: Room ' + roomCount + '; color: #f4eed7; align: center; height: 2; width: 1; font: https://cdn.aframe.io/fonts/Exo2Bold.fnt');
                    rooms[roomCount].setAttribute('geometry', 'primitive: plane; height: 0.1; width: 0.3');
                    rooms[roomCount].setAttribute('material', 'color: #3b3836');
                    rooms[roomCount].setAttribute('position',  '-0.65 ' + position + ' 0.1');
                    rooms[roomCount].setAttribute('class', 'menu');
                    rooms[roomCount].setAttribute('data-room', room);

                    multiList.append(rooms[roomCount]);
                    roomCount++;

                    context.menuEventListener(context.el.querySelectorAll('.menu'));
                }
            }
        });

        newRoom.setAttribute('text', 'value: New Room; color: #fff; align: center; height: 2; width: 1; font: https://cdn.aframe.io/fonts/Exo2Bold.fnt;');
        newRoom.setAttribute('id', 'newRoom');
        newRoom.setAttribute('geometry', 'primitive: plane; height: 0.1; width: 0.3');
        newRoom.setAttribute('material', 'color: #fe9801');
        newRoom.setAttribute('position',  '-0.65 ' + position + ' 0.1');
        newRoom.setAttribute('class', 'menu');

        back.setAttribute('text', 'value: Back to start menu; color: #f4eed7; align: center; height: 2; width: 0.9; font: https://cdn.aframe.io/fonts/Exo2Bold.fnt;');
        back.setAttribute('id', 'back');
        back.setAttribute('geometry', 'primitive: plane; height: 0.1; width: 0.4');
        back.setAttribute('material', 'color: #697c37');
        back.setAttribute('position', '-0.6 -0.45 0.1');
        back.setAttribute('class', 'menu');

        startMenu.append(multiList);
        multiList.append(multiBG);        
        multiList.append(newRoom);
        multiList.append(back);

        context.menuEventListener(context.el.querySelectorAll('.menu'));
    },

    controlsMenu: function(state){
        var startMenu = document.getElementById('startMenu');
        var instCont = document.createElement('a-entity');
        var img =  document.createElement('a-image');
        var back =  document.createElement('a-entity');
        var next =  document.createElement('a-entity');

        //Empty start menu of child nodes
        this.emptyElement(startMenu);

        instCont.setAttribute('id', 'instCont');
        instCont.setAttribute('position', '0 0 -1');

        img.setAttribute('id', 'instructImg')
        if(state == 'instructions'){
            img.setAttribute('src', '#intruct-img-1');
        } else if (state == 'controls') {
            img.setAttribute('src', '#intruct-img-2');
        }   
        img.setAttribute('scale', '1.5 1.5 1.5');
        img.setAttribute('width', '1.29');
        img.setAttribute('height', '.847');

        back.setAttribute('text', 'value: Back to start menu; color: #f4eed7; align: center; height: 2; width: 1;');
        back.setAttribute('id', 'back');
        back.setAttribute('geometry', 'primitive: plane; height: 0.1; width: 0.4');
        back.setAttribute('material', 'color: #697c37');
        back.setAttribute('position', '-0.6 0.45 0.1');
        back.setAttribute('class', 'menu');

        if(state == 'instructions'){
            next.setAttribute('text', 'value: Controls; color: #f4eed7; align: center; height: 2; width: 1;');
            next.setAttribute('data-state', 'controls');
        } else if (state == 'controls') {
            next.setAttribute('text', 'value: Instructions; color: #f4eed7; align: center; height: 2; width: 1;');
            next.setAttribute('data-state', 'instructions');
        }  
        next.setAttribute('id', 'next');
        next.setAttribute('geometry', 'primitive: plane; height: 0.1; width: 0.4');
        next.setAttribute('material', 'color: #697c37');
        next.setAttribute('position', '0.6 0.45 0.1');
        next.setAttribute('class', 'menu');

        startMenu.append(instCont);
        instCont.append(img);
        instCont.append(back);
        instCont.append(next);

        this.menuEventListener(this.el.querySelectorAll('.menu'));
    },

    multiList: function(){
        socket = io();

        socket.on('connect', function() {
            console.log(socket.id + " connected!");
        });

        this.multiMenu();
    },

    clickMenu: function(menuButton){
        let context = this;
        let menuID = menuButton.getAttribute('id');
        let roomID = menuButton.getAttribute('data-room');
        
        switch(menuID){
            case 'singleButton':
                context.enterSingle();
                break;

            case 'multiButton':
                context.multiList();
                break;

            case 'newRoom':
                socket.emit('new-room');
                socket.on('return-room-id', function(data){
                    context.enterMulti(data);
                });
                break;
                
            case 'controlsButton':
                context.controlsMenu('instructions');
                break;

            case 'back':
                socket.close();
                context.startMenu();
                break;
            
            case 'next':
                context.controlsMenu(menuButton.getAttribute('data-state'));
                break;

        }

        if(roomID){
            socket.emit('join-room', roomID);
            socket.on('return-room-id', function(data){
                context.enterMulti(data);
            });
        }
    },

    //Enter singleplayer gamemode
    enterSingle: function(){
        console.log('Entering SinglePlayer');

        var start = document.getElementById('start');
        var ingame = document.getElementById('ingame');
        let scene = document.getElementById('scene');
        var factoryAudio = document.createElement('a-entity');

        // Remove/Hide start menu; move camera to ingame camera
        this.emptyElement(startMenu);
        start.setAttribute('visible', 'false');
        start.querySelector('#start-camera').setAttribute('camera', 'active: false');
        ingame.setAttribute('visible', 'true');
        ingame.setAttribute('ingame', '');
        ingame.querySelector('#game-camera').setAttribute('camera', 'active: true');
        ingame.querySelector('#game-camera').setAttribute('fps-look-controls', 'userHeight: 1');
        
        factoryAudio.setAttribute('id', 'factoryAudio');
        factoryAudio.setAttribute('sound', 'src:#factoryAmbience-audio; autoplay: true; loop: true');

        ingame.append(factoryAudio);


        if(scene.is('vr-mode') == true){
            ingame.querySelector('#game-cursor').setAttribute('visible', 'false');
        }

        //GET THE GENERATING FUNCTION FROM THE SERVER
        //IO connection
        socket = io();
        //Connection event
        socket.on('connect', function(){
            console.log("Generating trash js connected!");
        });
        
        //Putting the data back to the socket
        socket.emit('generating-trash', gtFunction())
    },

    //Enter multiplayer gamemode
    enterMulti: function(data){
        console.log('Entering ' + data);

        var start = document.getElementById('start');
        var startMenu = document.getElementById('startMenu');
        var ingame = document.getElementById('ingame');

        // Remove/Hide start menu; move camera to ingame camera
        this.emptyElement(startMenu);
        start.setAttribute('visible', 'false');
        start.querySelector('#start-camera').setAttribute('camera', 'active: false');
        ingame.setAttribute('visible', 'true');
        ingame.setAttribute('ingame', 'multiplayer: true');
        ingame.querySelector('#game-camera').setAttribute('camera', 'active: true');
        ingame.querySelector('#game-camera').setAttribute('fps-look-controls', 'userHeight: 1');

        if(scene.is('vr-mode') == true){
            ingame.querySelector('#game-cursor').setAttribute('visible', 'false');
        }
    },

    emptyElement: function(element){
        while (element.firstChild) {
            element.removeChild(element.lastChild);
        }
    }
});