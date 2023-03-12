const db = require('../config/connection');
const { User, Tag } = require('../models');
const userSeeds = require('./userSeeds.json');
const tagSeeds = require('./tagSeeds.json')

db.once('open', async () => {
    // clean the database to avoid duplicates during development
    await User.deleteMany({});
    await Tag.deleteMany({});

    // seed db with created data
    await User.insertMany(userSeeds);
    await Tag.insertMany(tagSeeds);

    console.log('Database Seeded!');
    process.exit(0);
})