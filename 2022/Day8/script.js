const fs = require('fs');
// read contents of the file
const data = fs.readFileSync('input.txt', 'UTF-8');

const lines = data.split(/\r?\n/);

let l = lines.map(v => v.split(''))
let col = [];
let resultPart2 = [];
let forest = [];
let temp = [];
lines.forEach((_, index) => {
    lines.forEach(item => {
        temp.push(item.split('')[index]);
    });
    col.push(temp);
    temp = [];
});

let resultPart1 = (l[0].length - 2) * 2 + col[0].length * 2;

for (let i = 1; i < l.length - 1; i++) {
    forest.push(l[i].filter((_, idx) => (idx != 0) && (idx != col.length - 1)));
}

forest.forEach((line, y) => {
    const treePosition = [0, 0];
    treePosition[1] = y + 1;
    line.forEach((_, x) => {
        treePosition[0] = x + 1;
        Around(treePosition);
    });
});

function Around(treePosition) {
    const [x,y] = treePosition;
    const tree = l[y].slice(x, x + 1)[0];
    const left = l[y].slice(0, x);
    const right = l[y].slice(x + 1, l[y].length);
    const top = col[x].slice(0, y);
    const bottom = col[x].slice(y + 1, col[x].length);

    Math.max.apply(Math, left) < tree || Math.max.apply(Math, right) < tree || Math.max.apply(Math, bottom) < tree || Math.max.apply(Math, top) < tree ? resultPart1++ : null;

    CalcVision(tree, [right, bottom, top.reverse(), left.reverse()])
}

function CalcVision(tree, orientation) {
    let score_panoramique = [];
    orientation.forEach(item => {
        for (let i = 0; i < item.length; i++) {
            if (Math.max.apply(Math, item) < tree && item[i] == item[item.length - 1]) {
                score_panoramique.push(item.length);
                break;
            } else if (item[i] >= tree) {
                score_panoramique.push(item.slice(0, i + 1).length);
                break;
            }
        }
    })
    resultPart2.push(score_panoramique.reduce((a, b) => a * b));
}

console.log("Result Part1:", resultPart1);
console.log("Result Part2:", Math.max.apply(Math, resultPart2));