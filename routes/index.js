const router = require('express').router();
const apiRoutes = require('../routes/api');

router.use('/api', apiRoutes);

module.exports = router;