const fs = require('fs');
// read contents of the file
const data = fs.readFileSync('input.txt', 'UTF-8');
const crypto = require('crypto');

let count = 0;
let hash = '';
let dataToHash = '';

const idResult2 = true;

if(!idResult2) {
    checkHash("00000");
}   else {
    checkHash("000000");
}

function checkHash(start) {
    while (hash.substring(0, start.length) !== start) {
        dataToHash = `${data}${count}`;
        const md5Hash = crypto.createHash('md5');
        md5Hash.update(dataToHash, 'utf8');
        hash = md5Hash.digest('hex');
        count++;

        console.log(`MD5 Hash de ${dataToHash}: ${hash}`);
    }
}

console.log(`ResultPart ${idResult2 ? 2 : 1}: ${count - 1}`);