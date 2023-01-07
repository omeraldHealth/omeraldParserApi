const jwt = require('jsonwebtoken')

//Verify Auth
function verifyAuth(req,res,next){
    //fetch bearer token
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)
   
    jwt.verify(token, process.env.TOKEN_SECRET , (err,user) => {
        if (err) return res.json("Forbidden: "+err)
        req.user = user
        next()
    })
}

module.exports = {verifyAuth}