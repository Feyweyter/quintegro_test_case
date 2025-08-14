import { Request, Response } from 'express';
import { PromoService } from '../services/promoService';

export class PromoController {
  constructor(private promoService: PromoService) {}

  async getPromo(req: Request, res: Response) {
    try {
      const { promoId } = req.params;

      if (!promoId) {
        return res.status(400).json({ error: 'Promo ID is required' });
      }

      const validation = this.promoService.validatePromo(promoId);

      if (!validation.isValid) {
        if (validation.error === 'Promo not found') {
          return res.status(404).json({ error: 'Promo not found' });
        } else if (validation.error === 'Promo expired') {
          return res.status(401).json({ error: 'Promo expired' });
        }
      }

      return res.status(200).json(validation.promo);
    } catch (error) {
      console.error('Get promo error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}
