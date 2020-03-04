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
                    
                    case 'back':
                        socket.close();
                        context.startMenu();
                        break;
                }

                if(roomID){
                    socket.emit('join-room', roomID);
                    socket.on('return-room-id', function(data){
                        context.enterMulti(data);
                    });
                }

            });
        });
    },

    //Generate Start Menu
    startMenu : function(){
        console.log("Start menu created!");

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
        var newRoom =  document.createElement('a-entity');
        var back =  document.createElement('a-entity');
        let rooms = [];
        let position = 0.45;

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
        startMenu.append(multiList);

        socket.emit('get-rooms');
        socket.on('return-rooms', function(data){
            let roomCount = 1;
            console.log(data);
            for (room in data){
                if(room.includes("room") && data[room].length < 2){
                    position -= 0.15;
                    rooms[roomCount] = document.createElement('a-entity');
                    rooms[roomCount].setAttribute('text', 'value: Room ' + roomCount + '; color: #f4eed7; align: center; height: 2; width: 1;');
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

        newRoom.setAttribute('text', 'value: New Room; color: #fff; align: center; height: 2; width: 1;');
        newRoom.setAttribute('id', 'newRoom');
        newRoom.setAttribute('geometry', 'primitive: plane; height: 0.1; width: 0.3');
        newRoom.setAttribute('material', 'color: #fe9801');
        newRoom.setAttribute('position',  '-0.65 ' + position + ' 0.1');
        newRoom.setAttribute('class', 'menu');

        back.setAttribute('text', 'value: Back to start menu; color: #f4eed7; align: center; height: 2; width: 1;');
        back.setAttribute('id', 'back');
        back.setAttribute('geometry', 'primitive: plane; height: 0.1; width: 0.4');
        back.setAttribute('material', 'color: #697c37');
        back.setAttribute('position', '-0.6 -0.45 0.1');
        back.setAttribute('class', 'menu');

        multiList.append(multiBG);
        multiList.append(newRoom);
        multiList.append(back);

        context.menuEventListener(context.el.querySelectorAll('.menu'));
    },

    multiList: function(){
        socket = io();

        socket.on('connect', function() {
            console.log(socket.id + " connected!");
        });

        this.multiMenu();
    },

    enterSingle: function(){
        console.log('Entering SinglePlayer');

        var start = document.getElementById('start');
        var ingame = document.getElementById('ingame');

        start.setAttribute('visible', 'false');
        start.querySelector('#start-camera').setAttribute('camera', 'active: false');
        ingame.setAttribute('visible', 'true');
        ingame.setAttribute('ingame', 'time: 1000');
        ingame.querySelector('#game-camera').setAttribute('camera', 'active: true');
        ingame.querySelector('#game-camera').setAttribute('fps-look-controls', 'userHeight: 1');
    },

    enterMulti: function(data){
        console.log('Entering ' + data);

        var start = document.getElementById('start');
        var ingame = document.getElementById('ingame');

        start.setAttribute('visible', 'false');
        start.querySelector('#start-camera').setAttribute('camera', 'active: false');
        ingame.setAttribute('visible', 'true');
        ingame.querySelector('#game-camera').setAttribute('camera', 'active: true');
        ingame.querySelector('#game-camera').setAttribute('fps-look-controls', 'userHeight: 1');
    }
});
