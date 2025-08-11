import { Router } from 'express';
import { AuthController } from '../controllers/authController';

export function createAuthRoutes(authController: AuthController): Router {
  const router = Router();

  /**
   * @swagger
   * /login:
   *   post:
   *     summary: Authenticate user and get JWT token
   *     tags: [Authentication]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - login
   *               - password
   *             properties:
   *               login:
   *                 type: string
   *                 description: User login
   *                 example: "john.doe"
   *               password:
   *                 type: string
   *                 description: User password
   *                 example: "password123"
   *     responses:
   *       200:
   *         description: Authentication successful
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 token:
   *                   type: string
   *                   description: JWT token
   *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
   *       400:
   *         description: Bad request - missing required fields
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: string
   *                   example: "Login and password are required"
   *       401:
   *         description: Unauthorized - invalid credentials
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: string
   *                   example: "Invalid credentials"
   *       500:
   *         description: Internal server error
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: string
   *                   example: "Internal server error"
   */
  router.post('/login', (req, res) => authController.login(req, res));

  return router;
}
