const fs = require('fs');
// read contents of the file
const data = fs.readFileSync('input.txt', 'UTF-8');
const lines = data.split('');

//result 1
const boardResult1  = new Map();
const santaResult1  = { x: 0, y: 0 };

//result 2
const boardResult2  = new Map();
const santaResult2  = { x: 0, y: 0 };
const roboResult2  = { x: 0, y: 0 };

lines.forEach((pos, idx) => {
    const keySantaResult1 = `${santaResult1.x},${santaResult1.y}`;
    
    // result 1
    if(!boardResult1.has(keySantaResult1)) {
        boardResult1.set(keySantaResult1, 1);
    } else {
        boardResult1.set(keySantaResult1, boardResult1.get(keySantaResult1) + 1);
    }
    
    // result 2
    const isSanta = idx % 2 === 0;

    if(isSanta) {
        const keySantaResult2 = `${santaResult2.x},${santaResult2.y}`;
        if(!boardResult2.has(keySantaResult2)) {
            boardResult2.set(keySantaResult2, 1);
        } else {
            boardResult2.set(keySantaResult2, boardResult2.get(keySantaResult2) + 1);
        }
    } else {
        const keyRoboResult2 = `${roboResult2.x},${roboResult2.y}`;
        if(!boardResult2.has(keyRoboResult2)) {
            boardResult2.set(keyRoboResult2, 1);
        } else {
            boardResult2.set(keyRoboResult2, boardResult2.get(keyRoboResult2) + 1);
        }
    }

   
    switch (pos) {
        case '^':
            santaResult1.y += 1;
            isSanta ? santaResult2.y += 1 : roboResult2.y += 1;
            break;
        case 'v':
            santaResult1.y -= 1;
            isSanta ? santaResult2.y -= 1 : roboResult2.y -= 1;
            break;
        case '>':
            santaResult1.x += 1;
            isSanta ? santaResult2.x += 1 : roboResult2.x += 1;
            break;
        case '<':
            santaResult1.x -= 1;
            isSanta ? santaResult2.x -= 1 : roboResult2.x -= 1;
            break;
    }
});

console.log("ResultPart1:", boardResult1.size);
console.log("ResultPart2:", boardResult2.size);
