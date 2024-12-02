const fs = require('fs');
const data = fs.readFileSync('input.txt', 'UTF-8');
let result = [0,0];
const [col1, col2] = [1, 2].map(i => [...data.matchAll(/^\s*(\d+)\s+(\d+)/gm)].map(m => Number(m[i])).sort((a, b) => b - a));
result[0] = col1.map((v,idx) => Math.abs(v - col2[idx])).reduce((acc,v) => (acc + v),0);
result[1] = col1.map(num => num * col2.reduce((acc, v) => (v === num ? acc + 1 : acc), 0), 0).reduce((acc,v) => (acc + v),0)
result.forEach((r, i) => console.log(`Part ${i + 1}:`, r));