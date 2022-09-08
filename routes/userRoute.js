const express = require('express')
const { addUser, userConfirmation, resendConfirmation, forgetpassword, resetPassword, signin, singOut, updateUser, requiredSignin, deleteUser, userList, userDetails } = require('../controllers/userController')
const { userRules, validate } = require('../validation')
const router = express.Router()

router.post('/register', userRules, validate, addUser)
router.get('/verifyUser/:token', userConfirmation)
router.post('/resendconfirmation', resendConfirmation)
router.post('/forgetpassword', forgetpassword)
router.post('/resetpassword/:token', resetPassword)
router.post('/signin', signin)
router.get('/signout', singOut)
router.put('/updateuser/:id', requiredSignin, updateUser)
router.delete('/deleteuser/:id', deleteUser)
router.get('/userlist', userList)
router.get('/userdetails/:id', userDetails)

module.exports = router