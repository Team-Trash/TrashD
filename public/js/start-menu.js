//START MENU
function setupStartMenu(){
    console.log("START MENU CREATED")
    var startMenu = document.getElementById('startMenu');
    var trashLogo = document.createElement('a-image');
    var singePlayer = document.createElement('a-image');
    var multiplePlayer = document.createElement('a-image');

    trashLogo.setAttribute('class', 'menu');
    trashLogo.setAttribute('src', '#logo');
    trashLogo.setAttribute('position', '0 1 -2');
    trashLogo.setAttribute('width', '3.7');
    trashLogo.setAttribute('height', '1');
    trashLogo.setAttribute('scale', '0.8 0.8 0.8');

    singePlayer.setAttribute('class', 'menu');
    singePlayer.setAttribute('src', '#start-button');
    singePlayer.setAttribute('position', '-0.8 0 -2');
    singePlayer.setAttribute('width', '1.2');
    singePlayer.setAttribute('height', '0.5');

    multiplePlayer.setAttribute('class', 'menu');
    multiplePlayer.setAttribute('src', '#start-button');
    multiplePlayer.setAttribute('position', '0.8 0 -2');
    multiplePlayer.setAttribute('width', '1.2');
    multiplePlayer.setAttribute('height', '0.5');

    startMenu.append(trashLogo);
    startMenu.append(singePlayer);
    startMenu.append(multiplePlayer);
}