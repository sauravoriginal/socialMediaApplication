const express= require('express') ;
const userController  =require('../controllers/user_controller');
const router = express.Router();
router.get('/profile',userController.profile);
// router.get('/signin',userController.signin);

// any further routes aftter localhost:8000/user  will be here


module.exports = router;
