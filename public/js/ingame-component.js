AFRAME.registerComponent('ingame', {
    schema : {
        time : {type: 'int', default: 12000}, //default 12000
        score : {type: 'int', default: 0},
        opponentScore : {type: 'int', default: 0},
        multiplayer : {type: 'boolean', default: false},
        host : {type: 'boolean'},
        full: {type: 'boolean', default: false},
        conveyorArray: {type: 'array'},
        trashArray: {type: 'array'},
        pauseGame: {type: 'boolean', default: false},
        gameOver: {type: 'boolean', default: false},
        roomID: {type: 'string'},
    },

    //INITIAL FUNCTION
    init : function() {
        let scene = document.getElementById('scene');
        let left = document.getElementById('hand-left');
        let cursor = document.getElementById('game-cursor');
        let timerEl = document.getElementById("timer");
        let scoreEl = document.getElementById("score");
        let opponentScoreEl = document.getElementById("opponentScore");
        let youEl = document.getElementById("youText");
        let opponentEl = document.getElementById("opponentText");
        let hud = document.getElementById('HUD');
        let hudX = (document.body.clientWidth / 2) / 960;
        let hudY = ((document.body.clientHeight / 2) / 540) / 2;

        context = this;

        //empty trash
        startMenu.components['interact-start-menu'].emptyElement(scene, 'clickable trash');

        //make HUD visible
        hud.setAttribute('visible', 'true');

        //hide cursor on vr
        if(scene.is('vr-mode')){
            cursor.setAttribute('visible', 'false');
        }

        //Adjust HUD to browser
        timerEl.setAttribute("position", "-" + hudX + " " + hudY + " -1");
        scoreEl.setAttribute("position", hudX + " " + hudY + " -1");
        hudY -= 0.2;
        opponentScoreEl.setAttribute("position", hudX + " " + hudY + " -1");
        hudY += 0.1;
        opponentEl.setAttribute("position", hudX + " " + hudY + " -1");
        hudY += 0.2;
        youEl.setAttribute("position", hudX + " " + hudY + " -1");

        //Pause Menu Event Listener
        document.addEventListener('keydown', function(e) {
            let camera = document.getElementById('game-camera');
            let conveyors = document.querySelectorAll('.conveyor');
            let trashArray = document.querySelectorAll('.trash');

            if(e.keyCode === 27 && context.data.gameOver == false){
                if(context.data.pauseGame == false){
                    context.data.pauseGame = true;
                    camera.removeAttribute('fps-look-controls');
                    if(context.data.multiplayer == false){
                        for(let conveyor of conveyors){
                            conveyor.components['animation'].pause();
                        }
                    }
                    for(let trash of trashArray){
                        if(context.data.multiplayer == false){
                            if(trash.components['dynamic-body']){
                                trash.components['dynamic-body'].pause();
                            }
                        }
                    }
                    context.pauseMenu();
                } else {
                    context.data.pauseGame = false;
                }
            }
        });

        //VR Pause Listener
        if(scene.is('vr-mode')){
            left.addEventListener('xbuttondown', function(){
                let conveyors = document.querySelectorAll('.conveyor');
                let trashArray = document.querySelectorAll('.trash');

                if(context.data.gameOver == false){
                    if(context.data.pauseGame == false){
                        context.data.pauseGame = true;
                        if(context.data.multiplayer == false){
                            for(let conveyor of conveyors){
                                conveyor.components['animation'].pause();
                            }
                        }
                        for(let trash of trashArray){
                            if(context.data.multiplayer == false){
                                if(trash.components['dynamic-body']){
                                    trash.components['dynamic-body'].pause();
                                }
                            }
                        }
                        context.pauseMenu();
                    } else {
                        context.data.pauseGame = false;
                    }
                }
            });
        }

        //Multiplayer standby
        if(context.data.multiplayer == true){
            if(context.data.host == true){
                this.generateStandby('Waiting for Player 2');
            }
        }

        //Socket functions
        if(context.data.multiplayer == true){

            //Get head rotation
            socket.on('send-opponent-rotation', function(rotation){
                console.log(rotation);
                document.getElementById('opponent').setAttribute('rotation', "0 " + rotation + " 0");
            })

            if (context.data.host == true){
                if (context.data.full == false){

                    socket.on('ready-room', function(oppID){//Start game when opponent joins
                        console.log(oppID + ' is ready');
                        let count = 0;
                        let startInt = setInterval(function(){
                            switch(count){
                                case 0:
                                    startMenu.components['interact-start-menu'].emptyElement(pauseMenu);
                                    context.generateStandby('Player Found');
                                    break;

                                case 1:
                                    startMenu.components['interact-start-menu'].emptyElement(pauseMenu);
                                    context.generateStandby('3');
                                    break;
                                
                                case 2:
                                    startMenu.components['interact-start-menu'].emptyElement(pauseMenu);
                                    context.generateStandby('2');
                                    break;

                                case 3:
                                    startMenu.components['interact-start-menu'].emptyElement(pauseMenu);
                                    context.generateStandby('1');
                                    break;
                                
                                case 4:
                                    startMenu.components['interact-start-menu'].emptyElement(pauseMenu);
                                    context.generateStandby('GO');
                                    break;
                                case 5:
                                    clearInterval(startInt);
                                    startMenu.components['interact-start-menu'].emptyElement(pauseMenu);
                                    document.getElementById(context.data.conveyorArray[0].id).components['animation'].play();
                                    context.data.full = true;
                                    break;
                            }
                            socket.emit('get-countdown', count, context.data.roomID);
                            count++;
                        }, 1000);
                    });
                }
            } else {
                socket.on('send-countdown', function(count){
                    switch(count){
                        case 0:
                            startMenu.components['interact-start-menu'].emptyElement(pauseMenu);
                            context.generateStandby('Joining Game');
                            break;

                        case 1:
                            startMenu.components['interact-start-menu'].emptyElement(pauseMenu);
                            context.generateStandby('3');
                            break;
                        
                        case 2:
                            startMenu.components['interact-start-menu'].emptyElement(pauseMenu);
                            context.generateStandby('2');
                            break;

                        case 3:
                            startMenu.components['interact-start-menu'].emptyElement(pauseMenu);
                            context.generateStandby('1');
                            break;
                        
                        case 4:
                            startMenu.components['interact-start-menu'].emptyElement(pauseMenu);
                            context.generateStandby('GO');
                            break;
                        case 5:
                            startMenu.components['interact-start-menu'].emptyElement(pauseMenu);
                            document.getElementById(context.data.conveyorArray[0].id).components['animation'].play();
                            context.data.full = true;
                            break;
                    }

                    if(context.data.pauseGame == false && context.data.gameOver == false){
                        socket.on('send-trash', function(trashArray){
                            console.log(trashArray);
                        });
                    }
                });

                socket.on('send-time', function(time){
                    context.data.time = time;
                });
            }

            if(context.data.gameOver == false){
                socket.on('forfeit', function(){
                    let conveyorArray = document.querySelectorAll('.conveyor');
                    let trashArray = document.querySelectorAll('.trash');

                    context.data.gameOver = true;
                    context.victoryMenu('Opponent has left');
                    //empty trash
                    for(let conveyor of conveyorArray){
                        conveyor.components['animation'].pause();
                    }
                    for(let trash of trashArray){
                        trash.components['dynamic-body'].pause();
                    }
                    startMenu.components['interact-start-menu'].emptyElement(scene, 'clickable trash');

                    socket.emit('leave-room', context.data.roomID);
                });

                socket.on('send-score', function(score){
                    context.data.opponentScore = score;
                });
            }
        }

        //Hide multiplayer HUD elements on single player
        if(this.data.multiplayer == false){
            opponentScoreEl.setAttribute('visible', 'false');
            opponentEl.setAttribute('visible', 'false');
            youEl.setAttribute('visible', 'false');
        } else {
            opponentScoreEl.setAttribute('visible', 'true');
            opponentEl.setAttribute('visible', 'true');
            youEl.setAttribute('visible', 'true');
        }

        //Generate first Conveyor
        this.data.conveyorArray.push(new Conveyor(0, 3613, true));
        if(context.data.multiplayer == true){
            setTimeout(function(){
                document.getElementById(context.data.conveyorArray[0].id).components['animation'].pause();
            }, 0);
        }

        //Generate Bin Walls. Doing it this way as workaround for bug that encloses trash on generation
        this.generateBinSides();
    },

    //TICK FUNCTION
    tick : function(){
        let scene = document.getElementById('scene');
        let timerEl = document.querySelector("#timer");
        let scoreEl = document.querySelector("#score");
        let opponentScoreEl = document.querySelector("#opponentScore");
        let conveyorArray = document.querySelectorAll('.conveyor');
        let trashArray = document.querySelectorAll('.trash');

        //Display the updated score
        scoreEl.setAttribute("value", this.data.score + " PTS");
        
        //Singleplayer
        if(this.data.multiplayer == false){
            if(this.data.pauseGame == false){ //Not paused
                if(this.data.time <= 0 && this.data.gameOver == false) {
                    //empty trash
                    for(let conveyor of conveyorArray){
                        conveyor.components['animation'].pause();
                    }
                    for(let trash of trashArray){
                        trash.components['dynamic-body'].pause();
                    }
                    startMenu.components['interact-start-menu'].emptyElement(scene, 'clickable trash');

                    context.victoryMenu("You're score is " + this.data.score);
                    this.data.gameOver = true;
                } else if (this.data.gameOver == false){ //No game over

                    //calculate time
                    this.data.time--;
                    timerEl.setAttribute("value", Math.floor(this.data.time / 100));

                    //Generate Trashes
                    if(this.data.time < 12000){// When time is less than 120s //-10.5
                        if ((this.data.time % (200 + Math.floor(Math.random() * 5)) * 10) == 0){
                            this.data.trashArray.push(new Trash(-10.5, 1.4, 0));
                        }
                    }
                    if (this.data.time < 10000) {// When time is less than 100s
                        if ((this.data.time % (100 + Math.floor(Math.random() * 3)) * 10) == 0){
                            this.data.trashArray.push(new Trash(-10.5, 1.4, 0)); 
                        }
                    }
                    if (this.data.time < 5000) {// When time is less than 50s
                        if ((this.data.time % (40 + Math.floor(Math.random() * 2)) * 5) == 0){
                            this.data.trashArray.push(new Trash(-10.5, 1.4, 0)); 
                        }
                    }
                    if (this.data.time < 2000) {// When time is less than 20s
                        if ((this.data.time % (20 + Math.floor(Math.random() * 2)) * 2) == 0){
                            this.data.trashArray.push(new Trash(-10.5, 1.4, 0)); 
                        }
                    }

                    //Degenerate Trash
                    if(this.data.trashArray.length >= 30){
                        document.getElementById(this.data.trashArray[0].id).remove();
                        this.data.trashArray.shift();
                    }

                }
            }

            //Generate conveyor. 225.81/s is speed
            let conveyors = document.querySelectorAll('.conveyor');
            if(this.data.conveyorArray[0].object3D.position.x > 0 && conveyors.length < 2){
                this.data.conveyorArray.push(new Conveyor(-16, 7000, true));
            }
            if(this.data.conveyorArray[0].object3D.position.x == 16){
                document.getElementById(this.data.conveyorArray[0].id).remove();
                this.data.conveyorArray.shift();
            }
        }

        //Multiplayer
        if(this.data.multiplayer == true){

            if(this.data.full == true) {

                if(this.data.pauseGame == false){ //Not paused
                    if(this.data.time <= 0 && this.data.gameOver == false) {
                        //empty trash
                        startMenu.components['interact-start-menu'].emptyElement(scene, 'clickable trash');
                        if(this.data.score > this.data.opponentScore){
                            context.victoryMenu("You win!");
                        } else if (this.data.score < this.data.opponentScore){
                            context.victoryMenu("You lose!");
                        } else {
                            context.victoryMenu("It's a draw!");
                        }

                        this.data.gameOver = true;
                    } else if (this.data.gameOver == false){ //No game over

                        //time functionality
                        if(this.data.host == true){
                            this.data.time--;
                            socket.emit('get-time', this.data.time, this.data.roomID);
                        }
                        timerEl.setAttribute("value", Math.floor(this.data.time / 100));

                        //score functionality
                        socket.emit('get-score', this.data.score, this.data.roomID);
                        opponentScoreEl.setAttribute("value", this.data.opponentScore + " PTS");

                        //Generate Trashes
                        if(this.data.time < 12000){// When time is less than 120s //
                            if(this.data.trashArray.length < 30){
                                if ((this.data.time % (200 + Math.floor(Math.random() * 5)) * 10) == 0){
                                    this.data.trashArray.push(new Trash(-10.5, 1.4, 0));
                                }
                            }
                        }
                        if (this.data.time < 10000) {// When time is less than 100s
                            if(this.data.trashArray.length < 30){
                                if ((this.data.time % (100 + Math.floor(Math.random() * 3)) * 10) == 0){
                                    this.data.trashArray.push(new Trash(-10.5, 1.4, 0)); 
                                }
                            }
                        }
                        if (this.data.time < 5000) {// When time is less than 50s
                            if(this.data.trashArray.length < 30){
                                if ((this.data.time % (40 + Math.floor(Math.random() * 2)) * 5) == 0){
                                    this.data.trashArray.push(new Trash(-10.5, 1.4, 0)); 
                                }
                            }
                        }
                        if (this.data.time < 2000) {// When time is less than 20s
                            if(this.data.trashArray.length < 30){
                                if ((this.data.time % (20 + Math.floor(Math.random() * 2)) * 2) == 0){
                                    this.data.trashArray.push(new Trash(-10.5, 1.4, 0)); 
                                }
                            }
                        }

                        //Degenerate Trash
                        if(this.data.trashArray.length >= 30){
                            document.getElementById(this.data.trashArray[0].id).remove();
                            this.data.trashArray.shift();
                        }
                    }
                }

                //Generate conveyor. 225.81/s is speed
                let conveyors = document.querySelectorAll('.conveyor');
                if(this.data.conveyorArray[0].object3D.position.x > 0 && conveyors.length < 2){
                    this.data.conveyorArray.push(new Conveyor(-16, 7000, true));
                }
                if(this.data.conveyorArray[0].object3D.position.x == 16){
                    document.getElementById(this.data.conveyorArray[0].id).remove();
                    this.data.conveyorArray.shift();
                }
            }

            //Send head rotation
            socket.emit('get-opponent-rotation', (document.getElementById('game-camera').object3D.rotation.y * -1) * (180/Math.PI), this.data.roomID);
        }
    },

    //PAUSE MENU
    pauseMenu : function(){
        console.log("Pause menu created!");

        let scene = document.getElementById('scene');
        var pauseMenu = document.getElementById('pauseMenu');
        let cursor = document.getElementById('game-cursor');
        var pauseLogo = document.createElement('a-image');
        var resumeButton = document.createElement('a-image');
        var controlsButton = document.createElement('a-image');
        var exitButton = document.createElement('a-image');

        //Empty pause container element
        startMenu.components['interact-start-menu'].emptyElement(pauseMenu);

        //Pause logo
        pauseLogo.setAttribute('src', '#pause-logo');
        pauseLogo.setAttribute('position', '0 2.7 -1');
        pauseLogo.setAttribute('width', '3.7');
        pauseLogo.setAttribute('height', '1');
        pauseLogo.setAttribute('scale', '0.3 0.3 0.3');

        //Resume Button
        resumeButton.setAttribute('class', 'menu');
        resumeButton.setAttribute('id', 'resumeButton');
        resumeButton.setAttribute('src', '#resume-button');
        resumeButton.setAttribute('position', '0 2.2 -1.2');
        resumeButton.setAttribute('width', '1.29');
        resumeButton.setAttribute('height', '.363');

        //Instructions Button
        controlsButton.setAttribute('class', 'menu');
        controlsButton.setAttribute('id', 'controlsButton');
        controlsButton.setAttribute('src', '#controls-button');
        controlsButton.setAttribute('position', '0 1.7 -1.2');
        controlsButton.setAttribute('width', '1.29');
        controlsButton.setAttribute('height', '.363');

        //Exit Button
        exitButton.setAttribute('class', 'menu');
        exitButton.setAttribute('id', 'exitButton');
        exitButton.setAttribute('src', '#exit-button');
        exitButton.setAttribute('position', '0 1.2 -1.2');
        exitButton.setAttribute('width', '1.29');
        exitButton.setAttribute('height', '.363');

        cursor.setAttribute('visible', 'false');

        pauseMenu.append(pauseLogo);
        pauseMenu.append(resumeButton);
        pauseMenu.append(controlsButton);
        pauseMenu.append(exitButton);

        if(scene.is('vr-mode')){
            this.vrMenuEventListener(this.el.querySelectorAll('.menu'));
        } else {
            this.menuEventListener(this.el.querySelectorAll('.menu'));
        }
    },

    //MENU LISTENER
    menuEventListener: function(menuButtons){
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

    //VR Listeners
    vrMenuEventListener: function(menuButtons){
        let currentButton;
        let left = document.getElementById('hand-left');
        let right = document.getElementById('hand-right');
        let context = this;

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

        left.addEventListener('xbuttondown', function(e){
            if(currentButton){
                context.clickMenu(currentButton);
            }
        });

        right.addEventListener('abuttondown', function(e){
            if(currentButton){
                context.clickMenu(currentButton);
            }
        });

        left.addEventListener('triggerdown', function(e){
            if(currentButton){
                context.clickMenu(currentButton);
            }
        });

        right.addEventListener('triggerdown', function(e){
            if(currentButton){
                context.clickMenu(currentButton);
            }
        });
    },

    //CLICK MENU FUNCTION
    clickMenu : function(menuButton){
        let sceneEl = document.getElementById('scene');
        let menuID = menuButton.getAttribute('id');
        var pauseMenu = document.getElementById('pauseMenu');
        var startMenu = document.getElementById('startMenu');
        let cursor = document.getElementById('game-cursor');
        let camera = document.getElementById('game-camera');
        let hud = document.getElementById('HUD');
        let conveyors = document.querySelectorAll('.conveyor');
        let trashArray = document.querySelectorAll('.trash');
        
        //CASE THAT USER IS PRESSING
        switch (menuID){
            case 'resumeButton':

                if(this.data.multiplayer == false){ //Singleplayer
                    startMenu.components['interact-start-menu'].emptyElement(pauseMenu);
                    if(sceneEl.is('vr-mode') == false){
                        cursor.setAttribute('visible', 'true');
                    }
                    camera.setAttribute('fps-look-controls', 'userHeight: 0');
                    for(let conveyor of conveyors){
                        conveyor.components['animation'].play();
                    }
                    for(let trash of trashArray){
                        trash.components['dynamic-body'].play();
                    }

                    this.data.pauseGame = false;
                    break;
                } else { //Multiplayer
                    startMenu.components['interact-start-menu'].emptyElement(pauseMenu);
                    cursor.setAttribute('visible', 'true');
                    camera.setAttribute('fps-look-controls', 'userHeight: 0');
                    if(this.data.host == true && this.data.full == false) {
                        this.generateStandby("Waiting for player 2");
                    }

                    this.data.pauseGame = false;
                    break;
                }

            case 'exitButton':
                let scene = document.getElementById('scene');
                let start = document.getElementById('start');
                let conveyor = document.getElementById('conveyorContainer');

                //Sound
                var factoryAudio = document.getElementById('factoryAudio');


                startMenu.components['interact-start-menu'].emptyElement(pauseMenu);
                this.el.setAttribute('visible', 'false');
                start.querySelector('#start-camera').setAttribute('camera', 'active: true');
                start.setAttribute('visible', 'true');
                camera.setAttribute('camera', 'active: false');

                //empty conveyor
                startMenu.components['interact-start-menu'].emptyElement(conveyor);

                //empty trash
                startMenu.components['interact-start-menu'].emptyElement(scene, 'clickable trash');

                //Reset game values
                this.el.removeAttribute('ingame');
                cursor.setAttribute('visible', 'true');
                camera.setAttribute('fps-look-controls');

                //Stop the ambianance sound
                factoryAudio.components.sound.stopSound();

                if(this.data.multiplayer == true){
                    socket.emit('leave-room', this.data.roomID);
                }

                startMenu.components['interact-start-menu'].startMenu();
                break;

            case 'controlsButton':
                this.controlsMenu('instructions');
                hud.setAttribute('visible', 'false');
                break;

            case 'back':
                this.pauseMenu();
                hud.setAttribute('visible', 'true');
                break;

            case 'next':
                this.controlsMenu(menuButton.getAttribute('data-state'));
                break;
        }

    },
    
    //CONTROL MENU
    controlsMenu: function(state){
        var pauseMenu = document.getElementById('pauseMenu');
        var instCont = document.createElement('a-entity');
        var img =  document.createElement('a-image');
        var back =  document.createElement('a-entity');
        var next =  document.createElement('a-entity');

        //Empty start menu of child nodes
        startMenu.components['interact-start-menu'].emptyElement(pauseMenu);

        instCont.setAttribute('id', 'instCont');
        if(scene.is('vr-mode')){
            instCont.setAttribute('position', '0 2 -3');
        } else {
            instCont.setAttribute('position', '0 2 -2');
        }
        
        instCont.setAttribute('scale', '2.5 2.5 2.5');

        img.setAttribute('id', 'instructImg')
        if(state == 'instructions'){
            img.setAttribute('src', '#intruct-img-1');
        } else if (state == 'controls') {
            img.setAttribute('src', '#intruct-img-2');
        }   
        img.setAttribute('scale', '1.5 1.5 1.5');
        img.setAttribute('width', '1.29');
        img.setAttribute('height', '.847');

        back.setAttribute('text', 'value: Back to pause menu; color: #f4eed7; align: center; height: 2; width: 0.9; font: https://cdn.aframe.io/fonts/Exo2Bold.fnt;');
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

        //APPENDING PICTURES AND BUTTONS
        pauseMenu.append(instCont);
        instCont.append(img);
        instCont.append(back);
        instCont.append(next);

        if(scene.is('vr-mode')){
            this.vrMenuEventListener(this.el.querySelectorAll('.menu'));
        } else {
            this.menuEventListener(this.el.querySelectorAll('.menu'));
        }
    },

    //VICTORY MENU
    victoryMenu : function(text){
        console.log("Victory created!");
        let hud = document.getElementById('HUD');

        var victoryMenu = document.getElementById('pauseMenu');
        let cursor = document.getElementById('game-cursor');
        let camera = document.getElementById('game-camera');
        var pauseLogo = document.createElement('a-image');
        var exitButton = document.createElement('a-image');
        let waiting = document.createElement('a-text');

        pauseLogo.setAttribute('src', '#gameover-logo');
        pauseLogo.setAttribute('position', '0 2.5 -1.2');
        pauseLogo.setAttribute('width', '3.7');
        pauseLogo.setAttribute('height', '1');
        pauseLogo.setAttribute('scale', '0.4 0.4 0.4');

        waiting.setAttribute('value', text);
        waiting.setAttribute('align', 'center');
        waiting.setAttribute('height', '2');
        waiting.setAttribute('width', '5');
        waiting.setAttribute('font', 'https://cdn.aframe.io/fonts/Exo2Bold.fnt');
        waiting.setAttribute('position', "0 2.1 -1.2");

        exitButton.setAttribute('class', 'menu');
        exitButton.setAttribute('id', 'exitButton');
        exitButton.setAttribute('src', '#exit-button');
        exitButton.setAttribute('position', '0 1.5 -1.2');
        exitButton.setAttribute('width', '1.29');
        exitButton.setAttribute('height', '.363');

        cursor.setAttribute('visible', 'false');
        camera.removeAttribute('fps-look-controls');

        hud.setAttribute('visible', 'false');

        victoryMenu.append(pauseLogo);
        victoryMenu.append(waiting);
        victoryMenu.append(exitButton);

        if(scene.is('vr-mode')){
            this.vrMenuEventListener(this.el.querySelectorAll('.menu'));
        } else {
            this.menuEventListener(this.el.querySelectorAll('.menu'));
        }
    },

    //GENERATING BIN SIDE FUNCTION (FOR USERS)
    generateBinSides(){
        let bins = document.getElementById('playerBins');

        for (let bin of document.querySelectorAll(".bin")){
            let binSide = [];

            for(var i = 0; i < 5; i++){
                binSide[i] = document.createElement('a-plane');

                binSide[i].setAttribute('height', "1;");
                binSide[i].setAttribute('width', "1;");
                
                binSide[i].setAttribute('visible', "false");
                binSide[i].setAttribute('static-body', "");

                if(i == 0){
                    binSide[i].setAttribute('scale', "10 10 10");
                } else {
                    binSide[i].setAttribute('scale', "25 40 20");
                }

                switch(i){
                    
                    case 0: //bottom
                        binSide[i].setAttribute('position', "0 0 0");
                        binSide[i].setAttribute('rotation', "-90 0 0");
                        if(bin.parentElement.getAttribute('id') == 'playerBins'){
                            binSide[i].setAttribute('class', "binCollider");
                        } else if (bin.parentElement.getAttribute('id') == 'opponentBins'){
                            binSide[i].setAttribute('class', "enemyCollider");
                        }
                        binSide[i].setAttribute('data-trash-type', bin.getAttribute("data-trash-type"));
                        break;

                    case 1: //right
                        binSide[i].setAttribute('position', "0 3.166 -11.923");
                        binSide[i].setAttribute('rotation', "0 0 0");
                        break;

                    case 2: //left
                        binSide[i].setAttribute('position', "0 3.166 11.923");
                        binSide[i].setAttribute('rotation', "0 180 0");
                        break;

                    case 3: //back
                        binSide[i].setAttribute('position', "11.923 3.166 0");
                        binSide[i].setAttribute('rotation', "0 -90 0");
                        break;

                    case 4: //front
                        binSide[i].setAttribute('position', "-11.923 7.758 0");
                        binSide[i].setAttribute('rotation', "0 90 0");
                        break;
                }

                bin.append(binSide[i]);
            }
        }
    },

    generateStandby : function(string){
        let pauseMenu = document.getElementById('pauseMenu');
        let waiting = document.createElement('a-text');

        waiting.setAttribute('value', string);
        waiting.setAttribute('align', 'center');
        waiting.setAttribute('height', '2');
        waiting.setAttribute('width', '0.5');
        waiting.setAttribute('font', 'https://cdn.aframe.io/fonts/Exo2Bold.fnt');
        waiting.setAttribute('position', "0 2 0");
        pauseMenu.append(waiting);
    }
});