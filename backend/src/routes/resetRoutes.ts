import { Router } from 'express';
import cors from 'cors';
import { InMemoryOrderRepository } from '../repositories/implementations';

export function createResetRoutes(repositories: InMemoryOrderRepository[]): Router {
  const router = Router();

  router.get('/', cors({ origin: '*' }), (_req, res) => {
    repositories.forEach(repo => repo.reset());
    res.json({ status: 'OK', message: 'Order repository reset to default state' });
  });

  return router;
}
