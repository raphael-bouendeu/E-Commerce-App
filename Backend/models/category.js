const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    icon: {
        type: String,
    },
    color: {
        type: String
    },
    image: {
        type: String
    }
});

CategorySchema.virtual('id').get(function () {
    this._id.toHexString()
});
CategorySchema.set('toJSON', {
    virtuals: true
})

exports.Category = mongoose.model('Category', CategorySchema);