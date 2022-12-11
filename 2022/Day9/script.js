const fs = require('fs');
// read contents of the file
const data = fs.readFileSync('input.txt', 'UTF-8');

const lines = data.split(/\r?\n/);

// cree un tableau en associant chaque deplacement avec son nombre de pas
const pas = lines.flatMap(line => {
    const [dir, count] = line.split(" ");
    return Array(Number(count)).fill(dir);
});

const PositionsVisitedResult1 = [[0, 0]];
const tete = [0, 0];
const queue = [0, 0];

// pour chaque deplacement, on calcule la nouvelle position de la tete
const moveTete = (tete, dir) => {
    switch (dir) {
        case "R":
            tete[0]++;
            break;
        case "L":
            tete[0]--;
            break;
        case "U":
            tete[1]++;
            break;
        case "D":
            tete[1]--;
            break;
    }
}

// pour chaque deplacement, on calcule la nouvelle position de la queue
const moveQueue = (tete, queue) => {
    const dx = tete[0] - queue[0];
    const dy = tete[1] - queue[1];
    if (dx == 0 && Math.abs(dy) == 2) {
        queue[1] += Math.abs(dy) / dy;
    }
    if (dy == 0 && Math.abs(dx) == 2) {
        queue[0] += Math.abs(dx) / dx;
    }
    if (Math.abs(dx) == 1 && Math.abs(dy) == 2) {
        queue[0] += Math.abs(dx) / dx;
        queue[1] += Math.abs(dy) / dy;
    }
    if (Math.abs(dy) == 1 && Math.abs(dx) == 2) {
        queue[0] += Math.abs(dx) / dx;
        queue[1] += Math.abs(dy) / dy;
    }
    if (Math.abs(dy) == 2 && Math.abs(dx) == 2) {
        queue[0] += Math.abs(dx) / dx;
        queue[1] += Math.abs(dy) / dy;
    }
}

const suivreQueue = (tail, PositionsVisited) => {
    if (!PositionsVisited.some(p => (p[0] == tail[0]) && (p[1] == tail[1]))) {
        PositionsVisited.push([...tail]);
    }
}

pas.forEach(dir => {
    moveTete(tete, dir);
    moveQueue(tete, queue);
    suivreQueue(queue, PositionsVisitedResult1);
})


const PositionVisitedResult2 = [[0, 0]];
const corde = Array(10).fill().map(() => [0, 0]);
pas.forEach(dir => {
    moveTete(corde[0], dir);
    corde.forEach((node, i) => {
        if (i > 0) {
            moveQueue(corde[i - 1], node)
        }
    });
    suivreQueue(corde[9], PositionVisitedResult2);
})


console.log("ResultPart1: ", PositionsVisitedResult1.length);
console.log("ResultPart2: ",PositionVisitedResult2.length);

