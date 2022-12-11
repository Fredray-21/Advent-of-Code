const fs = require('fs');
// read contents of the file
const data = fs.readFileSync('input.txt', 'UTF-8');

const lines = data.split(/\r?\n/);

let X = 1;
let nbCycle = 0;
const assos = {};

lines.forEach(line => {
    if (line === 'noop') {
        nbCycle++;
        assos[nbCycle] = X;
    } else {
        const V = parseInt(line.split(' ')[1]);
        nbCycle++;
        assos[nbCycle] = X;
        nbCycle++;
        assos[nbCycle] = X;
        X += V;
    }
});

const resultPart1 = Object.keys(assos).filter(key => key == 20 || key == 60 || key == 100 || key == 140 || key == 180 || key == 220).map(key => parseInt(key) * assos[key]).reduce((a, b) => a + b);

const resultPart2 = Object.values(assos).reduce((result, item, idx) => {
    const sprite = [item, item+2];
    result += (sprite[0] <= (idx%40 + 1) && (idx%40 + 1) <= sprite[1]) ? '# ' : '  ';
    if ((idx + 1)%40 === 0) {
        result += '\n';
    }
    return result;
}, '');

console.log("ResultPart1:", resultPart1);
console.log("ResultPart2:");
console.log(resultPart2);
// ELPLZGZL

