const userRoute = require("./user-routes");
const thoughtRoute = require("./thought-routes");
const router = require('express').router();


router.use('/')
    .get(userRoute)
    .post(userRoute);


module.exports = router;
