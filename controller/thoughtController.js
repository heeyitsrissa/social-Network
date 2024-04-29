const { Thought, User } = require('../model');



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
              { username: thought.username },
              { $addToSet: { thoughts: thought._id } }, 
              { new: true } 
            );
          })
          .then((user) => {
            if (!user) {
              return res.status(404).json({ message: 'No user with this username found' }); 
            }
    
            return res.json({ message: 'Thought successfully created and added to user' }); 
          })
          .catch((err) => {
            console.error('Error creating thought:', err); 
            res.status(500).json({ message: 'Error creating thought', error: err });
          });
      },
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
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
                { new: true }
            )
    )
        .then((user) => 
        !user
        ? res.status(404).json({ message: 'Thought deleted but no user with this id!' })
        :res.json({ message: 'Thought deleted!' } )
    )
    
    .catch((err) => {
        console.error('Error deleting thought:', err); // Log the error
        return res.status(500).json({ message: 'Error deleting thought', error: err });
      });
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
            { $pull: {reactions: { reactionId: req.params.reactionId } } },
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