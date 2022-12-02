const fs = require('fs')

// read contents of the file
const data = fs.readFileSync('input.txt', 'UTF-8')

// split the contents by new line
const lines = data.split(/\r?\n/);

const part2 = true;

let score = 0;
lines.forEach(l => {
    const jeu = l.split(' ');
    if (part2) jeu[1] = chooseGoodForm(jeu);
    scoreForm(jeu[1]);
    resultTour(jeu);
});


console.log(score);


function chooseGoodForm(jeu) {
    const valueEqual = {
        "A": "X",
        "B": "Y",
        "C": "Z",
    }
    const valueWin = {
        "A": "Y",
        "B": "Z",
        "C": "X",
    }
    const valueLost = {
        "A": "Z",
        "B": "X",
        "C": "Y",
    }
    switch (jeu[1]) {
        case "X": // ici on doit perdre
            return valueLost[jeu[0]];
        case "Y": // ici on doit match nul
            return valueEqual[jeu[0]];
        case "Z": // ici on doit win
            return valueWin[jeu[0]];
    }
}

function scoreForm(form) {
    switch (form) {
        case "X":
            score += 1;
            break;
        case "Y":
            score += 2;
            break;
        case "Z":
            score += 3;
            break;
    }
}

function resultTour(jeu) {
    if (jeu[0] == 'C' && jeu[1] == 'Z' || jeu[0] == 'B' && jeu[1] == 'Y' || jeu[0] == 'A' && jeu[1] == 'X') {
        score += 3;
    } else if (jeu[0] == 'C' && jeu[1] == 'X' || jeu[0] == 'A' && jeu[1] == 'Y' || jeu[0] == 'B' && jeu[1] == 'Z') {
        score += 6;
    } else {
        score += 0;
    }
}