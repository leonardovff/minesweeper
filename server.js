const express = require('express');
const app = express();
const port = 3000;
const { randomUUID } = require('crypto');
const { gameGenerateBoard } = require('./game.js');

app.use(express.json());

const games = [];

app.post('/game', (req, res) => {
    const { boardSizeX, boardSizeY, minesPercentage} = req.body;
    // todo change the function to support mines count
    const gameData = gameGenerateBoard(boardSizeX, boardSizeY, minesPercentage);
    const game = {
        id: randomUUID(),
        data: gameData,
        metadata: {
            boardSizeX,
            boardSizeY,
            minesPercentage,
            // mines
        },
        gameStatus: 'running'
    };
    games.push(game);
    console.log(games);
    res.status(201).send({
        gameId: game.id
    });
});
app.put('/game/:gameId/:positions', (req, res) => {
    const {gameId, positions} = req.params;
    const gameFound = games.find(game => game.id === gameId);
    if(!gameFound) {
        return res.status(404).send({
            message: `Game with the id ${gameId} not exist`
        });
    }
    const [x, y] = positions.split(',');
    const field = gameFound.data[y][x];
    if(field == 'm'){
        gameFound.gameStatus = 'ended';
    }
    res.status(200).send({
        gameStatus: gameFound.gameStatus,
        isMine: field === 'm'
    });
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})