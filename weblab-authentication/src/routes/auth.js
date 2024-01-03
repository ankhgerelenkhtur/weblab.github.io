const express = require('express');
const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User related endpoint
 */

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Burtgeh
 *     tags: [Authentication]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: User successfully registered
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/signup', userService.registerUser);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Usershalgah
 *     tags: [Authentication]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: User successfully logged in
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
 */
router.post('/login', userService.authenticateUser);

module.exports = router;
