const fs = require('fs');
const data = fs.readFileSync('input.txt', 'UTF-8');
const lines = data.split(/\r?\n/);
let result = [0, 0];
const cR = 12, cG = 13, cBl = 14;

lines.forEach((line, nbGame) => {
    let maxR = 0, maxG = 0, maxBl = 0;
    const matches = [...line.match(/(\d*) red/g), ...line.match(/(\d*) green/g), ...line.match(/(\d*) blue/g)];
    matches.forEach(m => {
        const [_, nb, color] = /(\d*) (red|green|blue)/.exec(m);
        maxR = color === 'red' ? Math.max(maxR, nb) : maxR;
        maxG = color === 'green' ? Math.max(maxG, nb) : maxG;
        maxBl = color === 'blue' ? Math.max(maxBl, nb) : maxBl;
    });

    maxR <= cR && maxG <= cG && maxBl <= cBl ? result[0] += nbGame + 1 : null;
    result[1] += maxR * maxG * maxBl;
});
result.forEach((r, i) => console.log(`Part ${i + 1}:`, r));