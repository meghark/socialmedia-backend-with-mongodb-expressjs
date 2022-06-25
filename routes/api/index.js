const userRoute = require("./user-routes");
const thoughtRoute = require("./thought-routes");
const router = require('express').Router();


router.use('/users', userRoute);
router.use('/thoughts', thoughtRoute);


module.exports = router;
