import { UserRecord, AuthRecord } from '../types/entities';
import { IUserRepository, IAuthRepository } from './interfaces';

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
