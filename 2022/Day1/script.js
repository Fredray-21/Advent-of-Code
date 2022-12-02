const fs = require('fs')

// read contents of the file
const data = fs.readFileSync('input.txt', 'UTF-8')

// split the contents by new line
const lines = data.split(/\r?\n/)
const reducer = (acc, curr) => acc + curr;
let nain = []
let arr = []

// print all lines
lines.forEach(line => line.length === 0 ? (nain.push(arr), arr = []) : arr.push(line));

const sumMap = nain.map(n => n.map(Number)).map((v) => v.reduce(reducer))

console.log("Max :", Math.max(...sumMap));

function findThreeFirst(array) {
    return [...array].sort((a, b) => a - b).slice(-3);
}

console.log("3 first :", findThreeFirst(sumMap).reduce(reducer));




