let socket;

AFRAME.registerComponent('interact-start-menu', {
    schema : {
        startCount: {type: 'int', default: 0}
    },

    init : function() {
        console.log('Initalize Start Menu');
        let context = this;
        let scene = document.getElementById('scene');
        let startMenu = document.getElementById('startMenu');

        //Enter/Exit VR
        scene.addEventListener('enter-vr', function(e){
            this.setAttribute("vr-mode");
            context.emptyElement(startMenu);
            context.startMenu();
        });

        scene.addEventListener('exit-vr', function(e){
            this.removeAttribute("vr-mode");
        });

        context.startMenu();
    },

    //Add event listeners to button
    menuEventListener: function(menuButtons){
        let context = this;

        menuButtons.forEach(function(menuButton) {
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
        });
    },

    vrMenuEventListener : function(menuButtons){
        let left = document.getElementById('startHandLeft');
        let right = document.getElementById('startHandRight');

        left.components['interact-start-menu-vr'].menuEventListener(menuButtons);
        right.components['interact-start-menu-vr'].menuEventListener(menuButtons);
    },

    //START MENU
    startMenu : function(){
        console.log("Start menu created!");

        let scene = document.getElementById('scene');
        var startMenu = document.getElementById('startMenu');
        var trashLogo = document.createElement('a-image');
        var singlePlayer = document.createElement('a-image');
        var multiplePlayer = document.createElement('a-image');
        var controlsButton = document.createElement('a-image');

        //Animation
        var planeRed = document.createElement('a-entity');
        var planeBlue = document.createElement('a-entity');
        var planeGreen = document.createElement('a-entity');
        var planeYellow = document.createElement('a-entity');
        var planeBlack = document.createElement('a-entity');


        //Empty start menu of child nodes
        this.emptyElement(startMenu);

        //Correct position for VR
        if(scene.is('vr-mode')){
            startMenu.setAttribute('position', '0 1 0')
        }

        trashLogo.setAttribute('id', 'startLogo');
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

        controlsButton.setAttribute('class', 'menu');
        controlsButton.setAttribute('id', 'controlsButton');
        controlsButton.setAttribute('src', '#controls-button');
        controlsButton.setAttribute('position', '0 -0.5 -2');
        controlsButton.setAttribute('width', '1.29');
        controlsButton.setAttribute('height', '.363');

        //ANIMATION TEST
        planeBlack.setAttribute('material', 'color: rgb(99, 100, 101)');
        planeBlack.setAttribute('scale', '1 0.05 1');
        planeBlack.setAttribute('geometry', 'primitive: plane; height: 10; width: 14');
        planeBlack.setAttribute('animation', 'property: position; from: -9 -1.5 -3; to: 0 -1.5 -3; dur: 3600; easing: linear');


        planeGreen.setAttribute('material', 'color: rgb(164, 202, 172)');
        planeGreen.setAttribute('scale', '1 0.05 1');
        planeGreen.setAttribute('geometry', 'primitive: plane; height: 10; width: 14');
        planeGreen.setAttribute('animation', 'property: position; from: 9 -0.75 -3; to: 0 -0.75 -3; dur: 3500; easing: linear');


        planeRed.setAttribute('material', 'color: rgb(228, 132, 119)');
        planeRed.setAttribute('scale', '1 0.05 1');
        planeRed.setAttribute('geometry', 'primitive: plane; height: 10; width: 14');
        planeRed.setAttribute('animation', 'property: position; from: -9 0 -3; to: 0 0 -3; dur: 3300; easing: linear');


        planeBlue.setAttribute('material', 'color: rgb(151, 192, 217)');
        planeBlue.setAttribute('scale', '1 0.05 1');
        planeBlue.setAttribute('geometry', 'primitive: plane; height: 10; width: 14');
        planeBlue.setAttribute('animation', 'property: position; from: 9 0.75 -3; to: 0 0.75 -3; dur: 3300; easing: linear');


        planeYellow.setAttribute('material', 'color: rgb(235, 220, 139)');
        planeYellow.setAttribute('scale', '1 0.05 1');
        planeYellow.setAttribute('geometry', 'primitive: plane; height: 10; width: 14');
        planeYellow.setAttribute('animation', 'property: position; from: -9 1.5 -3; to: 0 1.5 -3; dur: 3000; easing: linear');
        
        startMenu.append(planeBlack);
        startMenu.append(planeGreen);
        startMenu.append(planeRed);
        startMenu.append(planeBlue);
        startMenu.append(planeYellow);

        startMenu.append(trashLogo);
        startMenu.append(singlePlayer);
        startMenu.append(multiplePlayer);
        startMenu.append(controlsButton);

        if(scene.is('vr-mode')){
            this.vrMenuEventListener(this.el.querySelectorAll('.menu'));
        } else {
            this.menuEventListener(this.el.querySelectorAll('.menu'));
        }
    },

    //MULTIPLAYERS ROOM
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

        //Correct position for VR
        if(scene.is('vr-mode')){
            startMenu.setAttribute('position', '0 1.5 -1')
        }

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
                    rooms[roomCount].setAttribute('class', 'room');
                    rooms[roomCount].setAttribute('data-room', room);

                    multiList.append(rooms[roomCount]);
                    roomCount++;
                }
            }
            
            if(scene.is('vr-mode')){
                context.vrMenuEventListener(context.el.querySelectorAll('.room'));
            } else {
                context.menuEventListener(context.el.querySelectorAll('.room'));
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

        if(scene.is('vr-mode')){
            this.vrMenuEventListener(this.el.querySelectorAll('.menu'));
        } else {
            this.menuEventListener(this.el.querySelectorAll('.menu'));
        }
    },

    //CONTROL MENU
    controlsMenu: function(state){
        var startMenu = document.getElementById('startMenu');
        var instCont = document.createElement('a-entity');
        var img =  document.createElement('a-image');
        var back =  document.createElement('a-entity');
        var next =  document.createElement('a-entity');

        //Empty start menu of child nodes
        this.emptyElement(startMenu);

        //Correct position for VR
        if(scene.is('vr-mode')){
            startMenu.setAttribute('position', '0 1.5 -1')
        }

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

        back.setAttribute('text', 'value: Back to start menu; color: #f4eed7; align: center; height: 2; width: 0.9; font: https://cdn.aframe.io/fonts/Exo2Bold.fnt;');
        back.setAttribute('id', 'back');
        back.setAttribute('geometry', 'primitive: plane; height: 0.1; width: 0.4');
        back.setAttribute('material', 'color: #697c37');
        back.setAttribute('position', '-0.6 0.45 0.1');
        back.setAttribute('class', 'menu');

        if(state == 'instructions'){
            next.setAttribute('text', 'value: Controls; color: #f4eed7; align: center; height: 2; width: 1; font: https://cdn.aframe.io/fonts/Exo2Bold.fnt;');
            next.setAttribute('data-state', 'controls');
        } else if (state == 'controls') {
            next.setAttribute('text', 'value: Instructions; color: #f4eed7; align: center; height: 2; width: 1; font: https://cdn.aframe.io/fonts/Exo2Bold.fnt;');
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

        if(scene.is('vr-mode')){
            this.vrMenuEventListener(this.el.querySelectorAll('.menu'));
        } else {
            this.menuEventListener(this.el.querySelectorAll('.menu'));
        }
        
    },

    multiList: function(){
        socket = io();

        socket.on('connect', function() {
            console.log(socket.id + " connected!");
        });

        this.multiMenu();
    },

    //CLICK MENU FUNCTION
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
                socket.on('return-room-id', function(roomID){
                    context.enterMulti(roomID, true);
                });
                break;
                
            case 'controlsButton':
                context.controlsMenu('instructions');
                break;

            case 'back':
                if(socket){
                    socket.close();
                }
                context.startMenu();
                break;
            
            case 'next':
                context.controlsMenu(menuButton.getAttribute('data-state'));
                break;

        }

        if(roomID){
            socket.emit('join-room', roomID);
            socket.on('return-room-id', function(roomID){
                context.enterMulti(roomID, false);
            });
        }
    },

    //ENTER SINGLE PLAYER GAMEMODE
    enterSingle: function(){
        console.log('Entering SinglePlayer');

        var start = document.getElementById('start');
        var ingame = document.getElementById('ingame');
        var gameCamera = document.getElementById('game-camera');
        var gameCameraRig = document.getElementById('game-camera-rig');
        let scene = document.getElementById('scene');
        var factoryAudio = document.getElementById('factoryAudio');

        //Add menu cursor raycaster to new camera
        if(document.getElementById('menu-raycast') == null){
            var menuRaycast = document.createElement('a-entity');
            menuRaycast.setAttribute("id", "menu-raycast");
            menuRaycast.setAttribute("cursor", "rayOrigin:mouse;");
            menuRaycast.setAttribute("raycaster", "objects: .menu, .room;");
            gameCamera.append(menuRaycast);
        }

        // Remove/Hide start menu; move camera to ingame camera
        this.emptyElement(startMenu);
        start.setAttribute('visible', 'false');
        start.querySelector('#start-camera').setAttribute('camera', 'active: false');
        ingame.setAttribute('visible', 'true');
        ingame.setAttribute('ingame', '');
        gameCamera.setAttribute('camera', 'active: true');
        if(this.data.startCount <= 0){
            gameCamera.setAttribute('fps-look-controls', 'userHeight: 1');
        } else {
            gameCamera.setAttribute('fps-look-controls', 'userHeight: 0');
        }


        //Correct Camera
        if(scene.is('vr-mode') == true){
            gameCameraRig.setAttribute('position', '0 0 4');
        }

        //Play the sound
        factoryAudio.components.sound.playSound();

        this.data.startCount++
    },

    //Enter multiplayer gamemode
    enterMulti: function(roomID, hostStatus){

        console.log('Joining ' + roomID);

        var start = document.getElementById('start');
        var startMenu = document.getElementById('startMenu');
        var ingame = document.getElementById('ingame');
        var gameCamera = document.getElementById('game-camera');
        var gameCameraRig = document.getElementById('game-camera-rig');
        
        //Sound of factory
        var factoryAudio = document.getElementById('factoryAudio');

        //Add menu cursor raycaster to new camera
        if(document.getElementById('menu-raycast') == null){
            var menuRaycast = document.createElement('a-entity');
            menuRaycast.setAttribute("id", "menu-raycast");
            menuRaycast.setAttribute("cursor", "rayOrigin:mouse;");
            menuRaycast.setAttribute("raycaster", "objects: .menu;");
            gameCamera.append(menuRaycast);
        }

        // Remove/Hide start menu; move camera to ingame camera
        this.emptyElement(startMenu);
        start.setAttribute('visible', 'false');
        start.querySelector('#start-camera').setAttribute('camera', 'active: false');
        ingame.setAttribute('visible', 'true');
        ingame.setAttribute('ingame', 'multiplayer: true; host: ' + hostStatus + '; roomID: ' + roomID);
        gameCamera.setAttribute('camera', 'active: true');
        if(this.data.startCount <= 0){
            gameCamera.setAttribute('fps-look-controls', 'userHeight: 1');
        } else {
            gameCamera.setAttribute('fps-look-controls', 'userHeight: 0');
        }

        //Correct Camera
        if(scene.is('vr-mode') == true){
            gameCameraRig.setAttribute('position', '0 0 4');
        }

        //Play factory sound
        factoryAudio.components.sound.playSound();

        this.data.startCount++
    },

    //REMOVE ELEMENT FUNCTION
    emptyElement: function(element, name){
        if(!name){
            while (element.firstChild) {
                element.removeChild(element.lastChild);
            }
        } else if (name) {
            for (let el of element.children) {
                if (el.className == name) {
                    el.remove();
                }        
            }
        }
    }
});