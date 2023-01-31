const gameGenerateBoard = (width, height) => {
    // [
    //    ['m', 2, 1],
    //    [1, 2,'m'],
    //    [0, 1, 1]
    // ]
    const structure = new Array(height).fill(null).map(() => {
        return new Array(width).fill(null).map(() => {
            const hasBomb = Math.random() > 0.7;
            return hasBomb ? 'm' : null;
        });
    });
    return structure.map((row, rowIndex) => {
        return row.map((field, columnIndex) => {
            if(field == 'm'){
                return field;
            }
            return countAroundM(structure, rowIndex, columnIndex);
        })
    })
}
const countAroundM = (structure, rowIndex, columnIndex) => {
    let count = 0;
    // undefined
    if(structure[rowIndex-1] && structure[rowIndex-1][columnIndex-1] == 'm'){
        count++;
    }
    if(structure[rowIndex-1] && structure[rowIndex-1][columnIndex] == 'm'){
        count++;
    }
    if(structure[rowIndex-1] && structure[rowIndex-1][columnIndex+1] == 'm'){
        count++;
    }
    if(structure[rowIndex] && structure[rowIndex][columnIndex-1] == 'm'){
        count++;
    }
    if(structure[rowIndex] && structure[rowIndex][columnIndex+1] == 'm'){
        count++;
    }
    if(structure[rowIndex+1] && structure[rowIndex+1][columnIndex-1] == 'm'){
        count++;
    }
    if(structure[rowIndex+1] && structure[rowIndex+1][columnIndex] == 'm'){
        count++;
    }
    if(structure[rowIndex+1] && structure[rowIndex+1][columnIndex+1] == 'm'){
        count++;
    }
    return count;
}
module.exports = {
    gameGenerateBoard,
}