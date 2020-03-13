AFRAME.registerComponent('ingame', {
    schema : {
        time : {type: 'int', default: 12000},
        score : {type: 'int', default: 0},
    },

    init : function() {
        let timerEl = document.querySelector("#timer");
        let scoreEl = document.querySelector("#score");

        let hudX = (document.body.clientWidth / 2) / 960;
        let hudY = ((document.body.clientHeight / 2) / 540) / 2;

        pauseGame = false;
        context = this;

        document.addEventListener('keydown', function(key) {
            if(key.keyCode === 27){
                pauseGame = true;
            }
        }, false);

        timerEl.setAttribute("position", "-" + hudX + " " + hudY + " -1");
        scoreEl.setAttribute("position", hudX + " " + hudY + " -1");
    },

    tick : function(){ //Add time argument later, more refined
        let timerEl = document.querySelector("#timer");
        let scoreEl = document.querySelector("#score");
        if(pauseGame == true){
            //context.pauseMenu();
        }

        if(this.data.time <= 0) {
            console.log("victory");
        } else {
            this.data.time--;
            timerEl.setAttribute("value", Math.floor(this.data.time / 100));
        }

        scoreEl.setAttribute("value", this.data.score + " PTS");
    },

    //Generate Pause Menu
    pauseMenu : function(){
        console.log("Pause menu created!");

        var pauseMenu = document.getElementById('pauseMenu');
        var pauseLogo = document.createElement('a-image');
        var resumeButton = document.createElement('a-image');
        var exitButton = document.createElement('a-image');

        pauseLogo.setAttribute('src', '#pause-logo');
        pauseLogo.setAttribute('position', '0 3 -2');
        pauseLogo.setAttribute('width', '3.7');
        pauseLogo.setAttribute('height', '1');
        pauseLogo.setAttribute('scale', '0.8 0.8 0.8');

        resumeButton.setAttribute('class', 'menu');
        resumeButton.setAttribute('id', 'resumeButton');
        resumeButton.setAttribute('src', '#resume-button');
        resumeButton.setAttribute('position', '0 2.5 -2');
        resumeButton.setAttribute('width', '1.29');
        resumeButton.setAttribute('height', '.363');

        exitButton.setAttribute('class', 'menu');
        exitButton.setAttribute('id', 'exitButton');
        exitButton.setAttribute('src', '#exit-button');
        exitButton.setAttribute('position', '0 2 -2');
        exitButton.setAttribute('width', '1.29');
        exitButton.setAttribute('height', '.363');


        pauseMenu.append(pauseLogo);
        pauseMenu.append(resumeButton);
        pauseMenu.append(pauseLogo);
        pauseMenu.append(exitButton);

        //context.menuEventListener(context.el.querySelectorAll('.menu'));
    },
});
