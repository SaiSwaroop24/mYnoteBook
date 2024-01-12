//The fetchuser middleware is designed to be placed in routes that require authentication
// It checks for the presence of a valid JWT token in the request header.

//-------------------------------------------------------------
/*const jwt = require("jsonwebtoken"); //Import the jsonwebtoken library for creating and verifying JWTs.
const JWT_SECRET = "SAISWAROOP1277@21PA"; //Define a secret key (JWT_SECRET) for JWT (JSON Web Token) generation.
const fetchuser = (req, res, next) => {
    //get the user from the jwt token and add id to
    const token = req.header("auth-token"); //The middleware starts by trying to extract the JWT from the request headers. The JWT is typically sent in the "auth-token" header.
    if (!token) { //If there's no token present, the middleware returns a 401 status along with an error message, indicating that authentication is required.
      return res.status(401).send({ error: "Please authenticate with a valid token" });
    }
    try {
      const data = jwt.verify(token, JWT_SECRET); // Corrected the variable name to 'data'
      req.user = data.user;
      //console.log(data.user);
      next();
    } catch (error) {
      res.status(401).send({ error: "Please authenticate with a valid token" });
    }
  };
  module.exports = fetchuser;
  */
 //============================================

 const jwt = require("jsonwebtoken");
const JWT_SECRET = "SAISWAROOP1277@21PA";

const fetchuser = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).send({ error: "Please authenticate with a valid token" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate with a valid token" });
  }
};

module.exports = fetchuser;

  
  