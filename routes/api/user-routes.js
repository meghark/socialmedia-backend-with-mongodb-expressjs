const router = require('express').Router();
const {
    getAllUsers,
    getOneUserById,
    addUser,
    updateUser,
    removeUser
} = require("../../controllers/user-controller");

router
    .route('/')
    .get(getAllUsers)
    .post(addUser);

router
    .route('/:id')
    .get(getOneUserById)
    .put(updateUser)
    .delete(removeUser)


 module.exports = router;