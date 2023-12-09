const fs = require('fs');

const data = fs.readFileSync("input.txt", 'UTF-8');
const lines = data.split(/\r?\n/);
let result = [0, 0];

function extrapolate(sequence, forward) {
    while (sequence.some(x => x !== 0)) {
            for (let i = 0; i < sequence.length - 1; i++) {
                sequence[i] = sequence[i + 1] - sequence[i];
            }
            result[forward ? 0 : 1] += sequence.pop();
    }
}

lines.forEach((line) => {
    const sequence = line.split(' ').map(Number);
    extrapolate([...sequence], true);
    extrapolate([...sequence.reverse()], false);
});

result.forEach((r, i) => console.log(`Part ${i + 1}:`, r));
