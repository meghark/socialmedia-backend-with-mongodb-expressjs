const userRoute = require("./user-routes");
const thoughtRoute = require("./thought-routes");
const router = require('express').router();


router.use('/users', userRoute);



module.exports = router;
