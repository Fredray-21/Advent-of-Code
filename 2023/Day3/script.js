const fs = require('fs');

const data = fs.readFileSync("input.txt", 'UTF-8');
const lines = data.split(/\r?\n/);
const characters = lines.flatMap(line => line.split('')).filter(char => !/[a-zA-Z0-9.]/.test(char));
const positions = findAllCharacterPositions(lines, characters);
const result = [0, 0];


characters.forEach((char, index) => {
    const [row, col] = positions[index];
    const numbers = findNumbers(lines, row, col);
    const numbersFinal = findIfDigitIsNumber(lines, numbers);

    const numbersFinalDistinct = numbersFinal.filter((number, index, self) =>
        self.findIndex(t => t.number === number.number) === index
    );

    result[0] += numbersFinalDistinct.reduce((acc, curr) => acc + curr.number, 0);
    result[1] += char === '*' && numbersFinalDistinct.length == 2 ?  numbersFinalDistinct.reduce((acc, curr) => acc * curr.number, 1) : 0;
});

result.forEach((r, i) => console.log(`Part ${i + 1}:`, r));



function findAllCharacterPositions(lines, characters) {
    return lines.flatMap((line, row) =>
        line.split('').flatMap((char, col) =>
            characters.includes(char) ? [[row, col]] : []
        )
    );
}

function findNumberInDirection(lines, row, col, dRow, dCol) {
    let number = '';
    while (lines[row] && lines[row][col] && lines[row][col] !== '.') {
        number += lines[row][col];
        row += dRow;
        col += dCol;
    }
    return number;
}

// on cherche les nombres dans les 8 directions
function findNumbers(lines, row, col) {
    const directions = [[1, 0], [0, 1], [-1, 0], [0, -1], [1, 1], [-1, 1], [1, -1], [-1, -1]];

    return directions.flatMap(direction => {
        const [dRow, dCol] = direction;
        let [newRow, newCol] = [row + dRow, col + dCol];
        const char = lines[newRow] && lines[newRow][newCol];
        if (char !== '.') {
            const number = findNumberInDirection(lines, newRow, newCol, dRow, dCol);
            return [{ number, position: [newRow, newCol] }];
        }
        return [];
    });
}

// on regarde si le chiffre est un nombre dans toute la ligne
function findIfDigitIsNumber(lines, numbers) {
    function checkBeforeAndAfter(colLines, col) {
        const initialPosition = col;
        let number = colLines[col];

        // Vérifié avant le nombre
        while (col > 0 && /\d/.test(colLines[col - 1])) {
            col--;
            number = colLines[col] + number;
        }

        // Réinitialisé la colonne pour vérifier après le nombre
        col = initialPosition;

        // Vérifié après le nombre
        while (col < colLines.length - 1 && /\d/.test(colLines[col + 1])) {
            col++;
            number += colLines[col];
        }

        return {
            number: parseInt(number),
            position: {
                start: col - number.length + 1,
                end: col,
            },
        };
    }

    // le parcour sur tout les nombres
    return numbers.map(number => {
        const [row, col] = number.position;
        const colLines = lines[row].split('');
        return checkBeforeAndAfter(colLines, col);
    });
}