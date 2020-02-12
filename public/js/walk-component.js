AFRAME.registerComponent('walk', {
    schema : {
        walking: {type: 'boolean'},
    },

    init : function() {
        console.log('init walk');

        let context = this;

        var map = {}; //Map multiple keys. Source: https://stackoverflow.com/questions/5203407/how-to-detect-if-multiple-keys-are-pressed-at-once-using-javascript

        window.addEventListener("keydown", function(e){ //on keydown w a s d
            
            //set multiple keys
            map[e.keyCode] = e.type == 'keydown';

            if(map[87] || map[83] || map[65] || map[68]) {
                context.el.setAttribute('walk', {'walking': true});
            }

            //console.log(map)
        });

        window.addEventListener("keyup", function(e){ //on keydown w a s d
            
            //set multiple keys
            map[e.keyCode] = e.type == 'keydown';

            if(!map[87] && !map[83] && !map[65] && !map[68]) {
                context.el.setAttribute('walk', {'walking': false});
            }
            
            //console.log(map)
        });
    },

    update : function(oldData){
        if (this.data.walking !== oldData.walking && this.data.walking == true){
            this.el.components.sound.playSound();
            //console.log(this.el.components.sound.isPlaying);
        }
        if (this.data.walking !== oldData.walking && this.data.walking == false){
            this.el.components.sound.pauseSound();
            //console.log(this.el.components.sound.isPlaying);
        }
    }
});