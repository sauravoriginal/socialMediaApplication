const express= require('express') ;
const userController  =require('../controllers/user_controller');
const router = express.Router();
const passport = require('passport');
router.get('/profile/:id',passport.checkAuthentication,userController.profile);
router.post('/update/:id',passport.checkAuthentication,userController.update);

router.get('/sign-Up',userController.signUp);
router.get('/sign-in',userController.signIn);
// on form action sign up
router.post('/create',userController.create);

//on form action sign in
// use passport as a middleware to autenticate
router.post('/create-session',passport.authenticate(
    'local',
    { failureRedirect: '/users/sign-in' },
),userController.createSession);

// on sign-out
router.get('/sign-out',userController.destroySession);

// any further routes aftter localhost:8000/user  will be here


module.exports = router;
