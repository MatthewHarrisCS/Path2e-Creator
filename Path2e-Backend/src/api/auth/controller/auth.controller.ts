import { Body, Controller, Post, Res } from '@nestjs/common';
import { LoginDto } from '../dtos/login.dto';
import { AuthService } from '../service/auth.service';

@Controller('auth')
export class AuthController {
    constructor(private service: AuthService) {}

    @Post('/login')
    async login(@Body() loginDto: LoginDto) {
        if (loginDto.email == null || loginDto.password == null) return null;
        const logged = await this.service.login(loginDto);
        
        if (logged == null) {
            return logged;
        } else {
            return {
                email: logged.email, 
                username: logged.username
            };
        }
    }

    @Post('/register')
    async register() {

    }

}
