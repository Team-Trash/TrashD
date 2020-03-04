AFRAME.registerComponent('ingame', {
    schema : {
        time : {type: 'int', default: 12000},
    },

    init : function() {
       
    },

    tick : function(){
        let timerEl = document.querySelector("#timer");
        
        if(this.data.time <= 0) {
            console.log("victory");
        } else {
            this.data.time--;
            timerEl.setAttribute("value", Math.floor(this.data.time / 100));
        }
    }
});
