import { App } from './app';

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  const app = new App();
  app.listen(PORT);
};

startServer().catch(console.error);
