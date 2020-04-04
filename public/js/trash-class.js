//CLASS FOR TRASH
class Trash{
    classTrash = 'clickable trash';
    
    srcPaper = ['#pizzaBox-obj'];
    srcTrash = ['#chipBag-obj'];
    srcCompost = ['#bananaPeel-obj'];
    
    materialPaper = [];
    materialtrash = ['#chip-texture'];
    materialCompost = [];

    /*positionX = '-5';
    positionY = '2';
    positionZ = '-3';*/
    scaleX = 0.5;
    scaleY = 0.5;
    scaleZ = 0.5;

    constructor(type, id){
        this.type = type;
        this.id = id;
    }
    
    //GET MODELS
    generateAttribute(){
        var trash = document.createElement('a-entity');
        //Set random number for texture and models.
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
        trash.setAttribute('position', '-10.5 1.3 0');
        trash.setAttribute('pick-up-object', '');
        trash.setAttribute('dynamic-body', '');
        return trash;
    }
}