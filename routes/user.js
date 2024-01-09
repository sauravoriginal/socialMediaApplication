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

//
router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));

router.get('/auth/google/callback', passport.authenticate('google', {
    failureRedirect: '/users/sign-in'
}),userController.createSession
);

// for forgot password
router.get('/forgot-password',userController.forgotPassword);
router.post('/reset-password-link',userController.sendResetLinkToMail);
router.get('/reset-password',userController.resetPassword);
router.post('/reset-password',userController.changePassword);


module.exports = router;
