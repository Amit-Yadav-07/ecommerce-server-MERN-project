
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Product name is required"],
            trim: true,
        },
        description: {
            type: String,
            required: [true, "Product description is required"],
        },
        price: {
            type: Number,
            required: [true, "Product price is required"],
            min: 0,
        },
        // category: {
        //     type: String,
        //     required: [true, "Product category is required"],
        // },
        brand: {
            type: String,
            required: [true, "brand is required"],
        },
        // stock: {
        //     type: Number,
        //     required: true,
        //     min: 0,
        //     default: 0,
        // },
        images: {
            type: [''],
            default: []
        }
        ,
        // ratings: {
        //     type: Number,
        //     default: 0,
        // },
        // reviews: [
        //     {
        //         user: {
        //             type: mongoose.Schema.Types.ObjectId,
        //             ref: "users",
        //         },
        //         name: {
        //             type: String,
        //             required: true,
        //         },
        //         rating: {
        //             type: Number,
        //             required: true,
        //             min: 1,
        //             max: 5,
        //         },
        //         comment: {
        //             type: String,
        //         },
        //     },
        // ],
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

const Product = mongoose.model("Products", productSchema);
module.exports = Product;
