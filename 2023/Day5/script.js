const fs = require('fs');

const data = fs.readFileSync("input.txt", 'UTF-8');
let result = [0, 0];

const seedPairs = [...data.matchAll(/^seeds: +(\d+(?: +\d+)*)$/gm)].flatMap(m => m[1].split(" ").map(Number));
const rangesSeedsPart2 = seedPairs.reduce((acc, seed, i) => i % 2 === 0 ? acc.concat(`${seed}-${seed + seedPairs[i + 1] - 1}`) : acc, []);

[[...data.matchAll(/^seeds: +(\d+(?: +\d+)*)$/gm)][0][1].split(" "), rangesSeedsPart2].map((s, idx) => {
    if (idx === 0) {
        s.map(Number).map(Number).map((seed) => {
            let acc = seed;
            [...data.matchAll(/([a-z-]+) map:/g)].map(m => m[1]).map(m => ({ [m]: [...data.matchAll(new RegExp(`${m} map:\\s*([\\s\\S]*?)(?=\\r?\\n\\r?\\n|$)`, 'g'))].map(match => match[1].trim().split("\r\n"))[0] })).map(m => {
                return Object.entries(m).reduce((acc, [key, value]) => {
                    const ranges = value.map(row => {
                        const [s, v, n] = row.split(' ').map(Number);
                        return { base: `${v}-${v + n - 1}`, val: `${s}-${s + n - 1}` };
                    });

                    !acc[key] ? acc[key] = ranges : acc[key].range = acc[key].range.concat(ranges)
                    return acc;
                }, {})
            }).map(m => {
                acc = Object.entries(m)[0][1].reduce((isInRange, { base, val }) => {
                    const [baseMin, baseMax] = base.split('-').map(Number);
                    return (acc >= baseMin && acc <= baseMax) || isInRange;
                }, false) ? (Object.entries(m)[0][1].find(({ base, val }) => acc >= base.split('-').map(Number)[0] && acc <= base.split('-').map(Number)[1]) || {}).val.split('-').map(Number)[0] + acc - (Object.entries(m)[0][1].find(({ base, val }) => acc >= base.split('-').map(Number)[0] && acc <= base.split('-').map(Number)[1]) || {}).base.split('-').map(Number)[0] : acc;
            });
            result[idx] = result[idx] === 0 ? acc : acc <= result[idx] ? acc : result[idx];
        });
    } else {
        // here we're going to do the same thing but using ranges
        // It's impossible to do it this way because it takes too long!
        result[idx] = "TOO LONG";
    }
});






result.forEach((r, i) => console.log(`Part ${i + 1}:`, r));