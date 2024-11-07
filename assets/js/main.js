const startContainer = document.querySelector("#start");
const gameContainer = document.querySelector("#game");
const winnerContainer = document.getElementById("winner");
const loserContainer = document.getElementById("loser");
const restartContainer = document.querySelector("#restart");
const logoContainer = document.getElementById("logo");
const logo2Container = document.getElementById("logo2");
let grid = [
    [2, 2, 2, 2, 2, 2, 0, 0, 0, 0],
    [2, 2, 2, 2, 2, 2, 0, 0, 0, 0],
    [2, 2, 2, 2, 2, 2, 0, 0, 0, 0],
    [2, 2, 2, 2, 2, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
]

let buttonStart = document.createElement("button");
buttonStart.textContent = "START";
startContainer.appendChild(buttonStart);
buttonStart.addEventListener("click", () => {
    resetGrid();
    updateGrid();
    gameContainer.classList.remove("hidden");
    startContainer.classList.add("hidden");
    restartContainer.classList.remove("hidden");
    logoContainer.classList.add("hidden");
    logo2Container.classList.remove("hidden");
    shootInterval = setInterval(moveShoot, 300);
    invaderInterval = setInterval(moveInvader, 500);
    moveDefender();
});

let buttonRestart = document.createElement("button");
buttonRestart.textContent = "RESTART";
restartContainer.appendChild(buttonRestart);
buttonRestart.addEventListener("click", () => {
    clearInterval(shootInterval);
    clearInterval(invaderInterval);
    resetGrid();
    updateGrid();
    gameContainer.classList.add("hidden");
    startContainer.classList.remove("hidden");
    restartContainer.classList.add("hidden");
    logoContainer.classList.remove("hidden");
    logo2Container.classList.add("hidden");
    winnerContainer.classList.add("hidden");
    loserContainer.classList.add("hidden");

});

function resetGrid() {
    grid = [
        [2, 2, 2, 2, 2, 2, 0, 0, 0, 0],
        [2, 2, 2, 2, 2, 2, 0, 0, 0, 0],
        [2, 2, 2, 2, 2, 2, 0, 0, 0, 0],
        [2, 2, 2, 2, 2, 2, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    ];
}



/////////////////////////////////////// fonction création division /////////////////////

function createDimension() {
    for (let i = 0; i < grid.length; i++) {
        let rowgrid = grid[i];
        for (let j = 0; j < rowgrid.length; j++) {
            let gridGame = document.createElement("div")
            gameContainer.appendChild(gridGame);

            switch (grid[i][j]) {
                case 1:
                    let defender = document.createElement("img");
                    defender.src = "./assets/images/defender.png";
                    gridGame.appendChild(defender);
                    break;

                case 2:
                    let invader = document.createElement("img");
                    invader.src = "./assets/images/invader.png";
                    gridGame.appendChild(invader);
                    break;

                case 3:
                    let shoot = document.createElement("img");
                    shoot.src = "./assets/images/shoot.png";
                    gridGame.appendChild(shoot);
                    break;

                case 0:
                    let vide = document.createElement("div");
                    vide.textContent = "";
                    gridGame.appendChild(vide);
                    break;

                default:
                    break;
            }
        }
    }
}

//////////////////////////////////  créer le tire //////////////////

document.addEventListener("keyup", function (event) {
    let floor = grid[grid.length - 1];
    let positionDefender = floor.indexOf(1);

    if (event.code === "Space") {
        grid[grid.length - 2][positionDefender] = 3;
        updateGrid();
    }
});

////////////////////////////////// Fonction bouger le defender //////////////////

function moveDefender() {
    document.addEventListener("keyup", function (event) {
        let floor = grid[grid.length - 1];
        let positionDefender = floor.indexOf(1);

        if (event.key === "ArrowLeft" && positionDefender > 0) {
            floor[positionDefender] = 0;
            floor[positionDefender - 1] = 1;
        }
        else if (event.key === "ArrowRight" && positionDefender < floor.length - 1) {
            floor[positionDefender] = 0;
            floor[positionDefender + 1] = 1;
        }
        // Mise à jour visuelle de la grille
        updateGrid();
    });
}

////////////////////////////////// Fonction bouger le tire //////////////////

function moveShoot() {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] === 3) {
                grid[i][j] = 0;
                if (grid[i - 1]) {
                    if (grid[i - 1][j] == 0) {
                        grid[i - 1][j] = 3;
                    } else if (grid[i - 1][j] == 2) {
                        grid[i - 1][j] = 0;
                    }
                }
            }
        }
    }
    updateGrid();
}

