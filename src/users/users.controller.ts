// src/users/users.controller.ts
import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user-dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;
    const user = await this.usersService.createUser(email, password);
    return { message: 'User created successfully', user };
  }

  @UseGuards(JwtAuthGuard) // Protect this route with JWT authentication
  @Get('me')
  async getProfile(@Request() req) {
    // req.user contains the payload from the JWT token (e.g., email, sub)
    const userId = req.user.sub; // Extract user ID from the token payload
    return this.usersService.findUserById(userId);
  }
}
