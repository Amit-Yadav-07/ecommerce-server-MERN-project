const express = require('express');
const app = express();
require('dotenv').config()
const morgan = require('morgan')
const cors = require('cors')
const userRouter = require('./Routes/userRoute.js');
const productRouter = require('./Routes/productRoute.js');
const path = require('path');
const notFound = require('./Middleware/not-found.js')
const errorHandler = require('./Middleware/error-handler.js')

const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})


// DB
const connectDB = require('./DB/connection.js');

app.use(cors())
app.use(express.json())

app.use(express.static(path.join(__dirname, 'public')));

// user route
app.use('/api/v1/auth', userRouter)
app.use('/api/v1/products', productRouter)

// custom middleware
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;

const start = async () => {

    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`server is running at port no ${port}`);
        })

    } catch (error) {
        console.log(error);
    }
}

start();