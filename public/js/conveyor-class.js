//CLASS FOR CONVEYOR
class Conveyor{

    constructor(x, s){
        this.initX = x;
        this.speed = s;
    }

    generateElement(){
        let element = document.createElement('a-entity');
        let belt = document.createElement('a-entity');
        let ridge = [];

        element.setAttribute('class', "conveyor");

        belt.setAttribute("geometry", "primitive: box; height: 0.160; width: 16");
        belt.setAttribute("material", "color: green");
        belt.setAttribute("static-body", "");
        element.append(belt);

        for(var i = 0; i < 15; i += 2) {
            ridge[i] = document.createElement('a-entity');
            ridge[i].setAttribute("geometry", "primitive: box; height: 0.5; width: 1"); 
            var j = i - 7;
            ridge[i].setAttribute("position", j + " 0 0");
            ridge[i].setAttribute("material", "color: blue");
            ridge[i].setAttribute("static-body", "");
            
            element.append(ridge[i]);
        }

        element.setAttribute('animation',"property: position; from: " + this.initX + " 1.070 0; to: 16 1.070 0; dur: " + this.speed + "; easing: linear");
        return element;
    }
}