const fs = require('fs');
const data = fs.readFileSync("input.txt", 'UTF-8');
const lines = data.split(/\r?\n/);

const typesIdx = {
    5: 0, // flush
    4: 1, // carré
    23: 2, // brelan + paire
    32: 2, // brelan + paire
    3: 3, // brelan
    22: 4, // double paire
    2: 5, // paire
    0: 6 // rien
}

const puissance = ["AKQJT98765432", "AKQT98765432J"];

const result = puissance.map((p, idxP) => {
    const cardLvl = lines.map((line) => {
        const countNumberOccurrence = line.split(" ")[0].split("").reduce((acc, curr, index) => {
            if (idxP !== 0 && curr === "J") { // part 2
                const occurrences = line.split(" ")[0].split("").filter(val => val !== "J").reduce((count, c) => (count[c] = count[c] ? count[c] + 1 : 1, count), {});
                const mostCommonCards = Object.keys(occurrences).filter(c => occurrences[c] === Math.max(...Object.values(occurrences)));
                curr = mostCommonCards.length > 0 ? mostCommonCards.reduce((a, b) => p.indexOf(a) > p.indexOf(b) ? a : b) : null;
            }
            acc[curr] = acc[curr] ? acc[curr] + 1 : 1;
            return acc;
        }, {});
        return [...[...line.split(" ")], typesIdx[Number(Object.entries(countNumberOccurrence).filter(([_, value]) => value > 1).map(([_, value]) => [value]).join('')) || 0]];
    });

    return Object.entries(cardLvl.reduce((result, currentArray) => (result[currentArray.slice(-1)] = [...(result[currentArray.slice(-1)] || []), currentArray], result), {})).map(([_, value]) => value.sort((a, b) => Array.from({ length: 5 }, (_, i) => p.indexOf(a[0][i]) === p.indexOf(b[0][i]) ? 0 : p.indexOf(a[0][i]) - p.indexOf(b[0][i])))).flat().map(([_, lvl]) => lvl).reverse().reduce((acc, curr, i) => acc + curr * (i + 1), 0);
});

result.forEach((r, i) => console.log(`Part ${i + 1}:`, r));
