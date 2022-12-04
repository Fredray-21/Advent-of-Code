const fs = require('fs')

// read contents of the file
const data = fs.readFileSync('input.txt', 'UTF-8')

// split the contents by new line
const lines = data.split(/\r?\n/);

let resultPart1 = 0;
let resultPart2 = 0;
function range(start, end) {
    return Array(end - start + 1).fill().map((_, idx) => start + idx)
}
lines.forEach((line) => {
        const value = line.split(',').map((v) => v.split('-').map(Number));
        const range1 = range(value[0][0], value[0][1]);
        const range2 = range(value[1][0], value[1][1]);
        const max_size = Math.max(range1.length, range2.length);

        const array_unique = [...new Set([...range1, ...range2])];
        if (array_unique.length === max_size) {
            resultPart1++;
        }

        const intersection = range1.filter(x => range2.includes(x));
        if (intersection.length !== 0) {
            resultPart2++;
        }
    }
);

console.log("Part 1: " + resultPart1);
console.log("Part 2: " + resultPart2);
