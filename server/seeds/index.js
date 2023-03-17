const db = require('../config/connection');
const { User, Tag, Post } = require('../models');
const userSeeds = require('./userSeeds.json');
const tagSeeds = require('./tagSeeds.json');
const postSeeds = require('./postSeeds.json');

db.once('open', async () => {
    // clean the database to avoid duplicates during development
    await User.deleteMany({});
    await Tag.deleteMany({});
    await Post.deleteMany({});

    // seed db with created data
    const users = await User.create(userSeeds);
    await Tag.insertMany(tagSeeds);
    postSeeds[0].user = users[0]._id;
    postSeeds[1].user = users[1]._id;
    postSeeds[2].user = users[2]._id;
    
    await Post.create(postSeeds);

    console.log('Database Seeded!');
    process.exit(0);
})