const express = require('express');
const { OrderItem } = require('../models/orderItem');
const router = express.Router();

router.get('/', async (req, res) => {
    const OrderItemList = await OrderItem.find()
    if (!OrderItemList) {
        res.status(500).json({
            success: false
        })
    }
    res.send(OrderItemList)
});
router.post("/", (req, res) => {
    const newOrderItem = new OrderItem({
        name: req.body.name,
        image: req.body.image,
        countInStock: req.body.countInStock
    })
    newOrderItem.save().then((createdOrderItem) => {
        res.status(201).json(createdOrderItem)
    }).catch((err) => {
        res.status(500).json({
            error: err,
            success: false
        })
    })

})

module.exports = router;