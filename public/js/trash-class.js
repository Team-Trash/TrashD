//CLASS FOR TRASH
class Trash{
    constructor(x, y, z){
        this.id = makeid(5);
        this.object3D = this.generateElement(x, y, z);
    }
    
    //GET MODELS
    generateElement(x , y, z){
        let scene = document.getElementById('scene');
        var trash = document.createElement('a-entity');

        var randomNum = Math.floor(Math.random() * 5);
        //CHECK WITH TYPES OF TRASH IS IT
        switch(randomNum){
            case 0:
                trash.setAttribute('material', 'src:#bottle-texture');
                trash.setAttribute('obj-model', 'obj:#bottle-obj');
                trash.setAttribute('scale', '0.1 0.1 0.1');
                trash.setAttribute('data-trash-type', 'plastic');
                trash.setAttribute('pick-up-object', 'scoreValue: 15');
                break;
            case 1:
                trash.setAttribute('material', 'src:#cola-texture');
                trash.setAttribute('obj-model', 'obj:#colaCan-obj');
                trash.setAttribute('scale', '0.1 0.1 0.1');
                trash.setAttribute('data-trash-type', 'metal');
                trash.setAttribute('pick-up-object', 'scoreValue: 15');
                break;
            case 2:
                trash.setAttribute('material', 'src:#banana-texture');
                trash.setAttribute('obj-model', 'obj:#bananaPeel-obj');
                trash.setAttribute('scale', '0.02 0.03 0.02');
                trash.setAttribute('data-trash-type', 'compost');
                trash.setAttribute('pick-up-object', 'scoreValue: 20');
                break;
            case 3:
                trash.setAttribute('material', 'src:#pizza2-texture');
                trash.setAttribute('obj-model', 'obj:#pizzaBox-obj');
                trash.setAttribute('scale', '0.06 0.06 0.06');
                trash.setAttribute('data-trash-type', 'paper');
                trash.setAttribute('pick-up-object', '');
                break;
            case 4:
                trash.setAttribute('material', 'color: grey');
                trash.setAttribute('obj-model', 'obj:#plasticBag-obj');
                trash.setAttribute('scale', '0.07 0.07 0.07');
                trash.setAttribute('data-trash-type', 'trash');
                trash.setAttribute('pick-up-object', '');
                break;
        }
        
        //SET INITAL ATTRIBUTE FOR THE TRASH
        trash.setAttribute('id', this.id);
        trash.setAttribute('class', 'clickable trash');
        trash.setAttribute('position', x + " " + y + " " + z);
        trash.setAttribute('dynamic-body', '');
        scene.append(trash);

        return trash.object3D;
    }
}

//MAKE ID FUNCTION
function makeid(length){
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

 function checkId(trash){
    return trash.id == this;
 }