const board = document.getElementById("board");
const statusText = document.getElementById("status");
const resetBtn = document.getElementById("resetBtn");
const wizardSound = document.getElementById("wizardSound");
const dragonSound = document.getElementById("dragonSound");
const winSound = document.getElementById("winSound");

let currentPlayer = "x";
let gameActive = true;
let cells = [];

const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function createBoard() {
    board.innerHTML = "";
    cells = [];
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.addEventListener("click", () => makeMove(i));
        board.appendChild(cell);
        cells.push(cell);
    }
}

function makeMove(index) {
    if (!gameActive || cells[index].classList.contains("x") || cells[index].classList.contains("o")) return;

    cells[index].classList.add(currentPlayer);
    playSound(currentPlayer);

    if (checkWin()) {
        statusText.textContent = `🏆 ${currentPlayer === "x" ? "Wizard" : "Dragon"} Wins the Realm!`;
        winSound.play();
        gameActive = false;
        return;
    }

    if (checkDraw()) {
        statusText.textContent = "😐 It's a Tie of Legends!";
        return;
    }

    currentPlayer = currentPlayer === "x" ? "o" : "x";
    statusText.textContent = `${currentPlayer === "x" ? "🧙‍♂️ Wizard's" : "🐉 Dragon's"} Turn`;
}

function checkWin() {
    for (let condition of winConditions) {
        const [a, b, c] = condition;
        if (
            cells[a].classList.contains(currentPlayer) &&
            cells[b].classList.contains(currentPlayer) &&
            cells[c].classList.contains(currentPlayer)
        ) {
            cells[a].classList.add("winning");
            cells[b].classList.add("winning");
            cells[c].classList.add("winning");
            return true;
        }
    }
    return false;
}

function checkDraw() {
    return cells.every(cell => cell.classList.contains("x") || cell.classList.contains("o"));
}

function playSound(player) {
    if (player === "x") wizardSound.play();
    else dragonSound.play();
}

resetBtn.addEventListener("click", () => {
    gameActive = true;
    currentPlayer = "x";
    statusText.textContent = "🧙‍♂️ Wizard's Turn";
    createBoard();
});

createBoard();