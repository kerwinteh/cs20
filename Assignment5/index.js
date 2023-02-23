let playerTurn;
let currentPlayer;
let takenBoxes;
let button;

window.onload = function () {
    button = document.getElementById("btn");
    button.onclick = function () {
        window.location.reload();
    }
    button.style.display = "none";
    playerTurn = document.getElementById("turn");
    currentPlayer = "X";
    //set all boxes to empty string, will be replaced when filled
    takenBoxes = new Array(9).fill('');

    //create grid
    let grid = document.getElementById("table");
    for(let i = 0; i < 3; i++) {
        let row = document.createElement('div');
        for(let j = 0; j < 3; j++) {
            let cell = document.createElement('button');
            cell.className = 'grid';
            let idNum = i*3 + j;
            cell.id = ''+ idNum;
            cell.onclick =  function () {myClick(cell.id)};
            row.append(cell);
        }
        grid.append(row);
    }
}


function myClick (id){
    //when game ends, user will not be able to click anywhere
    if(checkWinner() || isGridFull()){
        return;
    }

    //to fill in grids
    if(takenBoxes[id] === ''){
        if(currentPlayer === 'X') {
            document.getElementById(id).innerHTML = currentPlayer;
            takenBoxes[id] = currentPlayer;
            playerTurn.innerHTML = 'Player O turn';
            if(checkWinner()){
                playerTurn.innerHTML = currentPlayer + " wins!";
                button.style.display = "block";
            }
            if(!checkWinner() && isGridFull()) {
                playerTurn.innerHTML = "DRAW";
                button.style.display = "block";
            }
            currentPlayer = 'O';
        } else {
            document.getElementById(id).innerHTML = currentPlayer;
            takenBoxes[id] = currentPlayer;
            playerTurn.innerHTML = 'Player X turn';
            if(checkWinner()){
                playerTurn.innerHTML = currentPlayer + " wins!";
                button.style.display = "block";
            }
            if(!checkWinner() && isGridFull()) {
                playerTurn.innerHTML = "DRAW";
                button.style.display = "block";
            }
            currentPlayer = 'X';
        }
    }
}

function checkWinner(){
    return takenBoxes[0] !== '' && takenBoxes[0] === takenBoxes[1] && takenBoxes[1] === takenBoxes[2] ||
        takenBoxes[3] !== '' && takenBoxes[3] === takenBoxes[4] && takenBoxes[4] === takenBoxes[5] ||
        takenBoxes[6] !== '' && takenBoxes[6] === takenBoxes[7] && takenBoxes[7] === takenBoxes[8] ||
        takenBoxes[0] !== '' && takenBoxes[0] === takenBoxes[3] && takenBoxes[3] === takenBoxes[6] ||
        takenBoxes[1] !== '' && takenBoxes[1] === takenBoxes[4] && takenBoxes[4] === takenBoxes[7] ||
        takenBoxes[2] !== '' && takenBoxes[2] === takenBoxes[5] && takenBoxes[5] === takenBoxes[8] ||
        takenBoxes[0] !== '' && takenBoxes[0] === takenBoxes[4] && takenBoxes[4] === takenBoxes[8] ||
        takenBoxes[2] !== '' && takenBoxes[2] === takenBoxes[4] && takenBoxes[4] === takenBoxes[6];
}

function isGridFull(){
    for(let i = 0; i < 9; i++){
        if(takenBoxes[i] === ''){
            return false;
        }
    }
    return true;
}



