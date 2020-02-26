function setup(){
    var scene = document.getElementById('scene');

}

function update(){
    //For 1s create trash
    setInterval('generatingTrash', 1000);

    function generatingTrash(){
        console.log("Test")
        scene.append();
    }
}

