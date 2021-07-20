import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/models/user.model';

@Controller('users')
export class UserController {
  // constructor(
  //   @InjectRepository(User)
  //   private userRepository: Repository<User>,
  // ) {}
  constructor(private readonly userService: UserService) {}

  @Post()
  store(@Body() body: User): Promise<User> {
    try {
      return this.userService.create(body);
    } catch (error) {
      throw error;
    }
  }

  @Get()
  index(): Promise<User[]> {
    return this.userService.getAll();
  }

  @Get(':id')
  show(@Param('id') id: string): Promise<User> {
    try {
      return this.userService.getById(id);
    } catch (error) {
      throw error;
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: User): Promise<User> {
    return this.userService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(204)
  async destroy(@Param('id') id: string): Promise<void> {
    await this.userService.destroy(id);
  }
}
