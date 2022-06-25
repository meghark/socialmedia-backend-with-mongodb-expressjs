const router = require('express').Router();
const {
    getAllUsers,
    getOneUserById,
    addUser,
    updateUser,
    removeUser,
    addFriends,
    RemoveFriends
} = require("../../controllers/user-controller");

router
    .route('/:userId/friends')
    .post(addFriends)

router
    .route('/:userId/friends/:friendId')
    .delete(RemoveFriends);

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