const express = require('express');
const { Category } = require('../models/category');
const { Product } = require('../models/product');
const router = express.Router();
const mongoose = require('mongoose')
const multer = require('multer');


const FILE_TYP_MAP = {
    'image/pmg': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = FILE_TYP_MAP[file.mimetype]
        let uploadError = new Error('invalid image type');
        if (isValid) {
            uploadError = null;
        }
        cb(uploadError, 'public/uploads')
    },
    filename: function (req, file, cb) {
        const filename = file.originalname.replace(" ", "-");
        const extension = FILE_TYP_MAP[file.mimetype]
        cb(null, `${filename}-${Date.now()}.${extension}`);
    },

})

const uploadOptions = multer({ storage: storage })


router.get('/', async (req, res) => {
    let filter = {};
    // localhost:3000/api/v1/products?categories=2424242,62626262  query 
    if (req.query.categories) {
        filter = { category: req.query.categories.split(',') }
    }

    const productList = await Product.find(filter).populate('category');
    //const productList = await Product.find({categories:["2424242","62626262"]})
    //const productList = await Product.find().populate('category')

    // select only name image ohne id
    //const productList = await Product.find().select("name image -_id")
    if (!productList) {
        res.status(500).json({
            success: false
        })
    }
    res.send(productList)
});
router.get('/:id', async (req, res) => {
    const product = await Product.findById(req.params.id).populate('category')
    if (!product) {
        res.status(500).json({
            success: false
        })
    }
    res.send(product)
});

router.get('/get/count', async (req, res) => {
    const productCount = await Product.countDocuments().then(count => count)
    if (!productCount) {
        res.status(500).json({
            success: false
        })
    }
    res.send({
        productCount
    })
});

router.post("/", uploadOptions.single('image'), async (req, res) => {

    const category = await Category.findById(req.body.category)
    if (!category) {
        return res.status(400).send('Invalid Category')
    }

    const file = req.file;
    if (!file) {
        return res.status(400).send('No Imge in the Request')
    }
    const fileName = req.file?.filename
    const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`
    let newProduct = new Product({
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: `${basePath}${fileName}`,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured,

    });
    newProduct = await newProduct.save()
    if (!newProduct) {
        return res.status(400).send('the Product cannot be created!')
    }
    res.status(201).send(newProduct);

})



router.put('/:id', uploadOptions.single('image'), async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send('Invalid Product Id')
    }
    const category = await Category.findById(req.body.category)
    if (!category) {
        return res.status(400).send('Invalid Category')
    }

    const product = await Product.findById(req.params.id)
    if (!product) {
        return res.status(400).send('Invalid Product')
    }
    const file = req.file;
    let imagePath;
    if (file) {
        const fileName = req.file?.filename
        const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
        imagePath = `${basePath}${fileName}`
    } else {
        imagePath = product.image;
    }

    const productToUpdate = await Product.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: imagePath,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured,
    }, {
        new: true
    })
    if (!productToUpdate) {
        return res.status(400).send('the product cannot be updated!')
    }
    res.send(productToUpdate);
})

router.delete('/:id', (req, res) => {
    Category.findById(req.body.category).then(category => {

    }).catch(err => {
        return res.status(500).json({
            success: false,
            error: err
        })
    })

    Product.findByIdAndRemove(req.params.id).then(product => {
        if (product) {
            return res.status(200).json({
                success: true, message: 'the product is deleted'
            })

        }
        else {
            return res.status(404).json({
                success: false,
                message: 'product not found'
            })
        }
    }).catch(err => {
        return res.status(500).json({
            success: false,
            error: err
        })
    })
})


router.get('/get/featured/:count', async (req, res) => {
    const count = req.params.count ? req.params.count : 0
    const products = await Product.find({ isFeatured: true }).limit(+count)
    if (!products) {
        res.status(500).json({
            success: false
        })
    }
    res.send({
        products
    })
});

router.put(
    '/gallery-images/:id',
    uploadOptions.array('images', 10),
    async (req, res) => {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).send('Invalid Product Id')
        }
        const files = req.files;
        let imagesPaths = [];
        const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;

        if (files) {
            files.map(file => {
                imagesPaths.push(`${basePath}${file.filename}`);
            })
        }

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            {
                images: imagesPaths
            },
            { new: true }
        )

        if (!product)
            return res.status(500).send('the gallery cannot be updated!')

        res.send(product);
    }
)
module.exports = router;