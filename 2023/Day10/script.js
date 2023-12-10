const fs = require("fs");
const data = fs.readFileSync("input.txt", "utf8");
const lines = data.split(/\r?\n/);
let result = [0, 0];

const directions = {
    "-": [[0, -1], [0, 1]],
    "|": [[-1, 0], [1, 0]],
    L: [[-1, 0], [0, 1]],
    J: [[0, -1], [-1, 0]],
    7: [[0, -1], [1, 0]],
    F: [[0, 1], [1, 0]],
    S: [[0, -1], [-1, 0], [0, 1], [1, 0]],
};

const listOfPositions = [];

const loopLength = (start, matrix) => {
    const queue = [start];
    const loop = [start];
    while (queue.length) {
        const currentNode = queue.shift();
        for (const [x, y] of directions[matrix[currentNode.i][currentNode.j].value]) {
            const lookUpRow = currentNode.i + x;
            const lookUpCol = currentNode.j + y;
            if (
                lookUpRow >= 0 &&
                lookUpRow < matrix.length &&
                lookUpCol >= 0 &&
                lookUpCol < matrix[lookUpRow].length &&
                matrix[lookUpRow][lookUpCol].value !== "." &&
                loop.every((e) => e.i !== lookUpRow || e.j !== lookUpCol)
            ) {
                const newPoint = { i: lookUpRow, j: lookUpCol };
                loop.push(newPoint);
                queue.push(newPoint);
                listOfPositions.push(newPoint);
            }
        }
    }
    return loop.length;
};

const matrix = lines.map((line) => line.trim().split("").map((e) => ({ value: e, distance: -1 })));
const start = matrix.flatMap((row, i) => row.map((cell, j) => ({ cell, i, j }))).find((item) => item.cell.value === "S");

result[0] = loopLength(start, matrix) / 2;
    
result.forEach((r, i) => console.log(`Part ${i + 1}:`, r));

