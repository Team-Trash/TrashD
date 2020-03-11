function gtFunction(){
    var trashType = ["plastic", "metal", "compost", "paper", "trash", "glass"];
    var scene = document.getElementById('scene');
    generatingTrash = setInterval(generatingTrashFunction, 3000);


    function generatingTrashFunction(){
        //Get the random number
        var randomNum = Math.floor(Math.random() * 60);
        if(0 < randomNum < 10){
            console.log("1 to 10");
        }
        else if(10 < randomNum < 20){
            console.log("10 to 20");
        }
        else if(20 < randomNum < 30){
            console.log("20 to 30");
        }
        else if(30 < randomNum < 40){
            console.log("30 to 40");
        }
        else if(40 < randomNum < 50){
            console.log("40 to 50");
        }
        else if(50 < randomNum < 60){
            console.log("50 to 60");
        }
        var trash = document.createElement('a-entity');
        trash.setAttribute('class', 'clickable');
        trash.setAttribute('geometry', 'primitive: box; depth: 1; height: 1; width: 1');
        trash.setAttribute('position', '-5 2 -3');
        trash.setAttribute('scale', '0.5 0.5 0.5');
        trash.setAttribute('rotation', '0 0 0');
        trash.setAttribute('animation', 'property: position; from: -5.5 1 -3; to: 7 1 -3; dur: 7000; easing: linear');
        trash.setAttribute('pick-up-object', '');

        scene.append(trash);
        //REMOVE THIS SO IT CAN CONTINUELY ADDING NEW TRASH
        //clearInterval(generatingTrash);
    }
}
