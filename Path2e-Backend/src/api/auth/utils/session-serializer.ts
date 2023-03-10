import { Inject } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { User } from "src/typeorm/entities/user";
import { AuthService } from "../service/auth.service";

export class SessionSerializer extends PassportSerializer {

    constructor(
        @Inject('AUTH_SERVICE') private readonly authService: AuthService,
    ) {
        super();
    }

    serializeUser(user: User, done: (err, user: User) => void) {
        console.log('serializing');
        done(null, user);
    }

    async deserializeUser(user: User, done: (err, user: User) => void) {
        console.log('deserializing');
        const currUser = await this.authService.getUser(user.email);
        return currUser ? done(null, currUser) : done(null, null);
    }
}