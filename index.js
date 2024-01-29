const express = require('express');
var cors = require('cors');
const mongoose = require('mongoose');
const Game = require('./models/game');
const Casino = require('./models/casino');
const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

app.get('/games', async(req, res) => {
  const games = await Game.find({});
   res.status(200).json(games)
})

app.get('/games/:gameId',async(req, res) =>{
  const game=await Game.findById(req.params.gameId).exec();
  res.status(200).json(game)
})

app.post('/games', async(req, res) => {
    const game = new Game(req.body)
    await game.save()
    res.status(201).json(game)

  })
  app.get('/casino', async(req, res) => {
    const casinos = await Casino.find({});
     res.status(200).json(casinos)
  })

  app.post('/casino', async(req, res) => {
    const casino = new Casino(req.body)
    await casino.save()
    res.status(201).json(casino)

  })
  app.get('/spin', (req, res) => {
    const result = spinReels();
    const coinsWon = calculateCoinsWon(result);
    res.json({ result, coinsWon });
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://shamnaep0810:lFaAGsgyyh7eiJ3H@cluster0.hq8acba.mongodb.net/?retryWrites=true&w=majority');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}