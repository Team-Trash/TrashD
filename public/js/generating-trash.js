function gtFunction(){
    let trashID = 0;
    let trashDeletingID = 0;
    var trashType = ["plastic", "metal", "compost", "paper", "trash"];
    let trashes = [];
    var scene = document.getElementById('scene');
    generatingTrash = setInterval(generatingTrashFunction, 3000);
    //deletingTrash = setInterval(deletingTrashFunction, 8000);


    function generatingTrashFunction(){
        console.log(trashes);
        //Get the random number
        var randomNum = Math.floor(Math.random() * 4);
        switch(randomNum) {
            case 0:
                plasticTrash = new Trash('plastic', "trash" + trashID);
                trashes.push(plasticTrash.generatingAttribute2());
                scene.append(plasticTrash.generatingAttribute2());
                console.log("Plastic");
                break;
            case 1:
                metalTrash = new Trash('metal', "trash" + trashID);
                trashes.push(metalTrash.generatingAttribute2());
                scene.append(metalTrash.generatingAttribute2());
                console.log("Metal");
                break;
            case 2:
                compostTrash = new Trash('compost',"trash" + trashID);
                trashes.push(compostTrash.generatingAttribute2());
                scene.append(compostTrash.generatingAttribute2());
                console.log("Compost");
                break;
            case 3:
                paperTrash = new Trash('paper', "trash" + trashID);
                trashes.push(paperTrash.generatingAttribute2());
                scene.append(paperTrash.generatingAttribute2());
                console.log("Ppaer");
                break;
            case 4:
                trashTrash = new Trash('trash',"trash" + trashID);
                trashes.push(trashTrash.generatingAttribute2());
                scene.append(trashTrash.generatingAttribute2());
                console.log("Trash");
                break;
        }
        trashID += 1;
    }

    function deletingTrashFunction(){
        var trashDeleting = document.getElementById("trash" +trashDeletingID);
        trashDeleting.parentNode.removeChild(trashDeleting);
        trashDeletingID += 1;
    }

}
