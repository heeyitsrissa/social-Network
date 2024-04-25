const connection = require('../config/connection');
const { User, Thought } = require('../model');
const { users, thoughts } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
    try{
    console.log('connected');

    await User.deleteMany({});

    await Thought.deleteMany({});

    const newUsers = await User.insertMany(users);
    const newThought = await Thought.insertMany(thoughts);

    await User.findOneAndUpdate(
        { username: 'Sasha' },
        { $push: { thoughts: newThought[0]._id } }
    );

    await User.findOneAndUpdate(
        { username: 'Hari' },
        { $push: { thoughts: newThought[1]._id } }
    );

    console.log('database seeded!');
} catch (err) {
    console.error('Error seeding database:', err);
} 
})

