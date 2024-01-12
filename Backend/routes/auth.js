const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt"); //npm i bycrypt
const JWT_SECRET = "SAISWAROOP1277@21PA"; //Define a secret key (JWT_SECRET) for JWT (JSON Web Token) generation.
const jwt = require("jsonwebtoken"); //Import the jsonwebtoken library for creating and verifying JWTs.
const fetchuser=require('../middleware/fetchuser.js');
//Route:1 Create a user using POST "/api/auth/createUser", doesn't require authentication
router.post(
  "/createUser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Password must have a minimum of 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    let sucess=false;
    //if thre are eroor display the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ sucess,errors: errors.array() });
    }
    try {
      //check wheater the user already exist
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({sucess, error: " sorry! user already exist with this email Id" });
      }
      const salt = await bcrypt.genSalt(10); //generates a salt
      const securepw = await bcrypt.hash(req.body.password, salt); //creates a hash to the password by adding salt to the password
      //Create a new user with the encrypted password.
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: securepw,
      });
      //Create a data object containing the user's ID.
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET); //Generate a JWT token using jwt.sign with the data and the secret key.
      //console.log(authToken);
      sucess=true;

      res.json({ sucess,authToken }); //Send the generated JWT token as part of the response.
    } catch (error) {
      console.log(error.message);
    }
  }
);

//Route:2 Create a user using POST "/api/auth/login", doesn't require authentication

router.post(
  "/login",
  [
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Password cant be blank").exists(),
  ],
  async (req, res) => {
    let sucess=false;
    //if thre are eroor display the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      //If the user doesn't exist, or the password doesn't match, return a 400 status with an error message.
      if (!user) {
        sucess=false;
        return res.status(400).json({ errors: "Enter Vaid Details" });
      }
      const validationPassword = await bcrypt.compare(password, user.password);
      if (!validationPassword) {
        sucess=false;
        return res.status(400).json({ sucess,errors: "Enter Vaid Details" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET); //Generate a JWT token using jwt.sign with the data and the secret key.
      //console.log(authToken);
      sucess=true;
      res.json({ sucess,authToken }); //Send the generated JWT token as part of the response.
    } catch (error) {
      console.log(error.message);
    }
  }
);

//Route:3 Get logged user details using:post "'api/auth/getUser",Login required

/*1.This route ("/getuser") is protected, meaning it requires authentication.
 It uses the fetchuser middleware to ensure the user is authenticated before proceeding.
*/
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    //When a valid user accesses this route, it retrieves the user's ID from the decoded JWT token (stored in req.user.id), then fetches the user details from the database using User.findById.

    const userId = req.user.id;
    const user = await User.findById(userId).select("-password"); //The user's password is excluded from the response using .select("-password")  for security reasons.
    
    res.json(user); //The user details are sent as a JSON response using res.json(user).
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});


module.exports = router;
