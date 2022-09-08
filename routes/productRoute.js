const express = require('express')
const { addProduct, viewProducts, productDetails, updateProduct, deleteProduct, findProductbyCategory, filterProduct, relatedProducts } = require('../controllers/productController')
const { requiredSignin } = require('../controllers/userController')
const { upload } = require('../utils/upload')
const { productRules, validate } = require('../validation')
const router = express.Router()

router.post('/addproduct', upload.single('product_image'), productRules, validate, requiredSignin, addProduct)
router.get('/productlist', viewProducts)
router.get('/productdetails/:product_id', productDetails)
router.put('/updateproduct/:id', requiredSignin, updateProduct)
router.delete('/deleteproduct/:id', requiredSignin, deleteProduct)
router.get('/findbycategory/:category_id', findProductbyCategory)
router.post('/getfilteredProduct', filterProduct)
router.get('/relatedproducts/:id', relatedProducts)

module.exports = router