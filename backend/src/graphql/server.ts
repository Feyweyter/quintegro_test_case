import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './schema';
import { createResolvers } from './resolvers';
import { OrderService } from '../services/orderService';
import { AuthService } from '../services/authService';

export const createApolloServer = (orderService: OrderService, authService: AuthService) => {
  const resolvers = createResolvers(orderService, authService);

  return new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req }),
    formatError: (error) => {
      console.error('GraphQL Error:', error);
      return {
        message: error.message,
        path: error.path
      };
    },
    introspection: true,
    playground: true
  });
};
