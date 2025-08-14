import { Router } from 'express';
import { OrderController } from '../controllers/orderController';

export function createOrderRoutes(orderController: OrderController): Router {
  const router = Router();

  /**
   * @swagger
   * /order:
   *   get:
   *     summary: Get all orders for the authenticated user
   *     tags: [Orders]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: List of user orders
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/OrderDTO'
   *       403:
   *         description: Forbidden - Invalid or missing authentication token
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: string
   *                   example: "Invalid or missing authentication token"
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
  router.get('/', (req, res) => orderController.getOrders(req, res));

  /**
   * @swagger
   * /order/{orderId}:
   *   get:
   *     summary: Get specific order by ID
   *     tags: [Orders]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: orderId
   *         required: true
   *         schema:
   *           type: string
   *         description: Unique identifier of the order
   *         example: "order-1"
   *     responses:
   *       200:
   *         description: Order details
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/OrderDTO'
   *       403:
   *         description: Forbidden - Invalid token or user is not owner of the order
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: string
   *                   example: "Invalid or missing authentication token"
   *       404:
   *         description: Order not found or access denied
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: string
   *                   example: "Order not found or access denied"
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
  router.get('/:orderId', (req, res) => orderController.getOrderById(req, res));

  /**
   * @swagger
   * /order/{orderId}/sum:
   *   post:
   *     summary: Calculate sum of an order
   *     tags: [Orders]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: orderId
   *         required: true
   *         schema:
   *           type: string
   *         description: Unique identifier of the order
   *         example: "order-1"
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - products
   *             properties:
   *               products:
   *                 type: array
   *                 items:
   *                   type: object
   *                   required:
   *                     - id
   *                     - amount
   *                     - price
   *                   properties:
   *                     id:
   *                       type: string
   *                       description: Product ID
   *                       example: "product-1"
   *                     amount:
   *                       type: number
   *                       minimum: 0
   *                       description: Product quantity
   *                       example: 2
   *                     price:
   *                       type: number
   *                       minimum: 0
   *                       description: Product price
   *                       example: 1299.99
   *     responses:
   *       200:
   *         description: Order sum calculated successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: number
   *               description: Total sum of the order
   *               example: 2599.98
   *       400:
   *         description: Bad request - Invalid products data
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: string
   *                   example: "Products array is required"
   *       403:
   *         description: Forbidden - Invalid authentication token
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: string
   *                   example: "Invalid or missing authentication token"
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
  router.post('/:orderId/sum', (req, res) => orderController.calculateOrderSum(req, res));

  return router;
}
