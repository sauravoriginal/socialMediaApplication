const express= require('express') ;
const router = express.Router();
const postApi = require('../../../controllers/api/v1/post_api');
const passsport = require('passport');


router.get('/',postApi.index);
//we don't want to create session cookies anywore ,set session:false
// authentication check over passport
router.delete('/:id',passsport.authenticate('jwt',{session:false}),postApi.destroy);


module.exports = router;
