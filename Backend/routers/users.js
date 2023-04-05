const express = require('express');
const { User } = require('../models/user');
const bcrypt = require('bcryptjs')
const router = express.Router();
const jwt = require('jsonwebtoken')


router.post("/register", async (req, res) => {
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

    let user = new User({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        passwordHash: bcrypt.hashSync(req.body.password, 10),
        color: req.body.color,
        isAdmin: req.body.isAdmin,
        street: req.body.street,
        appartment: req.body.appartment,
        zip: req.body.zip,
        city: req.body.city,
        country: req.body.country

    })
    user = await user.save();
    if (!user) {
        return res.status(400).send('the user cannot be created!')
    }
    res.send(user);

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

    let user = new User({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        passwordHash: bcrypt.hashSync(req.body.password, 10),
        color: req.body.color,
        isAdmin: req.body.isAdmin,
        street: req.body.street,
        appartment: req.body.appartment,
        zip: req.body.zip,
        city: req.body.city,
        country: req.body.country

    })
    user = await user.save();
    if (!user) {
        return res.status(400).send('the user cannot be created!')
    }
    res.send(user);

})

router.get('/', async (req, res) => {
    //const userList = await User.find()
    const userList = await User.find().select('-passwordHash')
    //const userList = await User.find().select('name phone email');
    if (!userList) {
        res.status(500).json({
            success: false
        })
    }
    res.status(200).send(userList)
});


router.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id).select('-passwordHash')
    if (!user) {
        res.status(500).json({
            success: false,
            message: "The user with the given ID was not found."
        })
    }
    res.status(200).send(user)
});

router.put('/:id', async (req, res) => {
    const userExist = await User.findById(req.params.id);
    let newPassword;
    if (req.body.password) {
        newPassword = bcrypt.hashSync(req.body.password, 10);
    } else {
        newPassword = userExist?.passwordHash;
    }

    const user = await User.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        passwordHash: newPassword,
        color: req.body.color,
        isAdmin: req.body.isAdmin,
        street: req.body.street,
        appartment: req.body.appartment,
        zip: req.body.zip,
        city: req.body.city,
        country: req.body.country

    }, {
        new: true
    })
    if (!user) {
        return res.status(400).send('the user cannot be updated!')
    }
    res.send(user);
})

router.post('/login', async (req, res) => {
    let secret = ''
    if (process.env.secret) {
        secret = process.env.secret
    }

    const user = await User.findOne({ email: req.body.email })
    if (!user) {
        return res.status(400).send("The User not found")
    }

    if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
        const token = jwt.sign({
            userId: user.id,
            isAdmin: user.isAdmin
        }, secret, {
            expiresIn: '1d'
        }
        )
        res.status(200).send({ user: user.email, token: token })
    } else {
        res.status(400).send("password is wrong!")
    }

})

router.get('/get/count', async (req, res) => {
    const userCount = await User.countDocuments().then(count => count)
    if (!userCount) {
        res.status(500).json({
            success: false
        })
    }
    res.send({
        userCount
    })
});

router.delete('/:id', (req, res) => {
    User.findByIdAndRemove(req.params.id).then(user => {
        if (user) {
            return res.status(200).json({
                success: true, message: 'the user is deleted'
            })

        }
        else {
            return res.status(404).json({
                success: false,
                message: 'user not found'
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