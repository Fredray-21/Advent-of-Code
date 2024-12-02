const fs = require('fs');
const data = fs.readFileSync('input.txt', 'UTF-8');
const lines = data.split(/\r?\n/).map(line => line.match(/\d+/g).map(Number));
let result = [0, 0];

const isSafe = (row) => {
    const diffs = row.slice(1).map((val, i) => val - row[i]);
    const isAscending = diffs.every(diff => diff >= 1 && diff <= 3);
    const isDescending = diffs.every(diff => diff <= -1 && diff >= -3);
    return isAscending || isDescending;
};

const isSafeWithOneRemoval = (row) => row.some((_, idx) => isSafe(row.slice(0, idx).concat(row.slice(idx + 1))));

result[0] = lines.filter(isSafe).length;
result[1] = lines.filter(row => isSafe(row) || isSafeWithOneRemoval(row)).length;

result.forEach((r, i) => console.log(`Part ${i + 1}:`, r));
