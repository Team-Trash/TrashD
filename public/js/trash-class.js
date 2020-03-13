//CLASS FOR TRASH
class Trash{
    classTrash = 'clickable';
    
    srcPaper = ['#pizzaBox-obj'];
    srcTrash = ['#chipBag-obj'];
    srcCompost = ['#bananaPeel-obj'];
    
    materialPaper = [];
    materialtrash = ['#chip-texture'];
    materialCompost = [];

    positionX = '-5';
    positionY = '2';
    positionZ = '-3';
    scaleX = 0.5;
    scaleY = 0.5;
    scaleZ = 0.5;
    constructor(type, id){
        this.type = type;
        this.id = id;
    }
    
    generatingAttribute(){
        var trash = document.createElement('a-entity');
        trash.setAttribute('id', this.id);
        trash.setAttribute('class', this.classTrash);
        trash.setAttribute('geometry', 'primitive: box; depth: 1; height: 1; width: 1');
        trash.setAttribute('position', this.positionX , this.positionY, this.positionZ);
        trash.setAttribute('scale', '0.5 0.5 0.5');
        trash.setAttribute('animation', 'property: position; from: -9 1.5 0; to: 9 1.5 0; dur: 7000; easing: linear');
        trash.setAttribute('pick-up-object', '');
        return trash;
    }
    //GET THE PLASTIC MODELS
    generatingAttribute2(){
        var trash = document.createElement('a-entity');
        //Set random number for texture and models.
        var randomNum = Math.floor(Math.random() * 5);
        console.log("This is the type: " + this.type);
        switch(this.type){
            case 'plastic':
                trash.setAttribute('material', 'color: blue');
                //trash.setAttribute('obj-model', 'obj:');
                //trash.setAttribute('maetrial', 'src:');
                break;
            case 'metal':
                trash.setAttribute('material', 'color: red');
                //trash.setAttribute('obj-model', 'obj:');
                //trash.setAttribute('maetrial', 'src:');
                break;
            case 'compost':
                trash.setAttribute('material', 'color: green');
                //trash.setAttribute('obj-model', 'obj:');
                //trash.setAttribute('maetrial', 'src:');
                break;
            case 'paper':
                trash.setAttribute('material', 'color: yellow');
                //trash.setAttribute('obj-model', 'obj:');
                //trash.setAttribute('maetrial', 'src:');
                break;
            case 'trash':
                trash.setAttribute('material', 'color: grey');
                //trash.setAttribute('obj-model', 'obj:');
                //trash.setAttribute('maetrial', 'src:');
                break;
        }

        trash.setAttribute('id', this.id);
        trash.setAttribute('data-trash-type', this.type);
        trash.setAttribute('geometry', 'primitive: box; depth: 1; height: 1; width: 1');
        trash.setAttribute('class', this.classTrash);
        trash.setAttribute('position', this.positionX , this.positionY, this.positionZ);
        trash.setAttribute('scale', '0.5 0.5 0.5');
        trash.setAttribute('animation', 'property: position; from: -9 1.5 0; to: 9 1.5 0; dur: 7000; easing: linear');
        trash.setAttribute('pick-up-object', '');
        return trash;
    }
}