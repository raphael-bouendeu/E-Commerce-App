const express = require('express');
const { Category } = require('../models/category');
const router = express.Router();

router.get('/', async (req, res) => {
    const categoryList = await Category.find()
    if (!categoryList) {
        res.status(500).json({
            success: false
        })
    }
    res.status(200).send(categoryList)
});

router.get('/:id', async (req, res) => {
    const category = await Category.findById(req.params.id)
    if (!category) {
        res.status(500).json({
            success: false,
            message: "The category with the given ID was not found."
        })
    }
    res.status(200).send(category)
});
// with the new :true, we return the new dada, sonst bekommen wir die old Data
router.put('/:id', async (req, res) => {
    const category = await Category.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color
    }, {
        new: true
    })
    if (!category) {
        return res.status(400).send('the category cannot be updated!')
    }
    res.send(category);
})

router.post("/", async (req, res) => {
    /*  
    router.post("/",  (req, res) => {
    let newcategory = new Category({
          name: req.body.name,
          icon: req.body.icon,
          color: req.body.color
  
      })
       newcategory.save().then((createdProduct) => {
          res.status(201).json(createdProduct)
      }).catch((err) => {
          res.status(500).json({
              error: err,
              success: false
          })
      })
   */

    let newcategory = new Category({
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color

    })
    newcategory = await newcategory.save();
    if (!newcategory) {
        return res.status(400).send('the category cannot be created!')
    }
    res.send(newcategory);

})
// api/v1/categories/id
router.delete('/:id', (req, res) => {
    Category.findByIdAndRemove(req.params.id).then(category => {
        if (category) {
            return res.status(200).json({
                success: true, message: 'the category is deleted'
            })

        }
        else {
            return res.status(404).json({
                success: false,
                message: 'category not found'
            })
        }
    }).catch(err => {
        return res.status(500).json({
            success: false,
            error: err
        })
    })
})

module.exports = router;