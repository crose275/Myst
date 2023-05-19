const { Pool } = require('pg');
const faker = require('faker');

const pool = new Pool({
    user: 'postgres',
    host: 'db',
    database: 'mydb',
    password: 'password',
    port: 5432,
});

const SEED_USERS_COUNT = 1000;
const SEED_REVIEWS_COUNT = 1000;

const seedUsers = async () => {
    const users = [];
    for (let i = 0; i < SEED_USERS_COUNT; i++) {
        users.push({
            name: faker.internet.userName(),
            gamesOwned: faker.datatype.number(),
            reviewCount: faker.datatype.number(),
            image: faker.image.image(500, 500, true)
        });
    }
    try {
        await pool.query('TRUNCATE TABLE users CASCADE');
        await pool.query('ALTER SEQUENCE users_user_id_seq RESTART WITH 1');
        const queryString =
            'INSERT INTO users (name, gamesOwned, reviewCount, image) VALUES ($1, $2, $3, $4) RETURNING *';
        for (let i = 0; i < SEED_USERS_COUNT; i++) {
            console.log(`seeded ${i} users!`)
            const { name, gamesOwned, reviewCount, image } = users[i];
            await pool.query(queryString, [name, gamesOwned, reviewCount, image]);
        }
        console.log('Users seeded successfully!');
    } catch (error) {
        console.error('Error seeding users:', error);
    }
};

const seedReviews = async () => {
    const reviews = [];
    const startDate = new Date(2012, 0, 1); // January 1st, 2012
    const endDate = new Date(2023, 3, 30); // April 30th, 2023
    for (let i = 0; i < SEED_REVIEWS_COUNT; i++) {
        reviews.push({
            user_id: faker.datatype.number({ min: 1, max: SEED_USERS_COUNT }),
            recommended: faker.datatype.boolean(),
            review: faker.lorem.paragraph(),
            game_id: 1,
            helpfulCount: faker.datatype.number(),
            nonHelpfulCount: faker.datatype.number(),
            funnyCount: faker.datatype.number(),
            award: faker.lorem.words(),
            played: faker.datatype.boolean(),
            gotItFree: faker.datatype.boolean(),
            createdAt: faker.date.between(startDate, endDate),
            hoursPlayed: faker.datatype.number()
        });
    }
    try {
        await pool.query('ALTER TABLE reviews DROP CONSTRAINT reviews_user_id_fkey');
        await pool.query('TRUNCATE TABLE reviews CASCADE');
        await pool.query('ALTER SEQUENCE reviews_reviews_id_seq RESTART WITH 1');
        await pool.query('ALTER TABLE reviews ADD CONSTRAINT reviews_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(user_id)');
        const queryString =
            'INSERT INTO reviews (user_id, recommended, review, game_id, helpfulCount, nonHelpfulCount, funnyCount, award, played, gotItFree, created_at, hours_played) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *';

        for (let i = 0; i < SEED_REVIEWS_COUNT; i++) {
            console.log(`seeded ${i} reviews!`)
            const {
                user_id,
                recommended,
                review,
                game_id,
                helpfulCount,
                nonHelpfulCount,
                funnyCount,
                award,
                played,
                gotItFree,
                createdAt,
                hoursPlayed,
            } = reviews[i];
            await pool.query(queryString, [
                user_id,
                recommended,
                review,
                game_id,
                helpfulCount,
                nonHelpfulCount,
                funnyCount,
                award,
                played,
                gotItFree,
                createdAt,
                hoursPlayed,
            ]);
        }
        console.log('Reviews seeded successfully!');
    } catch (error) {
        console.error('Error seeding reviews:', error);
    }
};

seedUsers().then(() => seedReviews().then(() => pool.end()));

