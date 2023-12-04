const fs = require('fs');

const data = fs.readFileSync("input.txt", 'UTF-8');
const lines = data.split(/\r?\n/);
const result = [0, 0];

result[0] += [...data.matchAll(/^Card +\d+: +(\d+(?: +\d+)*?) +\| +(\d+(?: +\d+)*?)$/gm)].map(m => Math.trunc(Math.pow(2, m[1].match(/\d+/g).map(Number).reduce((c, e) => (m[2].match(/\d+/g).map(Number).includes(e) ? c + 1 : c), 0) - 1))).reduce((acc, val) => acc + val, 0);

let qty = Array(lines.length + 1).fill(1).fill(0, 0, 1);
[...data.matchAll(/^Card +\d+: +(\d+(?: +\d+)*?) +\| +(\d+(?: +\d+)*?)$/gm)].slice().forEach((m, idx) => Array.from({ length: m[1].match(/\d+/g).map(Number).reduce((c, e) => (m[2].match(/\d+/g).map(Number).includes(e) ? c + 1 : c), 0) }, (_, i) => i + 1).map((n) => qty[idx + 1 + n] += qty[idx + 1]) && (result[1] = qty.reduce((acc, val) => acc + val, 0)));


result.forEach((r, i) => console.log(`Part ${i + 1}:`, r));