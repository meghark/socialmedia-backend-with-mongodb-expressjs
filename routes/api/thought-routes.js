// Router for all api calls for thoughts and reactions.
const router = require('express').Router();
const {
    getAllThoughts,
    getOneThoughtById,
    addThought,
    updateThought,
    addReaction,
    removeThought,
    removeReaction
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
    .delete(removeReaction);

router
    .route('/:thoughtId')
    .get(getOneThoughtById)
    .put(updateThought)
    .delete(removeThought);

 module.exports = router;