const Post = require('../controllers/post_controller');
const express= require('express') ;
const router = express.Router();

router.post('/create',Post.create);


module.exports = router;

