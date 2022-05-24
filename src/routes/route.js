const express = require("express");
const router = express.Router();
const aws= require("aws-sdk")
const userController=require("../controllers/userController")



router.post('/register', userController.createUser );  //CreateUser

router.post('/login', userController.loginUser );

router.get('/user/:userId/profile',userController.getUserProfile )

router.put('/user/:userId/profile', userController.updateUser );












module.exports = router;