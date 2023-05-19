const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const bodyParser = require('body-parser');
// const compression = require('compression')
const redis = require('redis')

const redisURL = 'redis://127.0.0.1:6379'

const redisClient = redis.createClient({
    url: 'redis://redis:6379'
  });
redisClient.connect().catch(console.error)


redisClient.on("ready", () => {
    console.log("Connected!");
});

redisClient.on("error", () => {
    console.log("Redis Client Error!");
});

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(compression)

const pool = new Pool({
    user: 'postgres',
    host: 'db',
    database: 'mydb',
    password: 'password',
    port: 5432
});

const DEFAULT_EXPIRATION = 3600

app.get('/games/:gameId/languages', (req, res) => {
    const gameId = req.params.gameId;
    pool.query(
        'SELECT language.name FROM language INNER JOIN game_language ON language.language_id = game_language.language_id INNER JOIN game ON game.game_id = game_language.game_id WHERE game.game_id = $1',
        [gameId],
        (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error retrieving languages for game');
            } else {
                const languageNames = result.rows.map(row => row.name);
                res.json(languageNames);
            }
        }
    );
});


app.get('/games/:gameId/gameInfo', async (req, res) => {
    const gameId = req.params.gameId;
    pool.query('SELECT * FROM game WHERE game_id = $1', [gameId])
        .then(result => {
            if (result.rows.length === 0) {
                res.status(404).send('Game not found');
            } else {
                const gameInfo = result.rows[0];
                res.send(gameInfo);
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Internal server error');
        });
});

app.get('/reviews', async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM reviews');
        const reviews = result.rows;
        res.status(200).json(reviews);
        client.release();
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/reviews/users', async (req, res) => {
    let reviews = await redisClient.get('userReviews')
    if (!reviews) {
        try {
            console.log('Cache Miss')
            const data = await pool.query(`SELECT reviews.*, users.name, users.image, users.reviewCount, users.gamesOwned 
                                        FROM reviews JOIN users ON reviews.user_id = users.user_id`);
            redisClient.set('userReviews', JSON.stringify(data), 'EX', 3600)
            res.json(data.rows);
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    } else {
        console.log('Cache Hit')
        res.json(JSON.parse(reviews))
    }
});

function getOrSetCache(key, cb) {
    return new Promise((resolve, reject) => {
        redisClient.get(key, async (error, data) => {
            if (error) return reject(error);
            if (data != null) return resolve(JSON.parse(data));
            try {
                const freshData = await cb();
                redisClient.set(key, JSON.stringify(freshData), 'EX', 3600);
                resolve(freshData);
            } catch (error) {
                reject(error);
            }
        });
    });
}


app.listen(3000, () => {
    console.log('Server listening on port 3000')
})