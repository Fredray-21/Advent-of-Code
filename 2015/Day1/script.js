const fs = require('fs')

// read contents of the file
const data = fs.readFileSync('input.txt', 'UTF-8')

const up = (data.toString().match(/[(]/g) || []).length;
const down = (data.toString().match(/[)]/g) || []).length;

let etage = 0;
let result;
data.toString().split('').forEach((e, idx) => {
    e == "(" ? etage++ : etage--;
    etage == -1 ? (result == null ? result = idx + 1 : null) : null
});

console.log("Étage:", up - down);
console.log("Première fois à l'étage -1:", result);
