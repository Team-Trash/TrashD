//CLASS FOR CONVEYOR
class Conveyor{
    constructor(x, s, collider){
        this.initX = x;
        this.speed = s;
        this.id = makeid(5);
        this.object3D = this.generateElement(this.id, collider);
    }
    //GENERATING FUNCTION
    generateElement(id, collider){
        let ingame = document.getElementById('conveyorContainer');
        let element = document.createElement('a-entity');
        let ridge = [];

        element.setAttribute('id', id);
        element.setAttribute('class', "conveyor");

        for(var i = 0; i < 15; i += 2) {
            ridge[i] = document.createElement('a-entity');
            ridge[i].setAttribute("geometry", "primitive: box; height: 0.5; width: 1; depth: 0.9"); 
            var j = i - 7;
            ridge[i].setAttribute("position", j + " 0 0");
            ridge[i].setAttribute("material", "color: #555");
            if(collider == true){
                ridge[i].setAttribute("static-body", "");
            }
            
            element.append(ridge[i]);
        }

        element.setAttribute('animation',"property: position; from: " + this.initX + " 1.070 0; to: 16 1.070 0; dur: " + this.speed + "; easing: linear");
        ingame.append(element);

        return element.object3D;
    }
}