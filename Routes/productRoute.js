const express = require('express');
const router = express.Router()
const { auth, isAdmin } = require('../middleware/auth.js')
const { allProducts, getAllProducts, singleProduct, editProduct, deleteProduct, addProductImage } = require('../Controllers/productController.js')
const upload = require('../middleware/multerMiddleware.js')

router.post('/', allProducts)

router.get('/singleProduct/:id', singleProduct);
router.get('/allProducts', getAllProducts);
router.patch('/:id', editProduct);
router.patch('/photoUpload/:id', upload.single('image'), addProductImage);
router.delete('/:id', deleteProduct);

module.exports = router;