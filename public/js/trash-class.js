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
        trash.setAttribute('animation', 'property: position; from: -9 0.8 0; to: 9 0.8 0; dur: 7000; easing: linear');
        trash.setAttribute('pick-up-object', '');
        return trash;
    }
    //GET MODELS
    generatingAttribute2(){
        var trash = document.createElement('a-entity');
        //Set random number for texture and models.
        var randomNum = Math.floor(Math.random() * 5);
        //console.log("This is the type: " + this.type);
        switch(this.type){
            case 'plastic':
                trash.setAttribute('material', 'src:#bottle-texture');
                trash.setAttribute('obj-model', 'obj:#bottle-obj');
                trash.setAttribute('scale', '0.1 0.1 0.1');
                break;
            case 'metal':
                trash.setAttribute('material', 'src:#cola-texture');
                trash.setAttribute('obj-model', 'obj:#colaCan-obj');
                trash.setAttribute('scale', '0.1 0.1 0.1');
                break;
            case 'compost':
                trash.setAttribute('material', 'src:#banana-texture');
                trash.setAttribute('obj-model', 'obj:#bananaPeel-obj');
                trash.setAttribute('scale', '0.02 0.02 0.02');
                break;
            case 'paper':
                trash.setAttribute('material', 'src:#pizza2-texture');
                trash.setAttribute('obj-model', 'obj:#pizzaBox-obj');
                trash.setAttribute('scale', '0.1 0.1 0.1');
                break;
            case 'trash':
                trash.setAttribute('material', 'color: grey');
                trash.setAttribute('obj-model', 'obj:#plasticBag-obj');
                trash.setAttribute('scale', '0.1 0.1 0.1');
                break;
        }

        trash.setAttribute('id', this.id);
        trash.setAttribute('data-trash-type', this.type);
        trash.setAttribute('class', this.classTrash);
        trash.setAttribute('position', this.positionX , this.positionY, this.positionZ);
        trash.setAttribute('animation', 'property: position; from: -9 1.27 0; to: 9 1.27 0; dur: 7000; easing: linear');
        trash.setAttribute('pick-up-object', '');
        return trash;
    }
}