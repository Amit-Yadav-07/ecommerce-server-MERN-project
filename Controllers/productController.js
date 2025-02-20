const ProductModal = require('../models/productModel')
const { StatusCodes } = require('http-status-codes');
const path = require('path')
const NotFoundError = require('../errors/not-found');
const cloudinary = require('cloudinary').v2

// set products
const allProducts = async (req, res) => {
    const { name, brand, description, price } = req.body

    if (!name || !brand || !description || !price) {
        return res.status(StatusCodes.BAD_GATEWAY).send({ msg: 'please provide product values' })
    }

    try {
        const products = await ProductModal.create(req.body)
        return res.status(StatusCodes.CREATED).json({ msg: 'product created' })
    } catch (error) {
        console.log(error);
    }

}

// GetAllProducts
const getAllProducts = async (req, res) => {

    try {
        const products = await ProductModal.find({})
        // console.log(products);
        return res.status(StatusCodes.OK).json({ products })
    } catch (error) {
        console.log(error);
    }
}

// singleProducts
const singleProduct = async (req, res) => {

    const { id } = req.params

    try {
        const product = await ProductModal.findById(id);

        if (!product) {
            return res.status(StatusCodes.NOT_FOUND).json({ msg: `no product with id ${id}` })
        }
        return res.status(StatusCodes.OK).json({ product })

    } catch (error) {
        console.log(error);
    }

}

// editProducts
const editProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const updatedProduct = await ProductModal.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedProduct) {
            return res.status(StatusCodes.NOT_FOUND).json({ msg: `no product with id ${id}` })
        }
        return res.status(StatusCodes.OK).json({ msg: 'product modified', updatedProduct });

    } catch (error) {
        console.log(error);
    }
}

// deleteProducts
const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const deleteProduct = await ProductModal.findByIdAndDelete(id);

        if (!deleteProduct) {
            return res.status(StatusCodes.NOT_FOUND).json({ msg: `no product with id ${id}` })
        }
        return res.status(StatusCodes.OK).json({ msg: 'job deleted', job: deleteProduct });
    } catch (error) {
        console.log(error);
    }
}

// upload images
const addProductImage = async (req, res) => {
    const { id: productId } = req.params;

    if (!req.file) {
        return res.status(StatusCodes.BAD_REQUEST).send("No file uploaded");
    }

    try {
        // Full path where the file is stored
        const fullPath = req.file.path;

        const uploadedImage = await cloudinary.uploader.upload(fullPath);

        // Extract only the relative path to be used in frontend
        const relativePath = `public/images/${req.file.filename}`;

        // Update the product with the image URL
        const updatedProduct = await ProductModal.findByIdAndUpdate(
            productId,
            { $push: { images: uploadedImage.secure_url } },
            // { images: uploadedImage.secure_url }, // Store relative image path
            { new: true } // Return the updated document
        );

        return res.status(StatusCodes.OK).json({ imagePath: updatedProduct });

    } catch (error) {
        console.log(error);
    }


};


module.exports = { allProducts, singleProduct, getAllProducts, editProduct, deleteProduct, addProductImage };