////////////////////////////////// Fonction bouger l'invader //////////////////

let movingRight = true; // Variable pour la direction actuelle des envahisseurs

function moveInvader() {
    if (movingRight) {
        if (checkRightLimit()) {  // Si les envahisseurs sont au bord droit
            moveDownInvader();    // Descend d'une ligne
            movingRight = false;  // Change de direction vers la gauche
        } else {
            moveRightInvader();   // Continue vers la droite
        }
    } else {
        if (checkLeftLimit()) {   // Si les envahisseurs sont au bord gauche
            moveDownInvader();    // Descend d'une ligne
            movingRight = true;   // Change de direction vers la droite
        } else {
            moveLeftInvader();    // Continue vers la gauche
        }
    }
}

// Bouge vers la droite
function moveRightInvader() {
    for (let i = grid.length - 1; i >= 0; i--) {
        for (let j = grid[i].length - 1; j >= 0; j--) {
            if (grid[i][j] === 2) {
                grid[i][j] = 0;
                if (grid[j + 1]) {
                    if (grid[i][j + 1] == 0) {
                        grid[i][j + 1] = 2;
                    }else if (grid[i][j + 1] == 1) {
                        grid[i][j + 1] = 2;
                    }
                }
            }
        }
    }
    updateGrid()
}

// Vérifie si les envahisseurs sont au bord droit
function checkRightLimit() {
    for (let i = 0; i < grid.length; i++) {
        if (grid[i][grid[i].length - 1] === 2) {
            return true;
        }
    }
    return false;
}

// Bouge vers la gauche
function moveLeftInvader() {
    for (let i = grid.length - 1; i >= 0; i--) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] === 2) {
                grid[i][j] = 0;
                if (grid[j - 1]) {
                    if (grid[i][j - 1] == 0) {
                        grid[i][j - 1] = 2;
                    } else if (grid[i][j - 1] == 1) {
                        grid[i][j - 1] = 2;
                    }
                }
            }
        }
    }
    updateGrid();
}

// Vérifie si les envahisseurs sont au bord gauche
function checkLeftLimit() {
    for (let i = 0; i < grid.length; i++) {
        if (grid[i][0] === 2) {
            return true;
        }
    }
    return false;
}

// Bouge vers le bas
function moveDownInvader() {
    for (let i = grid.length - 1; i >= 0; i--) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] === 2) {
                grid[i][j] = 0;
                if (grid[i - 1]) {
                    if (grid[i + 1][j] == 0) {
                        grid[i + 1][j] = 2;
                    } else if (grid[i + 1][j] == 1) {
                        grid[i + 1][j] = 2;
                }
            }
        }
    }
    updateGrid();
}

//////////////////////////////////// Fonction Fin de Game /////////////////

// Fonction pour vérifier la condition de victoire
function checkWinCondition() {
    // Parcours toute la grille pour voir s'il reste des envahisseurs (2)
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] === 2) {
                return false; // Si on trouve un envahisseur, le jeu continue
            }
        }
    }
    // Si aucun envahisseur n'est trouvé, la condition de victoire est atteinte
    return true;
}

// Fonction pour vérifier la condition de défaite
function chekLoseCondition() {
    
}


// Fonction pour arrêter le jeu en affichant l'écran de victoire
function stopGame() {
    gameContainer.classList.add("hidden");
    winnerContainer.classList.remove("hidden");
}

//////////////////////////////////// Fonction éfface la grid actuel ///////////

function updateGrid() {
    gameContainer.innerHTML = "";
    createDimension();

    // Vérifie si la condition de victoire est atteinte après chaque mise à jour de la grille
    if (checkWinCondition()) {
        stopGame(); // Arrête le jeu et affiche l'écran de victoire si gagné
    }
}