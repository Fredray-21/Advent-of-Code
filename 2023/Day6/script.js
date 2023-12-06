const fs = require('fs');
const data = fs.readFileSync("input.txt", 'UTF-8');
const distance = [[...data.matchAll(/^Distance: +(\d+(?: +\d+)*)$/gm)][0][1].match(/\d+/g).map(Number),[parseInt([...data.matchAll(/^Distance: +(\d+(?: +\d+)*)$/gm)][0][1].match(/\d+/g).map(Number).join(''))]]
const result = [[...data.matchAll(/^Time: +(\d+(?: +\d+)*)$/gm)][0][1].match(/\d+/g).map(Number), [parseInt([...data.matchAll(/^Time: +(\d+(?: +\d+)*)$/gm)][0][1].match(/\d+/g).map(Number).join(''))]].map((arrT, idxT) => Array.from({ length: arrT.length }, (_, idx) => Array.from({ length: arrT[idx] + 1 }, (__, tA) => tA * (arrT[idx] - tA)).filter(dist => dist > distance[idxT][idx]).length).reduce((acc,val) => acc * val));
result.forEach((r, i) => console.log(`Part ${i + 1}:`, r));