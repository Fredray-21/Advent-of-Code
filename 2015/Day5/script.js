const { match } = require('assert');
const fs = require('fs');
// read contents of the file
const data = fs.readFileSync('input.txt', 'UTF-8');
const lines = data.split(/\r?\n/);

const voyelle = ['a', 'e', 'i', 'o', 'u'];
const notAllowed = ['ab', 'cd', 'pq', 'xy'];

const resultPart1 = lines.filter((line) => {
    const regexVoyelle = new RegExp(`[${voyelle.join('')}]`, 'g');
    const regexNotAllowed = new RegExp(`(${notAllowed.join('|')})`, 'g');
    const regexDouble = new RegExp(/(.)\1/, 'g');
    return (line.match(regexVoyelle)?.length >= 3 ?? false) && (line.match(regexNotAllowed) == null ?? false)  && (line.match(regexDouble)?.length > 0 ?? false);

});

const resultPart2 = lines.filter((line) => {
    const regexDouble = new RegExp(/(..).*\1/, 'g');
    const regexTriple = new RegExp(/(.).\1/, 'g');
    return (line.match(regexDouble)?.length > 0 ?? false) && (line.match(regexTriple)?.length > 0 ?? false);
});

console.log("ResultPart1:", resultPart1.length);
console.log("ResultPart2:", resultPart2.length);

