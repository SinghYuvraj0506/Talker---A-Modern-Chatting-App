const jwt = require("jsonwebtoken")
const JWT_SECRET = "YuvrajSinghappofmychat";

const fetchuser = (req,res,next)=>{
    const token = req.header('auth-token')
    if(!token){
        return res.status(400).send("Please authenticate usng a valid token")
    }
    try {
        // here we again extract the data within the authentification token and using it we get the details of the user
        const data = jwt.verify(token,JWT_SECRET)
        req.user = data.user   // here data we entered is an object having object id as an other object inside user reference
        next()
    } catch (error) {
        console.error(error.message)
        return res.status(400).send("Please authenticate usng a valid token")
    }

}

module.exports = fetchuser