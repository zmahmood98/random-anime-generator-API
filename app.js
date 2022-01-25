const express = require("express");
const app = express();
const cors = require('cors');
let animes = require('./data/animeData')

app.use(cors());
app.use(express.json());


app.listen(2000, () => {
    console.log("Server listening on port 2000");
});


// random anime generator
app.get('/random-anime', (req, res) => {
    let randomAnime = animes[Math.floor(Math.random() * animes.length)]
    res.json(randomAnime)
});


// no path result
app.get('/', (req, res) => {
    res.send('Type "/animes" to see a full list of animes!');
});

// GET /anime - get all anime data
app.get("/animes", (req, res) => {
    res.json(animes);
});

// GET /anime/:id - get specific anime data
app.get("/animes/:id", (req, res) => {
    try {
        let requestedAnimeName = req.params.id;
        let matchingAnime = animes.find((anime) => anime.id == requestedAnimeName);
        if(!matchingAnime) { throw new Error(`Anime not found!`)}
        res.json(matchingAnime)
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
})

// POST /anime - create new anime entry
app.post('/animes', (req, res) => {
    let newAnime = { id: animes.length + 1, ...req.body };
    animes.push(newAnime);
    res.status(201).json(newAnime);
})

app.post('/', (req, res) => {
    res.status(405).send('Forbidden request');
});

// PATCH /anime/:id - edit anime entry
app.patch('/animes/:id', (req, res) => {
    // read new data from body
    let newData = req.body;
    let requestedAnimeId = req.params.id;
    let matchingAnime = animes.find((anime) => anime.id == requestedAnimeId);
    
    // update the stored animes data
    let updatedAnime = { ...matchingAnime, ...newData }
    let animeIdx = animes.indexOf(matchingAnime)
    animes = [ ...animes.slice(0, animeIdx), updatedAnime, ...animes.slice(animeIdx + 1)]
    
    res.json(updatedAnime)
})

// DELETE /anime - delete all anime data
app.delete("/animes", (req, res) => {
    animes = [];
    res.status(204).send("All the animes are gone :(");
})

// DELETE /anime/:id - delete single anime entry
app.delete("/animes/:id", (req, res) => {
    animes = animes.slice(0, req.params.id).concat(animes.slice(parseInt(req.params.id) + 1));
    
    res.status(204).send();
})
