function setupMultiplePlayer(){
    var singlePlayerRoom = document.getElementById("ingame");
    var floor = document.createElement('a-entity');

    var multiplayerRoom = document.getElementById("ingame");
    var floor = document.createElement('a-entity');
    var conveyor = document.createElement('a-entity');
    var plasticBin = document.createElement('a-entity');
    var paperBin = document.createElement('a-entity');
    var metalBin = document.createElement('a-entity');
    var trashBin = document.createElement('a-entity');
    var compostBin = document.createElement('a-entity');

    floor.setAttribute('id', 'cube');
    floor.setAttribute('class', 'clickable');
    floor.setAttribute('geometry', 'primitive:box; depth: 1; height: 1; width: 1');
    floor.setAttribute('position', '0 2 -3');
    floor.setAttribute('scale', '0.5 0.5 0.5');
    floor.setAttribute('rotation', '0 0 0');
    floor.setAttribute('dynamic-body');
    floor.setAttribute('pick-up-object');

    conveyor.setAttribute('id', 'conveyor');
    conveyor.setAttribute('geometry', 'primitive: box; depth: 1; height: 1.5; width: 12');
    conveyor.setAttribute('material', 'color: #454545');
    conveyor.setAttribute('position', '0 0 -3');
    conveyor.setAttribute('rotation', '0 0 0');
    conveyor.setAttribute('static-body');

    plasticBin.setAttribute('id', 'plastic-bin');
    plasticBin.setAttribute('geometry', 'primitive: box; depth: 1; height: 1; width: 1');
    plasticBin.setAttribute('material', 'color: #229FFF');
    plasticBin.setAttribute('position', '0 0 -1.5');
    plasticBin.setAttribute('static-body');

    paperBin.setAttribute('id', 'paper-bin');
    paperBin.setAttribute('geometry', 'primitive: box; depth: 1; height: 1; width: 1');
    paperBin.setAttribute('material', 'color: #AE3030');
    paperBin.setAttribute('position', '2 0 -1.5');
    paperBin.setAttribute('static-body');

    metalBin.setAttribute('id', 'metal-bin');
    metalBin.setAttribute('geometry', 'primitive: box; depth: 1; height: 1; width: 1');
    metalBin.setAttribute('material', 'color: #E5E4E4');
    metalBin.setAttribute('position', '-2 0 -1.5');
    metalBin.setAttribute('static-body');

    trashBin.setAttribute('id', 'trash-bin');
    trashBin.setAttribute('geometry', 'primitive: box; depth: 1; height: 1; width: 1');
    trashBin.setAttribute('material', 'color: #000000');
    trashBin.setAttribute('position', '-4 0 -1.5');
    trashBin.setAttribute('static-body');

    compostBin.setAttribute('id', 'compost-bin');
    compostBin.setAttribute('geometry', 'primitive: box; depth: 1; height: 1; width: 1');
    compostBin.setAttribute('material', 'color: #39B54A');
    compostBin.setAttribute('position', '4 0 -1.5');
    compostBin.setAttribute('static-body');

    singlePlayerRoom.append(floor);
    singlePlayerRoom.append(conveyor);
    singlePlayerRoom.append(plasticBin);
    singlePlayerRoom.append(paperBin);
    singlePlayerRoom.append(metalBin);
    singlePlayerRoom.append(trahsBin);
    singlePlayerRoom.append(compostBin);
    singlePlayerRoom.append(trashBin);
}