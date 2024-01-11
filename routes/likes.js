const express= require('express') ;
const router = express.Router();
const LikesController = require('../controllers/likes_controller');
router.post('/toggle',LikesController.toggleLike);//for /likes/toggle/?id=abcd&type=post


module.exports = router;
