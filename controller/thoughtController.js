const { Thought, User, Reaction } = require('../model');

module.exports = {
    getThoughts(req, res) {
        Thought.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err));
    },
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
        .then((thought) =>
    !thought
    ? res.staus(404).json({ message: 'No thought with this ID found' })
    : res.json(thought)
    )
    .catch((err) => res.status(500).json(err))
    },
    createThought(req, res) {
        Thought.create(req.body)
        .then((thought) => {
            return User.findOneAndUpdate(
                { _id: req.body.userId },
                { $addToSet: { thoughts: thought._id } },
                { new: true }
            );
        })
        .then((user) =>
        !user
        ? res.status(404).json({ message: 'There is no user with that ID found'})
        : res.json('Created Thought!')
    )
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
    },
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            // { runValidators: true, new: true }
        )
        .then((thought) => 
    !thought
    ? res.status(404).json({ message: 'No Thought with this ID found' } )
    :res.json(thought)
    )
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
    },
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
        .then((thought) =>
        !thought
        ? res.status(404).json({ message: 'No Thought with this ID found' })
        : User.findOneAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } },
        // { new: true }
    )
    )
    .then((user) =>
    !user
    ? res.status(404).json({ message: 'No user with this ID found'})
    : res.json({ message: 'Thought sucessfully deleted'})

    )
    .catch((err) => res.status(500).json(err));
    },

    addThoughtReactions(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            // { runValidators: true, new: true }
        )
        .then((thought) =>
    !thought
    ? res.status(404).json({ message: 'No Thought with this ID found' })
    : res.json(thought)
    )
    .catch((err) => res.status(500).json(err))
    },
    removeThoughtReactions(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: {reactions: { _id: req.params.reactionId } } },
            { runValidators: true, new: true }
        )
        .then((thought) => 
    !thought
    ? res.status(404).json({ message: 'No thought with this ID found' })
    : res.json(thought)
    )
    .catch((err) => res.status(500).json(err));
    },
};