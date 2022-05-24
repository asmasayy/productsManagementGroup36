// const jwt = require("jsonwebtoken")

// //Creating Authorization feature 
// const userAuth = async (req, res, next) => {
//   try {
//     const token = req.header('Authorization', 'Bearer Token')

//     if (!token) {     //validating the token is present in headers or not.
//       return res.status(403).send({ status: false, message: 'Token must be present' });
//     }

//     let validToken = token.split(' ')

//     if(validToken.length !== 2 || validToken[0] !== "Bearer" || !validToken[1] ){
//       return res.status(403).send({ status: false, message: 'Invalid token format.' })
//     }

//     const decodeToken = jwt.verify(validToken[1], "Project-ShoppingCart", {ignoreExpiration: true})    //If present then verify the secret key
//     if (!decodeToken) {
//       return res.status(403).send({ status: false, message: 'You are not autherised to access.' });
//     }

//     let expiration = decodeToken.exp
      
//     let tokenExtend = Math.floor(Date.now() / 1000) 

//     if (expiration < tokenExtend){
//       return res.status(401).send({ status: false, message: "Token is expired" })
//     }

//     req.userId = decodeToken.userId     
        
//       next();     //if token is present & for the same user then move to the next
//     } 
//     catch (err) {
//         console.log(err);
//         res.status(500).send({ message: err.message });
//     }
// };

// module.exports.userAuth = userAuth;
