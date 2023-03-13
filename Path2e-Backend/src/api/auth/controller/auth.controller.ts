import { Body, Controller, Get, Inject, Post, Req, Res, UseGuards } from '@nestjs/common';
import { LoginDto } from '../dtos/login.dto';
import { AuthService } from '../service/auth.service';
import { LocalAuthGuard, LocalSessionGuard } from '../utils/local-guards';
import { Request } from 'express';
import * as bcrypt from 'bcrypt';

@Controller('auth')
export class AuthController {
    constructor(@Inject('AUTH_SERVICE') private readonly service: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async login(@Body() loginDto: LoginDto) {
        if (loginDto.email == null || loginDto.password == null) return null;
        const currUser = await this.service.getUser(loginDto.email);
        
        if (currUser == null) return null;
        const hashCheck = await bcrypt.compare(loginDto.password, currUser.password);
        
        if (hashCheck) {
            return { email: currUser.email, username: currUser.username}
        } else {
            return null;
        }
    }

    @UseGuards(LocalSessionGuard)
    @Get('/login')
    async getSession(@Req() req: Request) {
        return req.user;
    }

    @Post('/register')
    async register() {

    }

}
