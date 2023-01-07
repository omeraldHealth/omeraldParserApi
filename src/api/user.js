const {Router} = require('express')
const { verifyAuth } = require('../middleware/auth/verifyAuth')
const userRouter = Router()

userRouter.post("/loginUser",verifyAuth,(req,res)=>{
   res.send(req.user.user.name+" is logged in")
})

module.exports = userRouter