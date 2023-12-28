const express= require('express') ;
const userController  =require('../controllers/user_controller');
const router = express.Router();
router.get('/profile',userController.profile);
router.get('/sign-Up',userController.signUp);
router.get('/sign-in',userController.signIn);
// on form action sign up
router.post('/create',userController.create);



// any further routes aftter localhost:8000/user  will be here


module.exports = router;
