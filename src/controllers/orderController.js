const cartModel = require("../models/cartModel")
const orderModel = require("../models/orderModel")
const validator = require("../utils/validator")
const userModel = require("../models/userModel")
const productModel = require("../models/productModel")



const createOrder = async function (req, res) {
    try {
        let UserId = req.params.userId
        let data = req.body

        if (!validator.isValidObjectId(UserId)) {
            return res.status(400).send({ status: false, msg: 'invalid User ID' })
        }

        let userid = await userModel.findById({ _id: UserId })
        if (!userid) {
            return res.status(400).send({ status: false, msg: 'user does not exist' })
        }
        if (!validator.isValidDetails(data)) {
            return res.status(400).send({ status: false, msg: 'please enter order details' })
        }

        let { cartId, status, cancellable } = data

        if (!validator.isValidObjectId(cartId)) {
            return res.status(400).send({ status: false, msg: 'cart Id is invalid' })
        }

        let isCartId = await cartModel.findById({ _id: cartId })
        if (!isCartId) {
            return res.status(400).send({ status: false, msg: 'cart ID does not exist' })
        }

        if (status)
            if (!validator.isValidStatus(status)) {
                return res.status(400).send({ status: false, msg: 'Please enter valid status' })
            }

        if (cancellable)
            if (typeof (cancellable) != "boolean") {
                return res.status(400).send({ status: false, msg: 'please enter valid value' })
            }

        let totalQuantityInCart = 0
        for (let i = 0; i < isCartId.items.length; i++) {
            totalQuantityInCart += isCartId.items[i].quantity

        }

        if (isCartId.totalItems.length == 0) {
            return res.status(202).send({ status: false, msg: "Order Already placed or cart is deleted" });
        }

        let newOrder = {
            userId: UserId,
            items: isCartId.items,
            totalPrice: isCartId.totalPrice,
            totalItems: isCartId.totalItems,
            totalQuantity: totalQuantityInCart
        }

        const create = await orderModel.create(newOrder)

        return res.status(201).send({ status: true, msg: 'order placed successfully', data: create })
    }

    catch (err) {
        console.log(err)
        res.status(500).send({ message: err.message })
    }
}

module.exports.createOrder = createOrder






