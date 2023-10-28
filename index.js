const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");


let currentplayer;
let gameGrid;
const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


// let's creat a function to initialise the game

function initGame() {
    currentplayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    boxes.forEach((box, index) => {
        boxes[index].innerText = "";
        boxes[index].style.pointerEvents = "all";
        newGameBtn.classList.remove("active");
        box.classList = `box box${index+1}`;
    });
    gameInfo.innerText = `Current Player - ${currentplayer}`;
}

initGame();

function swapTurn() {
    if (currentplayer === "X") {
        currentplayer = "O";
    }
    else {
        currentplayer = "X";
    }

    // UI update
    gameInfo.innerText = `Current Player - ${currentplayer}`;
}

function checkGameOver() {
    let answer = "";
    // all boxes are should not be empty and should have be same value
    winningPositions.forEach((position) => {
        if ((gameGrid[position[0]] !== "" && gameGrid[position[1]] !== "" && gameGrid[position[1]] !== "")
            && gameGrid[position[0]] === gameGrid[position[1]] && gameGrid[position[0]] === gameGrid[position[2]]) {
            // check if winner is X
            if (gameGrid[position[0]] === "X")
                answer = "X";
            else
                answer = "O";

            // disable pointer events
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            });

            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });

    // it means we have a winner

    if (answer !== "") {
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }

    // when there is no winner
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if (box !== "")
            fillCount++;
    });
    if (fillCount === 9) {
        gameInfo.innerText = `Game Tied!`;
        newGameBtn.classList.add("active");
    }
}


function handleClick(index) {
    if (gameGrid[index] === "") {
        boxes[index].innerText = currentplayer;
        gameGrid[index] = currentplayer;
        boxes[index].style.pointerEvents = "none";
        // swap karo turn ko
        swapTurn();
        // ckeck winning
        checkGameOver();
    }
}

boxes.forEach((box, index) => {
    box.addEventListener('click', () => {
        handleClick(index);
    });
});

newGameBtn.addEventListener("click", initGame);
