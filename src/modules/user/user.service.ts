import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/models/user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(data: User): Promise<User> {
    const user = this.userRepository.create(data);
    return this.userRepository.save(user);
  }

  async getAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getById(id: string): Promise<User> {
    return this.userRepository.findOneOrFail(id);
  }

  async update(id: string, data: User): Promise<User> {
    const user = await this.userRepository.findOneOrFail(id);
    const updatedUser = this.userRepository.merge(user, data);
    return this.userRepository.save(updatedUser);
  }

  async destroy(id: string): Promise<void> {
    await this.userRepository.findOneOrFail(id);
    await this.userRepository.delete(id);
  }
}
