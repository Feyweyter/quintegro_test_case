import { UserRecord, AuthRecord, OrderRecord, ProductRecord } from '../types/entities';
import { IUserRepository, IAuthRepository, IOrderRepository, IProductRepository } from './interfaces';

export class InMemoryUserRepository implements IUserRepository {
  private users: UserRecord[] = [
    {
      id: "user-1",
      name: "John Doe"
    },
    {
      id: "user-2", 
      name: "Jane Smith"
    }
  ];

  findById(id: string): UserRecord | undefined {
    return this.users.find(user => user.id === id);
  }

  findAll(): UserRecord[] {
    return [...this.users];
  }
}

export class InMemoryAuthRepository implements IAuthRepository {
  private authRecords: AuthRecord[] = [
    {
      userId: "user-1",
      login: "john.doe",
      password: "password123"
    },
    {
      userId: "user-2",
      login: "jane.smith", 
      password: "password456"
    }
  ];

  findByLogin(login: string): AuthRecord | undefined {
    return this.authRecords.find(auth => auth.login === login);
  }

  findByLoginAndPassword(login: string, password: string): AuthRecord | undefined {
    return this.authRecords.find(auth => 
      auth.login === login && auth.password === password
    );
  }

  findAll(): AuthRecord[] {
    return [...this.authRecords];
  }
}

export class InMemoryProductRepository implements IProductRepository {
  private products: ProductRecord[] = [
    {
      id: "product-1",
      title: "Laptop",
      description: "High-performance laptop with latest specifications and great battery life. Perfect for work and gaming.",
      image: "/productImg/laptop.svg"
    },
    {
      id: "product-2",
      title: "Smartphone",
      description: "Modern smartphone with advanced camera system and long-lasting battery. Features the latest mobile technology.",
      image: "/productImg/smartphone.svg"
    },
    {
      id: "product-3",
      title: "Headphones",
      description: "Wireless noise-canceling headphones with premium sound quality and comfortable design for extended use.",
      image: "/productImg/headphones.svg"
    },
    {
      id: "product-4",
      title: "Tablet",
      description: "Lightweight tablet perfect for entertainment and productivity. Features a high-resolution display and fast processor.",
      image: "/productImg/tablet.svg"
    }
  ];

  findById(id: string): ProductRecord | undefined {
    return this.products.find(product => product.id === id);
  }

  findAll(): ProductRecord[] {
    return [...this.products];
  }
}

export class InMemoryOrderRepository implements IOrderRepository {
  private orders: OrderRecord[] = [
    {
      orderId: "order-1",
      userId: "user-1",
      status: "finished",
      createAt: Date.now() - 86400000, // 1 day ago
      products: [
        { id: "product-1", amount: 1, price: 1299.99 },
        { id: "product-3", amount: 2, price: 199.99 }
      ]
    },
    {
      orderId: "order-2",
      userId: "user-1",
      status: "created",
      createAt: Date.now(),
      products: [
        { id: "product-2", amount: 1, price: 899.99 },
        { id: "product-4", amount: 1, price: 599.99 }
      ]
    }
  ];

  findById(orderId: string): OrderRecord | undefined {
    return this.orders.find(order => order.orderId === orderId);
  }

  findByUserId(userId: string): OrderRecord[] {
    return this.orders.filter(order => order.userId === userId);
  }

  findAll(): OrderRecord[] {
    return [...this.orders];
  }

  update(order: OrderRecord): void {
    const index = this.orders.findIndex(o => o.orderId === order.orderId);
    if (index !== -1) {
      this.orders[index] = order;
    }
  }
}
