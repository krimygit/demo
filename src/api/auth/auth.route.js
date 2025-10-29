const express = require('express');
const authController = require('./auth.controller');
const validate = require('../../middlewares/validate');
const authValidation = require('./auth.validation');
const router = express.Router();
const multer = require('multer')
var storage = multer.diskStorage({});
var upload = multer({ storage: storage });
const auth = require('../../middlewares/auth');



/**
 * @swagger
 * /auth/registerAdmin:
 *   post:
 *     summary: Register a new admin to the application
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - password
 *               - status
 *               - userRole
 *               - profileImageUrl
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: John
 *               lastName:
 *                 type: string
 *                 example: Doe
 *               email:
 *                 type: string
 *                 example: john@mailinator.com
 *               password:
 *                 type: string
 *                 example: Test@123
 *               status:
 *                 type: string
 *                 enum: ["Enable", "Disable", "Deleted"]
 *                 default: "Enable"
 *               userRole:
 *                 type: string
 *                 enum: ["Admin"]
 *                 default: "Admin"
 *               profileImageUrl:
 *                 type: string
 *                 example: "https://example.com/image.jpg"
 *     responses:
 *       200:
 *         description: You have successfully created an account!!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: You have successfully created an account!!
 */


router.post('/registerAdmin', validate(authValidation.registerAdmin), authController.registerAdmin);



module.exports = router;