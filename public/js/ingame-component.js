AFRAME.registerComponent('ingame', {
    schema : {
        time : {type: 'int', default: 12000},
        score : {type: 'int', default: 0},
        opponentScore : {type: 'int', default: 0},
        multiplayer : {type: 'boolean', default: 'false'},
    },

    init : function() {
        let timerEl = document.querySelector("#timer");
        let scoreEl = document.querySelector("#score");
        let opponentScoreEl = document.querySelector("#opponentScore");
        let youEl = document.querySelector("#youText");
        let opponentEl = document.querySelector("#opponentText");

        let hudX = (document.body.clientWidth / 2) / 960;
        let hudY = ((document.body.clientHeight / 2) / 540) / 2;

        pauseGame = false;
        victory = false;
        context = this;
        instructionGame = false;

        document.addEventListener('keydown', function(e) {
            if(e.keyCode === 27){
                if(pauseGame == false){
                    pauseGame = true;
                    context.pauseMenu();
                } else {
                    pauseGame = false;
                }
            }
        });

        //IF PLAYER PRESS 'I' WILL SHOW THE INSTRUCTION
        document.addEventListener('keydown', function(e){
            if(pauseGame == false){
                if(e.keyCode === 73){
                    if(instructionGame == false){
                        console.log("TEST!");
                        instructionGame = true;
                        context.instructionGame();
                    } else {
                        instructionGame = false;
                    }
                }
            }
            
        });

        if(this.data.multiplayer == false){
            opponentScoreEl.setAttribute('visible', 'false');
            opponentEl.setAttribute('visible', 'false');
            youEl.setAttribute('visible', 'false');
        }
        
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
        
        scoreEl.setAttribute("value", this.data.score + " PTS");
    },

    //Generate Pause Menu
    pauseMenu : function(){
        console.log("Pause menu created!");

        var pauseMenu = document.getElementById('pauseMenu');
        let cursor = document.getElementById('game-cursor');
        let camera = document.getElementById('game-camera');
        var pauseLogo = document.createElement('a-image');
        var resumeButton = document.createElement('a-image');
        var exitButton = document.createElement('a-image');

        pauseLogo.setAttribute('src', '#pause-logo');
        pauseLogo.setAttribute('position', '0 2.7 -2');
        pauseLogo.setAttribute('width', '3.7');
        pauseLogo.setAttribute('height', '1');
        pauseLogo.setAttribute('scale', '0.5 0.5 0.5');

        resumeButton.setAttribute('class', 'menu');
        resumeButton.setAttribute('id', 'resumeButton');
        resumeButton.setAttribute('src', '#resume-button');
        resumeButton.setAttribute('position', '0 2.2 -2');
        resumeButton.setAttribute('width', '1.29');
        resumeButton.setAttribute('height', '.363');

        exitButton.setAttribute('class', 'menu');
        exitButton.setAttribute('id', 'exitButton');
        exitButton.setAttribute('src', '#exit-button');
        exitButton.setAttribute('position', '0 1.7 -2');
        exitButton.setAttribute('width', '1.29');
        exitButton.setAttribute('height', '.363');

        cursor.setAttribute('visible', 'false');
        camera.removeAttribute('fps-look-controls');

        pauseMenu.append(pauseLogo);
        pauseMenu.append(resumeButton);
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
        
        if(menuID == 'exitButton'){
            let start = document.getElementById('start');

            this.el.setAttribute('visible', 'false');
            start.querySelector('#start-camera').setAttribute('camera', 'active: true');
            start.setAttribute('visible', 'true');
            document.querySelector('#game-camera').setAttribute('camera', 'active: false');

            startMenu.components['interact-start-menu'].startMenu();
        }

        if(menuID == 'resumeButton'){
            var pauseMenu = document.getElementById('pauseMenu');
            let cursor = document.getElementById('game-cursor');
            let camera = document.getElementById('game-camera');

            var instructionMenu = document.getElementById('instructionMenu');


            pauseMenu.setAttribute('visible', 'false');
            cursor.setAttribute('visible', 'true');
            camera.setAttribute('fps-look-controls', 'userHeight: 0');

            pauseGame = false;

            instructionMenu.setAttribute('visible', 'false');

            instructionGame = false;
        }
    },
    //Generate Pause Menu
    instructionGame : function(){
        var instructionMenu = document.getElementById('instructionMenu');
        let cursor = document.getElementById('game-cursor');
        let camera = document.getElementById('game-camera');
        var instructionPicture = document.createElement('a-image');
        var resumeButton = document.createElement('a-image');

        instructionPicture.setAttribute('src', '#instruction');
        instructionPicture.setAttribute('position', '0 2.3 -2');
        instructionPicture.setAttribute('width', '5');
        instructionPicture.setAttribute('height', '2.5');

        resumeButton.setAttribute('class', 'menu');
        resumeButton.setAttribute('id', 'resumeButton');
        resumeButton.setAttribute('src', '#resume-button');
        resumeButton.setAttribute('position', '0 0.7 -2');
        resumeButton.setAttribute('width', '1.29');
        resumeButton.setAttribute('height', '.363');

        cursor.setAttribute('visible', 'false');
        camera.removeAttribute('fps-look-controls');

        instructionMenu.append(instructionPicture);
        instructionMenu.append(resumeButton);

        context.menuEventListener(instructionMenu.querySelectorAll('.menu'));
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
