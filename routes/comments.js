const commentsController= require('../controllers/comment_controller');
const express= require('express') ;
const passport = require('passport');
const router = express.Router();

router.post('/create',passport.checkAuthentication,commentsController.create);


module.exports = router;

