AFRAME.registerComponent('ingame', {
    schema : {
        time : {type: 'int', default: 12000},
        score : {type: 'int', default: 0},
        opponentScore : {type: 'int', default: 0},
        multiplayer : {type: 'boolean', default: 'false'},
        host : {type: 'boolean', default: 'true'},
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
        pauseGame = false;
        victory = false;

        //Pause Menu Event Listener
        document.addEventListener('keydown', function(e) {
            let camera = document.getElementById('game-camera');

            if(e.keyCode === 27){
                if(pauseGame == false){
                    pauseGame = true;
                    camera.removeAttribute('fps-look-controls');
                    //startCamera.setAttribute('fps-look-controls', 'enabled: false');
                    //startCamera.removeAttribute('fps-look-controls');
                    document.exitPointerLock();
                    context.pauseMenu();
                } else {
                    pauseGame = false;
                }
            }
        });

        //Hide multiplayer HUD elements on single player
        if(this.data.multiplayer == false){
            opponentScoreEl.setAttribute('visible', 'false');
            opponentEl.setAttribute('visible', 'false');
            youEl.setAttribute('visible', 'false');
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
    },

    tick : function(){ //Add time argument later, more refined
        let timerEl = document.querySelector("#timer");
        let scoreEl = document.querySelector("#score");
        if(pauseGame == false){
            if(this.data.time <= 0 && victory == false) {
                context.victoryMenu();
                victory = true;
            } else if (victory == false){
                this.data.time--;
                timerEl.setAttribute("value", Math.floor(this.data.time / 100));
            }
        }
        
        //Display the updated score
        scoreEl.setAttribute("value", this.data.score + " PTS");
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
        let cursor = document.getElementById('game-cursor');
        let camera = document.getElementById('game-camera');
        let hud = document.getElementById('HUD');
        
        switch (menuID){

            case 'resumeButton':
                startMenu.components['interact-start-menu'].emptyElement(pauseMenu);
                cursor.setAttribute('visible', 'true');
                camera.setAttribute('fps-look-controls', 'userHeight: 0');

                pauseGame = false;
                instructionGame = false;
                break;

            case 'exitButton':
                let start = document.getElementById('start');

                //Reset game values
                this.el.removeAttribute('ingame');
                cursor.setAttribute('visible', 'true');
                camera.setAttribute('fps-look-controls', 'userHeight: 1');    

                startMenu.components['interact-start-menu'].emptyElement(pauseMenu);
                this.el.setAttribute('visible', 'false');
                start.querySelector('#start-camera').setAttribute('camera', 'active: true');
                start.setAttribute('visible', 'true');
                document.querySelector('#game-camera').setAttribute('camera', 'active: false');

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

        back.setAttribute('text', 'value: Back to pause menu; color: #f4eed7; align: center; height: 2; width: 1;');
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
});
