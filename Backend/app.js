const express = require('express');
const app = express();
require('dotenv/config');
const api = process.env.API_URL;
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors')
const bodyParser = require('body-parser')
var { expressjwt: jwt } = require("express-jwt");

const errorHandler = require('./helpers/error-handler');

async function isRevoked(req, token) {
    if (token.payload.isAdmin == false) {
        return true;
    }
    return false;
}

app.use(cors())
app.options('*', cors())

// Middleware
app.use(bodyParser.json())
app.use(morgan('tiny'))


app.use(
    jwt({
        secret: process.env.secret ? process.env.secret : "",
        algorithms: ["HS256"],
        isRevoked: isRevoked

    }).unless({
        path: [{
            url: /\/public\/uploads(.*)/, methods: ["GET", "OPTIONS"]
        },
        {
            url: /\/api\/v1\/categories(.*)/, methods: ["GET", "OPTIONS"]
        },
        {
            url: /\/api\/v1\/categories(.*)/, methods: ["GET", "OPTIONS"]
        }
            , `${api}/users/login`, `${api}/users/register`]
    })
);

app.use('/public/uploads', express.static(__dirname + '/public/uploads'))

app.use(errorHandler);

const productsRouter = require('./routers/products')
const usersRouter = require('./routers/users')
const categoriesRouter = require('./routers/categories')
const ordersRouter = require('./routers/orders')
const orderItemsRouter = require('./routers/orderItems');




// Routers
app.use(`${api}/products`, productsRouter)
app.use(`${api}/users`, usersRouter)
app.use(`${api}/categories`, categoriesRouter)
app.use(`${api}/orders`, ordersRouter)
app.use(`${api}/ordersItems`, orderItemsRouter)


const connectionToMongoDb = process.env.CONNECTION_STRING_TO_API;
mongoose.connect(`${connectionToMongoDb}`).then(() => console.log("DataBase connection ready"))
    .catch((err) => console.log(err))


app.listen(3000, () => {
    console.log(api)
    console.log("server is running on http //localhost:3000")
})