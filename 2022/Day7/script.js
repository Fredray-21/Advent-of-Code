const fs = require('fs');
// read contents of the file
const data = fs.readFileSync('input.txt', 'UTF-8');

const lines = data.split(/\r?\n/);

let pc = [];
let size_pc = [];

lines.forEach(line => {
    if (line.includes("$ cd")) {
        const w = line.split(' ');
        if (w[2] == '/') {
            pc.push("/");
        } else if (w[2] == '..') {
            pc.pop();
        } else {
            let d = w[2];
             pc[pc.length - 1] != "/" ? pc.push(pc[pc.length - 1] + '/' + d) : pc.push(pc[pc.length - 1] + d);
        }
    }

    let number = line.split(' ')[0]
    if (!isNaN(number)) {
        pc.forEach(dir => {
            size_pc[dir] == undefined ? size_pc[dir] = parseInt(number) : size_pc[dir] += parseInt(number);
        })
    }
});

const resultPart1 = Object.values(size_pc).filter(v => v <= 100000).reduce((a, b) => a + b);
const resultPart2 = Math.min.apply(Math,Object.values(size_pc).filter(v => v >= 30_000_000 - (70_000_000 - size_pc['/'])));
console.log("Result part1 :", resultPart1);
console.log("Result part2 :", resultPart2);

