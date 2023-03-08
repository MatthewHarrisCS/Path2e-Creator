import { Controller, Post } from '@nestjs/common';
import { AuthService } from '../service/auth.service';

@Controller('auth')
export class AuthController {
    constructor(private service: AuthService) {}

    @Post('/login')
    async login(/*@Body() loginDto: LoginDto */) {
        return this.service.login();
    }

    @Post('/register')
    async register() {

    }

}
