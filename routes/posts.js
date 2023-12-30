const Post = require('../controllers/post_controller');
const express= require('express') ;
const passport = require('passport');
const router = express.Router();

router.post('/create',passport.checkAuthentication,Post.create);


module.exports = router;

