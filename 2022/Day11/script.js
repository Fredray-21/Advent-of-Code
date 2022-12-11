const fs = require('fs');
// read contents of the file
const data = fs.readFileSync('input.txt', 'UTF-8');

const lines = data.split(/\r?\n/);

let singes = [];
let isPart2 = false;

function parseMonkeys() {
    singes = [];
    let tempMonkey = {
        id: 0,
        startingItems: [],
        operation: '',
        test: '',
        ifTrue: '',
        ifFalse: '',
        nbInspected: 0
    };
    lines.forEach((line, i) => {
        if (line.includes('Monkey')) {
            tempMonkey.id = parseInt(line.split(' ')[1]);
        } else if (line.includes('Starting items')) {
            tempMonkey.startingItems = line.split(':')[1].trim().split(',').map(Number);
        } else if (line.includes('Operation')) {
            tempMonkey.operation = line.split('old ')[1].trim();
        } else if (line.includes('Test')) {
            tempMonkey.test = line.split('by ')[1].trim();
        } else if (line.includes('If true')) {
            tempMonkey.ifTrue = parseInt(line.split('monkey ')[1]);
        } else if (line.includes('If false')) {
            tempMonkey.ifFalse = parseInt(line.split('monkey ')[1]);
            singes.push(tempMonkey);
            tempMonkey = {
                id: 0,
                startingItems: [],
                operation: '',
                test: '',
                ifTrue: '',
                ifFalse: '',
                nbInspected: 0
            };
        }
    });
}

function runTour() {
    for (let i = 0; i < singes.length; i++) {
        let copySinges = JSON.parse(JSON.stringify(singes));
        ReadStartingItems(copySinges[i]);
    }
}

function ReadStartingItems(currentMonkey) {
    let nivInq = 0;
    let items = currentMonkey.startingItems;
    const superModulo = singes.map(s => parseInt(s.test)).reduce((i, v) => i * v, 1);

    items.forEach((item, i) => {
        singes[currentMonkey.id].nbInspected++;

        switch (currentMonkey.operation.split(' ')[0]) {
            case '*':
                if (currentMonkey.operation.split(' ')[1] === 'old') {
                    nivInq = parseInt(item) * parseInt(item);
                } else {
                    nivInq = parseInt(item) * parseInt(currentMonkey.operation.split(' ')[1]);
                }
                break;
            case '+':
                nivInq = parseInt(item) + parseInt(currentMonkey.operation.split(' ')[1]);
                break;
        }

        if(isPart2){
            nivInq = nivInq % superModulo;
        }else{
            nivInq = Math.floor(nivInq / 3);
        }

        if (nivInq % parseInt(currentMonkey.test) === 0) {
            singes[currentMonkey.ifTrue].startingItems.push(nivInq);
        } else {
            singes[currentMonkey.ifFalse].startingItems.push(nivInq);
        }
        singes[currentMonkey.id].startingItems.shift();
        nivInq = 0;
    });
}

const MaxAndsecond = function (arr) {
    let max = Math.max.apply(null, arr);
    arr.splice(arr.indexOf(max), 1);
    return [max, Math.max.apply(null, arr)];
};

parseMonkeys();
for (let i = 1; i <= 20; i++) {
    runTour();
}
console.log("ResultPart1 :", MaxAndsecond(singes.map(singe => singe.nbInspected)).reduce((a, b) => a * b));

isPart2 = true;
parseMonkeys();
for (let i = 1; i <= 10000; i++) {
    runTour();
}
console.log("ResultPart2 :", MaxAndsecond(singes.map(singe => singe.nbInspected)).reduce((a, b) => a * b));
