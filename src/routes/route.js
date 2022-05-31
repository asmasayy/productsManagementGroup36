const express = require("express");
const router = express.Router();
const aws= require("aws-sdk")
const userController=require("../controllers/userController")
const middleware=require('../utils/auth')
const productController=require("../controllers/productController")
const cartController=require("../controllers/cartController")


router.post('/register', userController.createUser );  //CreateUser

router.post('/login', userController.loginUser );

router.get('/user/:userId/profile',middleware.userAuth,userController.getUserProfile )

router.put('/user/:userId/profile', middleware.userAuth, middleware.Authorisation,userController.updateUser );

// ----------------------------------Product Routes-------------------------------------------//

router.post('/products', productController.createProduct );

router.put('/products/:productId', productController.updateproduct);

router.get('/products',productController.getproducts)

router.get('/products/:productId',productController.getProductById)

router.delete('/products/:productId',productController.deleteProductById)

// ----------------------------Cart Routes---------------------------------------------//

router.post('/users/:userId/cart', cartController.createCart );

router.put('/users/:userId/cart', cartController.updateCart);

router.get('/users/:userId/cart',middleware.userAuth, middleware.Authorisation,cartController.getCartDetails)

router.delete('/users/:userId/cart',cartController.deleteCart)

// if api is invalid OR wrong URL
router.all("/*", function (req, res) {
    res
      .status(404)
      .send({ status: false, msg: "The api you requested is not available" });
  });

module.exports = router;