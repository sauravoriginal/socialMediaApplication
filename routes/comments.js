const commentsController= require('../controllers/comment_controller');
const express= require('express') ;
const passport = require('passport');
const router = express.Router();

router.post('/create',passport.checkAuthentication,commentsController.create);
router.get('/destroy/:id',passport.checkAuthentication,commentsController.destroy);

module.exports = router;

