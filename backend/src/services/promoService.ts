import { PromoEntity } from '../types/entities';
import { IPromoRepository } from '../repositories/interfaces';

export class PromoService {
  constructor(private promoRepository: IPromoRepository) {}

  validatePromo(promoId: string): { isValid: boolean; promo?: PromoEntity; error?: string } {
    const promo = this.promoRepository.findById(promoId);
    
    if (!promo) {
      return { isValid: false, error: 'Promo not found' };
    }

    const currentTime = Date.now();
    if (currentTime > promo.dueDate) {
      return { isValid: false, error: 'Promo expired' };
    }

    return { isValid: true, promo };
  }
}
