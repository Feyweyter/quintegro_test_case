import { Request, Response } from 'express';
import { OrderService } from '../services/orderService';
import { AuthService } from '../services/authService';

export class OrderController {
  constructor(
    private orderService: OrderService,
    private authService: AuthService
  ) {}

  private extractUserIdFromToken(req: Request): string | null {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }

    const token = authHeader.substring(7);
    const decoded = this.authService.verifyToken(token);
    
    if (!decoded || !decoded.userId) {
      return null;
    }

    return decoded.userId;
  }

  async getOrders(req: Request, res: Response) {
    try {
      const userId = this.extractUserIdFromToken(req);
      
      if (!userId) {
        return res.status(403).json({ error: 'Invalid or missing authentication token' });
      }

      const orders = await this.orderService.getOrdersByUserId(userId);
      return res.status(200).json(orders);
    } catch (error) {
      console.error('Get orders error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getOrderById(req: Request, res: Response) {
    try {
      const userId = this.extractUserIdFromToken(req);
      
      if (!userId) {
        return res.status(403).json({ error: 'Invalid or missing authentication token' });
      }

      const { orderId } = req.params;
      const order = await this.orderService.getOrderById(orderId, userId);

      if (!order) {
        return res.status(404).json({ error: 'Order not found or access denied' });
      }

      return res.status(200).json(order);
    } catch (error) {
      console.error('Get order by id error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}
