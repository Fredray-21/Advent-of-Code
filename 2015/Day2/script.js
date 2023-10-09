const fs = require('fs');
// read contents of the file
const data = fs.readFileSync('input.txt', 'UTF-8');

const lines = data.split(/\r?\n/);
let totalReponse1 = 0;
let totalReponse2 = 0;

lines.forEach((line) => {
    const [l,w,h] = line.split('x').map(Number);
    const smallest = Math.min(l*w, w*h, h*l);
    totalReponse1 += 2*l*w + 2*w*h + 2*h*l + smallest;

    //reponse 2
    const [small1, small2] = [l,w,h].sort((a,b) => a-b).slice(0,2);
    const totalLineRep2 = small1*2 + small2*2;
    const ruban = l*w*h;
    totalReponse2 += totalLineRep2 + ruban;
});
console.log("ResultPart1:", totalReponse1);
console.log("ResultPart2:",totalReponse2);