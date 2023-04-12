import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../service/auth.service";
import * as bcrypt from 'bcrypt';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(
        @Inject('AUTH_SERVICE') private readonly service: AuthService
    ) {
        super({
            usernameField: "email"
        });
    }

    // validate(): Confirm the user is valid before accessing guarded data
    async validate(username: string, password: string) {
        
        const user = await this.service.getUserByEmail(username);
        if(user == null) {
            throw new UnauthorizedException();
        }

        // compare the password to the hashed password
        const hashCheck = await bcrypt.compare(password, user.password);

        if(hashCheck) {
            return {_id: user._id, email: user.email, username: user.username};
        } else {
            throw new UnauthorizedException();
        }
    }
}