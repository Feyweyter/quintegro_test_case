import { Router } from 'express';
import { PromoController } from '../controllers/promoController';

export function createPromoRoutes(promoController: PromoController): Router {
  const router = Router();

  /**
   * @swagger
   * /promo/{promoId}:
   *   get:
   *     summary: Get promo by ID
   *     tags: [Promos]
   *     parameters:
   *       - in: path
   *         name: promoId
   *         required: true
   *         schema:
   *           type: string
   *         description: Unique identifier of the promo
   *         example: "SAVE10"
   *     responses:
   *       200:
   *         description: Promo is valid and not expired
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: string
   *                   description: Promo code
   *                   example: "SAVE10"
   *                 discount:
   *                   type: number
   *                   description: Discount percentage
   *                   example: 10
   *                 dueDate:
   *                   type: number
   *                   description: Expiration timestamp
   *                   example: 1703123456789
   *       400:
   *         description: Bad request - Missing promo ID
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: string
   *                   example: "Promo ID is required"
   *       401:
   *         description: Promo expired
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: string
   *                   example: "Promo expired"
   *       404:
   *         description: Promo not found
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: string
   *                   example: "Promo not found"
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
  router.get('/:promoId', (req, res) => promoController.getPromo(req, res));

  return router;
}
