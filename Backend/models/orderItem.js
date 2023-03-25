const mongoose = require('mongoose');

const OrderItemSchema = new mongoose.Schema({
    quantity: {
        type: Number,
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }
});


OrderItemSchema.virtual('id').get(function () {
    this._id.toHexString()
});
OrderItemSchema.set('toJSON', {
    virtuals: true
})

exports.OrderItem = mongoose.model('OrderItem', OrderItemSchema);