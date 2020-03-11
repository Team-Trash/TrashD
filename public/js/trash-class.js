class Trash{
    classTrash = 'clickable';
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
        trash.setAttribute('animation', 'property: position; from: -5.5 1 -3; to: 7 1 -3; dur: 7000; easing: linear');
        trash.setAttribute('pick-up-object', '');
        return trash;
    }
}