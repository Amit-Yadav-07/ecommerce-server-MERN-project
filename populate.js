
// const readFile = require('fs/promises')
const mongoose = require('mongoose')
require('dotenv').config()
const products = require('./models/productModel.js');
const User = require('./models/userModel.js')


const uploadData = async () => {
    try {
        mongoose.connect(process.env.MONGO_URI)
        const user = await User.findOne({ role: 'admin' });
        // console.log(user.role);
        // const jsonProducts = JSON.parse(await readFile(new URL('./products.json', import.meta.url)))
        // const jsonProducts = readFile('')
        // console.log(jsonProducts);

        const jobs = jsonProducts.map((product) => {
            return { ...product, createdBy: user._id }
        })

        await products.deleteMany({ createdBy: user._id })
        await products.create(jobs)
        console.log('success !!!');
        process.exit(0)

    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

uploadData();