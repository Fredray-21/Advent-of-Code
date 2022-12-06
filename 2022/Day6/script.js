const fs = require('fs')

// read contents of the file
const data = fs.readFileSync('input.txt', 'UTF-8').split('');

function getResult(n) {
    let find = true;
    let r = count = 0;
    while (find) {
        [...new Set(data.slice(count, count + n))].length === n ? r = (find = false, count + n) : count++; ;
    }
    return r;
}

console.log("Resultat Part 1: ", getResult(4));
console.log("Resultat Part 2: ", getResult(14));