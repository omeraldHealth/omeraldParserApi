const jwt = require('jsonwebtoken')
const {Router} = require('express')
const tokenRouter = Router()

//fetch token
tokenRouter.post("/generateAuth",(req,res)=>{
    jwt.sign({user: req.body.user},req.headers['secret'],{ expiresIn: '36000s' },(err,token)=>{
        return res.json({token})
    })
})

module.exports = tokenRouter