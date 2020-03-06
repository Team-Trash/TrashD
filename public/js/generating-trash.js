function gtFunction(){
    var trashType = ["plastic", "metal", "compost", "paper", "trash", "glass"];
    var scene = document.getElementById('scene');
    generatingTrash = setInterval(generatingTrashFunction, 3000);


    function generatingTrashFunction(){
        //console.log("Trash generating");
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
