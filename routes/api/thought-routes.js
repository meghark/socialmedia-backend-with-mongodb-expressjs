const router = require('express').Router();
const {
    getAllThoughts,
    getOneThoughtById,
    addThought,
    updateThought,
    removeThought
} = require("../../controllers/thought-controllers");


router
    .route('/')
    .get(getAllThoughts)
    .post(addThought);

router
    .route('/:id')
    .get(getOneThoughtById)
    .put(updateThought)
    .delete(removeThought)


 module.exports = router;