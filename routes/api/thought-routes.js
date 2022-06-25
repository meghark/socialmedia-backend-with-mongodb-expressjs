const router = require('express').Router();
const {
    getAllThoughts,
    getOneThoughtById,
    addThought,
    updateThought,
    addReaction,
    removeThought
} = require("../../controllers/thought-controllers");

router
    .route('/:thoughtId/reactions')
    .post(addReaction)

router
    .route('/')
    .get(getAllThoughts)
    .post(addThought);

router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(removeThought);

router
    .route('/:thoughtId')
    .get(getOneThoughtById)
    .put(updateThought)
    .delete(removeThought);

 module.exports = router;