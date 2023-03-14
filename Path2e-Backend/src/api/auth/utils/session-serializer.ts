import { Inject } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { User } from "src/typeorm/entities/user";
import { SessionDto } from "../dtos/session.dto";
import { AuthService } from "../service/auth.service";

export class SessionSerializer extends PassportSerializer {

    constructor(
        @Inject('AUTH_SERVICE') private readonly authService: AuthService,
    ) {
        super();
    }

    // serializeUser(): create a new session for the user
    serializeUser(user: User, done: (err, session: SessionDto) => void) {
        let session = new SessionDto();
        session.email = user.email;
        session.username = user.username;
        done(null, session);
    }

    // deserializeUser(): access a logged session for a returning user
    async deserializeUser(user: User, done: (err,  session: SessionDto) => void) {

        // If the user exists in the database, get the session
        const currUser = await this.authService.getUserByEmail(user.email);
        if (currUser != null) {
            let session = new SessionDto();
            session.email = currUser.email;
            session.username = currUser.username;
            done(null, session);
        } else {
            done(null, null);
        }
    }
}