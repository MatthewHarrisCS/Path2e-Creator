import { Body, Controller, Get, Inject, Post, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { LoginDto } from '../dtos/login.dto';
import { AuthService } from '../service/auth.service';
import { LocalAuthGuard, LocalSessionGuard } from '../utils/local-guards';
import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../dtos/createUser.dto';

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

    @UseGuards(LocalSessionGuard)
    @Get('/logout')
    async logout(@Req() req: Request, @Res() res: Response) {
        req.session.destroy(function (err) {
            if (!err) {
                res.status(200).clearCookie('path2e.sid', {path: '/'}).json({status: "Success"});
            } else {
                throw UnauthorizedException;
            }
        });
    }

    @Post('/register')
    async register(@Body() createUserDto: CreateUserDto) {

        // Hash the password before adding to the database
        createUserDto.password = await bcrypt.hash(createUserDto.password, 12);

        return this.service.createUser(createUserDto);
    }

}
