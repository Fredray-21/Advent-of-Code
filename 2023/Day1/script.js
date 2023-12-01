const fs = require('fs');
const data = fs.readFileSync('input.txt', 'UTF-8');
const lines = data.split(/\r?\n/);
let result = [0,0];

const wordToNumber = word => ({ one: '1', two: '2', three: '3', four: '4', five: '5', six: '6', seven: '7', eight: '8', nine: '9' }[word.toLowerCase()] || word);

lines.forEach(line => {
    result[0] += (m => parseInt(m ? '' + m[1] + (m[2] || m[1]) : 0))(/(\d)(?:.*(\d))?/.exec(line));
    result[1] += (m => parseInt(m ? wordToNumber(m[1]) + wordToNumber(m[2] || m[1]) : 0))(/(\d|one|two|three|four|five|six|seven|eight|nine)(?:.*(\d|one|two|three|four|five|six|seven|eight|nine))?/.exec(line));
});

result.forEach((r, i) => console.log(`Part ${i + 1}:`, r));

