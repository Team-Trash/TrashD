function gtFunction(){
    let trashID = 0;
    let trashDeletingID = 0;
    var trashType = ["plastic", "metal", "compost", "paper", "trash", "glass"];
    let trashes = [];
    var scene = document.getElementById('scene');
    generatingTrash = setInterval(generatingTrashFunction, 3000);
    deletingTrash = setInterval(deletingTrashFunction, 10000);


    function generatingTrashFunction(){
        //Get the random number
        var randomNum = Math.floor(Math.random() * 5);
        switch(randomNum) {
            case 0:
                plasticTrash = new Trash('plastic', "trash" + trashID);
                trashes.push(plasticTrash.generatingAttribute());
                scene.append(plasticTrash.generatingAttribute());
                break;
            case 1:
                metalTrash = new Trash('metal', "trash" + trashID);
                trashes.push(metalTrash.generatingAttribute());
                scene.append(metalTrash.generatingAttribute());
                break;
            case 2:
                compostTrash = new Trash('compost',"trash" + trashID);
                trashes.push(compostTrash.generatingAttribute());
                scene.append(compostTrash.generatingAttribute());
                break;
            case 3:
                paperTrash = new Trash('paper', "trash" + trashID);
                trashes.push(paperTrash.generatingAttribute());
                scene.append(paperTrash.generatingAttribute());
                break;
            case 4:
                trashTrash = new Trash('trash',"trash" + trashID);
                trashes.push(trashTrash.generatingAttribute());
                scene.append(trashTrash.generatingAttribute());
                break;
            case 5:
                glassTrash = new Trash('glass',"trash" + trashID);
                trashes.push(glassTrash.generatingAttribute());
                scene.append(glassTrash.generatingAttribute());
                break;
        }
        trashID += 1;

        //var trash = document.createElement('a-entity');
        //trash.setAttribute('class',trashes[0].classTrash);
        //trash.setAttribute('geometry', 'primitive: box; depth: 1; height: 1; width: 1');
        //trash.setAttribute('position', trashes[0].positionX , trashes[0].positionY, trashes[0].positionZ);
        //trash.setAttribute('scale', '0.5 0.5 0.5');
        //trash.setAttribute('animation', 'property: position; from: -5.5 1 -3; to: 7 1 -3; dur: 7000; easing: linear');
        //trash.setAttribute('pick-up-object', '');

        //scene.append(trashes[0]);
        //console.log(trash);
        //REMOVE THIS SO IT CAN CONTINUELY ADDING NEW TRASH
        //clearInterval(generatingTrash);
    }

    function deletingTrashFunction(){
        var trashDeleting = document.getElementById("trash" +trashDeletingID);
        trashDeleting.parentNode.removeChild(trashDeleting);
        trashDeletingID += 1;
    }

}
