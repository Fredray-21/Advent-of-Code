const fs = require('fs')

// read contents of the file
const data = fs.readFileSync('input.txt', 'UTF-8')

// split the contents by new line
const lines = data.split(/\r?\n/);

let result = "";
const resultPart2 = true;
let lines_caisse = [];

for (let i = 0; i < 8; i++) {
    const arr_caisse = lines[i].split('').filter((item, index) => {
        return index % 4 === 1;
    });
    const caisse_fill = Array(9).fill().map((_, idx) => arr_caisse[idx] || ' ');
    lines_caisse.push(caisse_fill);
}

const collumn_caisse = [];
let arr = [];
for (let i = 0; i <= 8; i++) {
    lines_caisse.forEach((item, index) => {
        if (item[i] != ' ') {
            arr.push(item[i]);
        }
    });
    collumn_caisse.push(arr);
    arr = [];
}

lines.forEach((line, idx) => {
    if (idx > 9) {
        const [nb, from, to] = line.match(/\d+/g).map(Number);
        const col = collumn_caisse[from - 1];

        if (resultPart2) {
            collumn_caisse[to - 1] = [...col.slice(0, nb), ...collumn_caisse[to - 1]]
        } else {
            collumn_caisse[to - 1] = [...col.slice(0, nb).reverse(), ...collumn_caisse[to - 1]]
        }

        collumn_caisse[from - 1] = col.slice(col.slice(0, nb).length, col.length);
    }
});

collumn_caisse.forEach(v => {
    result += v[0];
});
console.log(result);

