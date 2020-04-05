AFRAME.registerComponent('ingame', {
    schema : {
        time : {type: 'int', default: 12000},
        score : {type: 'int', default: 0},
        opponentScore : {type: 'int', default: 0},
        multiplayer : {type: 'boolean', default: false},
        host : {type: 'boolean'},
        full: {type: 'boolean'},
        conveyorArray: {type: 'array'},
        trashArray: {type: 'array'},
        pauseGame: {type: 'boolean', default: false},
        gameOver: {type: 'boolean', default: false},
    },

    init : function() {
        let timerEl = document.querySelector("#timer");
        let scoreEl = document.querySelector("#score");
        let opponentScoreEl = document.querySelector("#opponentScore");
        let youEl = document.querySelector("#youText");
        let opponentEl = document.querySelector("#opponentText");

        let hudX = (document.body.clientWidth / 2) / 960;
        let hudY = ((document.body.clientHeight / 2) / 540) / 2;

        context = this;

        //Pause Menu Event Listener
        document.addEventListener('keydown', function(e) {
            let camera = document.getElementById('game-camera');
            let conveyors = document.querySelectorAll('.conveyor');
            let trashArray = document.querySelectorAll('.trash');

            if(e.keyCode === 27){
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

        //Multiplayer standby
        if(context.data.multiplayer == true && context.data.host == true && context.data.full == false){
            let pauseMenu = document.getElementById('pauseMenu');
            let waiting = document.createElement('a-text');

            waiting.setAttribute('value', 'Waiting for Player 2');
            waiting.setAttribute('align', 'center');
            waiting.setAttribute('height', '2');
            waiting.setAttribute('width', '0.5');
            waiting.setAttribute('font', 'https://cdn.aframe.io/fonts/Exo2Bold.fnt');
            waiting.setAttribute('position', "0 2 0");
            pauseMenu.append(waiting);
        }

        //Hide multiplayer HUD elements on single player
        if(this.data.multiplayer == false){
            opponentScoreEl.setAttribute('visible', 'false');
            opponentEl.setAttribute('visible', 'false');
            youEl.setAttribute('visible', 'false');
        }
        
        //Generate first Conveyor
        this.data.conveyorArray.push(new Conveyor(0, 3613));

        //Generate Bin Walls. Doing it this way as workaround for bug that encloses trash on generation
        this.generateBinSides();

        //Adjust HUD to browser
        timerEl.setAttribute("position", "-" + hudX + " " + hudY + " -1");
        scoreEl.setAttribute("position", hudX + " " + hudY + " -1");
        hudY -= 0.2;
        opponentScoreEl.setAttribute("position", hudX + " " + hudY + " -1");
        hudY += 0.1;
        opponentEl.setAttribute("position", hudX + " " + hudY + " -1");
        hudY += 0.2;
        youEl.setAttribute("position", hudX + " " + hudY + " -1");
    },

    tick : function(){
        let scene = document.getElementById('scene');
        let timerEl = document.querySelector("#timer");
        let scoreEl = document.querySelector("#score");

        //Display the updated score
        scoreEl.setAttribute("value", this.data.score + " PTS");
        
        if(this.data.pauseGame == false){ //Not paused
            if(this.data.time <= 0 && this.data.gameOver == false) {
                //empty trash
                conveyor.components['animation'].pause();
                trash.components['dynamic-body'].pause();
                startMenu.components['interact-start-menu'].emptyElement(scene, 'clickable trash');

                context.victoryMenu();
                this.data.gameOver = true;
            } else if (this.data.gameOver == false){ //No game over
                this.data.time--;
                timerEl.setAttribute("value", Math.floor(this.data.time / 100));

                //Generate Trash
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
            this.data.conveyorArray.push(new Conveyor(-16, 7000));
        }
        if(this.data.conveyorArray[0].object3D.position.x == 16){
            document.getElementById(this.data.conveyorArray[0].id).remove();
            this.data.conveyorArray.shift();
        }
    },

    //Generate Pause Menu
    pauseMenu : function(){
        console.log("Pause menu created!");

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
        pauseLogo.setAttribute('position', '0 2.7 -2');
        pauseLogo.setAttribute('width', '3.7');
        pauseLogo.setAttribute('height', '1');
        pauseLogo.setAttribute('scale', '0.5 0.5 0.5');

        //Resume Button
        resumeButton.setAttribute('class', 'menu');
        resumeButton.setAttribute('id', 'resumeButton');
        resumeButton.setAttribute('src', '#resume-button');
        resumeButton.setAttribute('position', '0 2.2 -2');
        resumeButton.setAttribute('width', '1.29');
        resumeButton.setAttribute('height', '.363');

        //Instructions Button
        controlsButton.setAttribute('class', 'menu');
        controlsButton.setAttribute('id', 'controlsButton');
        controlsButton.setAttribute('src', '#controls-button');
        controlsButton.setAttribute('position', '0 1.7 -2');
        controlsButton.setAttribute('width', '1.29');
        controlsButton.setAttribute('height', '.363');

        //Exit Button
        exitButton.setAttribute('class', 'menu');
        exitButton.setAttribute('id', 'exitButton');
        exitButton.setAttribute('src', '#exit-button');
        exitButton.setAttribute('position', '0 1.2 -2');
        exitButton.setAttribute('width', '1.29');
        exitButton.setAttribute('height', '.363');

        cursor.setAttribute('visible', 'false');

        pauseMenu.append(pauseLogo);
        pauseMenu.append(resumeButton);
        pauseMenu.append(controlsButton);
        pauseMenu.append(exitButton);

        context.menuEventListener(pauseMenu.querySelectorAll('.menu'));
    },

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

    clickMenu : function(menuButton){
        let menuID = menuButton.getAttribute('id');
        var pauseMenu = document.getElementById('pauseMenu');
        var startMenu = document.getElementById('startMenu');
        let cursor = document.getElementById('game-cursor');
        let camera = document.getElementById('game-camera');
        let hud = document.getElementById('HUD');
        let conveyors = document.querySelectorAll('.conveyor')
        let trashArray = document.querySelectorAll('.trash');
        
        switch (menuID){

            case 'resumeButton':
                startMenu.components['interact-start-menu'].emptyElement(pauseMenu);
                cursor.setAttribute('visible', 'true');
                camera.setAttribute('fps-look-controls', 'userHeight: 0');
                for(let conveyor of conveyors){
                    conveyor.components['animation'].play();
                }
                for(let trash of trashArray){
                    trash.components['dynamic-body'].play();
                }

                this.data.pauseGame = false;
                instructionGame = false;
                break;

            case 'exitButton':
                let scene = document.getElementById('scene');
                let start = document.getElementById('start');
                let conveyor = document.getElementById('conveyorContainer');

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

                startMenu.components['interact-start-menu'].startMenu();
                break;

            case 'controlsButton':
                this.controlsMenu('instructions');
                hud.setAttribute('visible', 'false');
                break;

            case 'back':
                this.pauseMenu();
                hud.setAttribute('visible', 'false');
                break;

            case 'next':
                this.controlsMenu(menuButton.getAttribute('data-state'));
                break;
        }

    },
    
    controlsMenu: function(state){
        var pauseMenu = document.getElementById('pauseMenu');
        var instCont = document.createElement('a-entity');
        var img =  document.createElement('a-image');
        var back =  document.createElement('a-entity');
        var next =  document.createElement('a-entity');

        //Empty start menu of child nodes
        startMenu.components['interact-start-menu'].emptyElement(pauseMenu);

        instCont.setAttribute('id', 'instCont');
        instCont.setAttribute('position', '0 2 -2');
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

        pauseMenu.append(instCont);
        instCont.append(img);
        instCont.append(back);
        instCont.append(next);

        this.menuEventListener(this.el.querySelectorAll('.menu'));
    },

    //Generate Victory Menu
    victoryMenu : function(){
        console.log("Victory created!");

        var victoryMenu = document.getElementById('pauseMenu');
        let cursor = document.getElementById('game-cursor');
        let camera = document.getElementById('game-camera');
        var pauseLogo = document.createElement('a-image');
        var exitButton = document.createElement('a-image');

        pauseLogo.setAttribute('src', '#pause-logo');
        pauseLogo.setAttribute('position', '0 3 -2');
        pauseLogo.setAttribute('width', '3.7');
        pauseLogo.setAttribute('height', '1');
        pauseLogo.setAttribute('scale', '0.8 0.8 0.8');

        exitButton.setAttribute('class', 'menu');
        exitButton.setAttribute('id', 'exitButton');
        exitButton.setAttribute('src', '#exit-button');
        exitButton.setAttribute('position', '0 2 -2');
        exitButton.setAttribute('width', '1.29');
        exitButton.setAttribute('height', '.363');

        cursor.setAttribute('visible', 'false');
        camera.removeAttribute('fps-look-controls');

        victoryMenu.append(exitButton);

        context.menuEventListener(pauseMenu.querySelectorAll('.menu'));
    },

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
                        binSide[i].setAttribute('class', "binCollider");
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

    }
});
