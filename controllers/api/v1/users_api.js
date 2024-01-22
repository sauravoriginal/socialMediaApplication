const User = require('../../../models/user');
const jwt = require('jsonwebtoken');
const env = require('../../../config/environment')

module.exports.createSession=async function(req,res){
  try{
      let user = await User.findOne({email:req.body.email});
      
       if(!user || user.password !=req.body.password){
        return res.json(422,{
            message:"Invalid username or password"
        })
       }
       return res.json(200,{
        message: "Sign in sucessfully,here is your token please keep it safe",
        data: {
            token:jwt.sign(user.toJSON(),env.jwt_secret,{expiresIn :'100000'})
        }
        // token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
        //eyJfaWQiOiI2NThkMzQ4MWMyNmNjZmJkZWRhYTRiZTkiLCJlbWFpbCI6InNhdXJhdm9yaWdpbmFsMjExMEBnbWFpbC5jb20iLCJwYXNzd29yZCI6IjEiLCJuYW1lIjoiU2hhc2hhbmsgU2F1cmF2cyIsImNyZWF0ZWRBdCI6IjIwMjMtMTItMjhUMDg6NDA6MzMuMjQyWiIsInVwZGF0ZWRBdCI6IjIwMjQtMDEtMDRUMTg6MjE6NDYuNTE5WiIsIl9fdiI6MCwiYXZhdGFyIjoiXFx1cGxvYWRzXFx1c2Vyc1xcYXZhdGFycy9hdmF0YXItMTcwNDM5MjUwNjQ5MS0yMTg4ODIyNTEiLCJpYXQiOjE3MDQ0NTk1MDYsImV4cCI6MTcwNDQ1OTUxNn0.
        //qoEQv_gFiV5nIOjjcVsifykhSbU5Wp1ajflVU8abFKg"

       })
  }catch(err){
      console.log('******',err);
      return res.json(500,{
        message:"Internal server Error"
      });
  }
 }