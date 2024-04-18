const { Schema, model } = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { 
        type: String, 
        unique: true,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: true,
    },
    thoughts: [{ type: Schema.Types.ObjectId, ref: 'comment' }],
    friends: [{ type: Schema.Types.ObjectId, ref: 'user' }]
})

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = model('user', userSchema);

module.exports = User;