# Social Network

## Description
For this challenge we were asked make a social media backend using mongoDB, and mongoose.

## Installation
For this project I really enjoyed the backend challenge, first to start I set up the connection to mongodb, next I worked on the models for thoughts and users based on the acceptance critera and then the reaction schema. after that I worked on the controllers and routes for thoughts and users, once that was finished I moved on the the utils for the data and seeds, and lastly set up the server.js file.

## Usage
Once all packages are installed the database is seeded and the user runs the 'npm start' command they can start using the get post put and delete routes using ThunderClient or Insomnia. on the 'api/users' route you should be able to get all users and create a new user on the post route. on the 'api/user/:userId' you should be able to get a single user, update a user using the put route and delete a user all but using their id as an endpoint. On the 'api/thoughts' route you should be able to get all thoughts and post a new thought and that thought should be added to the correct users thought array. on the 'api/thoughts/:thoughtId' you should be able to get a single thought, update a thought using the put route, and delete a thought all by the thoughts id, when the thought is delete it should delete from the users thought array as well. The 'api/thoughts/:thoughtId/reactions' route will allow you to create a reaction to a thought, and lastly 'api/thoughts/:thoughtId/reactions/:reactionId' is how you can delete a reaction from a thought.

Walk through video: https://drive.google.com/file/d/17CAaXx5-Iur3LfWHbFhlB9oBTo6u-V7E/view?usp=sharing

![alt text](<images/Screenshot 2024-04-29 at 4.16.23 PM.png>)

![alt text](<images/Screenshot 2024-04-29 at 4.16.35 PM.png>)

## License

![Static Badge](https://img.shields.io/badge/license-MIT-pink)
