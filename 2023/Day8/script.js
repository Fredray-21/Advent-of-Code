const fs = require('fs');

const data = fs.readFileSync("input.txt", 'UTF-8');
const lines = data.split(/\r?\n/);

const parseNode = (nodeId) => {
    return data.match(new RegExp(`^(${nodeId}) += +\\((\\w+), +(\\w+)\\)$`, 'gm')).map((m) => {
        const [_, name, left, right] = m.match(new RegExp(`^(${nodeId}) += +\\((\\w+), +(\\w+)\\)$`));
        return {
            name,
            L: left,
            R: right,
        }
    });
}


const findCycle = (nodeId) => {
    let instructions = lines[0].split('');
    let currentNode = parseNode(nodeId)[0]
    let r = 0;
    while (currentNode.name.split('')[2] !== 'Z') {
        let instruction = instructions.shift() || (instructions = lines[0].split(''), instructions.shift());
        currentNode = parseNode(currentNode[instruction])[0];
        r++;
    }
    return r;
}

const result = ['AAA', '\\w+A'].map((id) => {
    return parseNode(id).map((n) => findCycle(n.name)).reduce((a, b) => {
        let [x, y] = [a, b];
        while (x !== y) {
            x > y ? x -= y : y -= x;
        }
        return a * b / x;
    });
});


result.forEach((r, i) => console.log(`Part ${i + 1}:`, r));