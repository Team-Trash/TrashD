function gtFunction(){
    let trashID = 0;
    let trashDeletingID = 0;
    let trashes = [];
    var scene = document.getElementById('scene');
    //READ GENERATING TRASH
    generatingTrash = setInterval(generatingTrashFunction, 3000);
    //deletingTrash = setInterval(deletingTrashFunction, 8000);


    function generatingTrashFunction(){
        //Get the random number
        var randomNum = Math.floor(Math.random() * 4);
        switch(randomNum) {
            case 0:
                plasticTrash = new Trash('plastic', "trash" + trashID);
                trashes.push(plasticTrash.generatingAttribute2());
                scene.append(plasticTrash.generatingAttribute2());
                break;
            case 1:
                metalTrash = new Trash('metal', "trash" + trashID);
                trashes.push(metalTrash.generatingAttribute2());
                scene.append(metalTrash.generatingAttribute2());
                break;
            case 2:
                compostTrash = new Trash('compost',"trash" + trashID);
                trashes.push(compostTrash.generatingAttribute2());
                scene.append(compostTrash.generatingAttribute2());
                break;
            case 3:
                paperTrash = new Trash('paper', "trash" + trashID);
                trashes.push(paperTrash.generatingAttribute2());
                scene.append(paperTrash.generatingAttribute2());
                break;
            case 4:
                trashTrash = new Trash('trash',"trash" + trashID);
                trashes.push(trashTrash.generatingAttribute2());
                scene.append(trashTrash.generatingAttribute2());
                break;
        }
        trashID += 1;
    }

    function deletingTrashFunction(){
        var trashDeleting = document.getElementById("trash" +trashDeletingID);
        
        setTimeout(function() {
            trashDeleting.parentNode.removeChild(trashDeleting);
        }, 0);

        trashDeletingID += 1;
    }
}