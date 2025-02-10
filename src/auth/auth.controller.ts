import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private usersService: UsersService) {}

    @Post('register')
    async register(@Body() body) {
      return this.usersService.register(body.username, body.password);
    }
  
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
      return this.authService.login(req.user);
    }
}
