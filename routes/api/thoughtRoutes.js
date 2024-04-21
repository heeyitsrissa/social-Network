const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addThoughtReactions,
    removeThoughtReactions
} = require('../../controller/thoughtController');

router.route('/').get(getThoughts).post(createThought);

router
.route('/:thoughtId')
.get(getSingleThought)
.put(updateThought)
.delete(deleteThought);

router.route('/:thoughtId/reactions').post(addThoughtReactions);

router.route('/:thoughtId/reactions/:reactionId').delete(removeThoughtReactions);

module.exports = router;
