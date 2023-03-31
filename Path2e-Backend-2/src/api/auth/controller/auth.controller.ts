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

    // login(): Access a user's credentials and log them in if approved
    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async login(@Body() loginDto: LoginDto) {
        // If the email or password is not provided, deny access
        if (loginDto.email == null || loginDto.password == null) return null;

        // Get the user by the provided email and deny access if no user found
        const currUser = await this.service.getUserByEmail(loginDto.email);
        if (currUser == null) return null;

        // Compare the provided password to the hashed password and deny access if incorrect
        const hashCheck = await bcrypt.compare(loginDto.password, currUser.password);
        if (hashCheck) {
            // If password correct, return the user
            return { email: currUser.email, username: currUser.username}
        } else {
            return null; 
        }
    }

    // getSession(): Validates the user's session cookie 
    //               and returns the user if valid
    @UseGuards(LocalSessionGuard)
    @Get('/login')
    async getSession(@Req() req: Request) {
        return req.user;
    }

    // logout(): Destroy the current session and clear the session cookie
    //           to log out the current user.
    @UseGuards(LocalSessionGuard)
    @Get('/logout')
    async logout(@Req() req: Request, @Res() res: Response) {
        req.session.destroy(function (err) {
            // If the session was successfully destroyed, remove the session cookie
            if (!err) {
                res.status(200).clearCookie('path2e.sid', {path: '/'}).json({status: "Success"});
            } else {
                throw UnauthorizedException;
            }
        });
    }

    // register(): Validate and add a new user to the database
    @Post('/register')
    async register(@Body() createUserDto: CreateUserDto) {

        // Search the database for any user with the same email OR username
        const search = await this.service.findUser(createUserDto);
        let result = {email: false, username: false};

        // If search finds an existing user, return the taken properties
        if (search != null) {
            if (search.email == createUserDto.email) {
                console.log("email");
                result.email = true;
            } 
            if (search.username == createUserDto.username) {
                console.log("username");
                result.username = true;
            }
            return result;
        }

        // Hash the provided password before adding the user to the database
        createUserDto.password = await bcrypt.hash(createUserDto.password, 12);

        // Insert the user into the database and return true if successful
        // Else log the error and return false
        try {
            await this.service.createUser(createUserDto);
            return true;
        } catch (e) {
            console.log(e);
            return false;
        }
    }
}
