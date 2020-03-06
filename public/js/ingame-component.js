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

        timerEl.setAttribute("position", "-" + hudX + " " + hudY + " -1");
        scoreEl.setAttribute("position", hudX + " " + hudY + " -1");
    },

    tick : function(){
        let timerEl = document.querySelector("#timer");
        let scoreEl = document.querySelector("#score");
        
        if(this.data.time <= 0) {
            console.log("victory");
        } else {
            this.data.time--;
            timerEl.setAttribute("value", Math.floor(this.data.time / 100));
        }

        scoreEl.setAttribute("value", this.data.score + " PTS");
    }
});
