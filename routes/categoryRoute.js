const express = require('express')
const { addCategory, viewCategories, categoryDetails, updateCategory, deleteCategory } = require('../controllers/categoryController')
const { requiredSignin } = require('../controllers/userController')
const { categoryRules, validate } = require('../validation')
const router = express.Router()

router.post('/postCategory', categoryRules, validate,  requiredSignin, addCategory)
router.get('/viewcategories', viewCategories)
router.get('/categorydetails/:id', categoryDetails)
router.put('/updatecategory/:id', requiredSignin, updateCategory)
router.delete('/deletecategory/:id', requiredSignin, deleteCategory)

module.exports = router