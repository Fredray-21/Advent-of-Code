const fs = require('fs')

// read contents of the file
const data = fs.readFileSync('input.txt', 'UTF-8')

// split the contents by new line
const lines = data.split(/\r?\n/);

let resultPart1 = 0;
let resultPart2 = 0;

lines.forEach(bag => {
    const size = bag.length;
    const comp1 = bag.slice(0, size / 2);
    const comp2 = bag.slice(size / 2, size);

    function match(s1, s2) {
        let commun;
        for (let i in s1) {
            s2.includes(s1[i]) ? commun = s1[i] : false;
        }
        return commun;
    }

    const commun = match(comp1, comp2);
    let val = commun.charCodeAt(0) - 96;
    commun === commun.toUpperCase() ? val = val + 58 : null;
    resultPart1 += val;
});


lines.forEach((bag, idx) => {
    if (idx % 3 === 0) {
        const bag1 = bag;
        const bag2 = lines[idx + 1];
        const bag3 = lines[idx + 2];

        function match3(s1, s2, s3) {
            let commun;
            for (let i in s1) {
                s2.includes(s1[i]) && s3.includes(s1[i]) ? commun = s1[i] : false;
            }
            return commun;
        }

        const commun = match3(bag1, bag2, bag3);
        let val = commun.charCodeAt(0) - 96;
        commun === commun.toUpperCase() ? val = val + 58 : null;
        resultPart2 += val;
    }
});


console.log("Result Part1 :", resultPart1);
console.log("Result Part2 :", resultPart2);

