import express from "express"
import * as UserController from "../controller/user.controller.js"
import * as Middlware from "../middleware/auth.js"
import * as ProductController from "../controller/products.controller.js"
import multer from 'multer';
const router = express.Router()
const upload = multer();

// Create user router
router.post('/register',UserController.register)
router.post('/login',UserController.login)

// admin dashboad route
router.post('/createproduct',upload.single('image_url'),
Middlware.Authentocation,
Middlware.admin,
ProductController.createProductController)

router.post('/updateproduct/:id',upload.single('image_url'),
Middlware.Authentocation,
Middlware.admin,
ProductController.updateProductsController)

// public router
router.get('/', ProductController.getAllProductController)
router.get('/products/:id', ProductController.getOneproductController)



export default router