// src/auth/auth.controller.ts
import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard) // Use the LocalAuthGuard for login
  @Post('login')
  async login(@Request() req) {
    console.log('Rereer', req.user);
    return this.authService.login(req.user); // Return the JWT token
  }
}
