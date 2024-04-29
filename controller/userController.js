const User = require('../model/User')

module.exports = {
    getUsers(req, res) {
        User.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err));
    },
    getSingleUser(req, res) {
        console.log('User ID:', req.params.userId);
        User.findOne({ _id: req.params.userId })
        .then((user) => 
    !user
    ? res.status(404).json({ message: 'No user with that ID found' })
    : res.json(user)
    )
    .catch((err) => res.status(500).json(err));
    },
    createUser(req, res) {
        User.create(req.body)
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => res.status(500).json(err));
    },
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((user) =>
        !user
        ? res.status(404).json({ message: 'No user with this ID found' })
        : res.json(user)
    )
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
    },
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId }) 
          .then((user) => {
            if (!user) {
              console.log('User not found'); 
              return res.status(404).json({ message: 'No user with this ID found' });
            }
            return User.findOneAndUpdate(
              { _id: req.params.userId },
              { $pull: { _id: req.params.userId } },
              { new: true }
            );
          })
          .then((result) => {
            console.log('Update result:', result); 
            res.json({ message: 'User successfully deleted' }); 
          })
          .catch((err) => {
            console.error('Error deleting user:', err);
            res.status(500).json({ message: 'Error deleting user', error: err });
          });
      } 
};