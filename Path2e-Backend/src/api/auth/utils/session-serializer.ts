import { Inject } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { UserDocument } from "src/schemas/user";
import { AuthService } from "../service/auth.service";
import { SessionDto } from "../dtos/session.dto";

export class SessionSerializer extends PassportSerializer {

    constructor(
        @Inject('AUTH_SERVICE') private readonly authService: AuthService,
    ) {
        super();
    }

    // serializeUser(): create a new session for the user
    serializeUser(user: UserDocument, done: (err, session: SessionDto) => void) {
        let session = new SessionDto();
        session._id = user._id;
        session.username = user.username;
        done(null, session);
    }

    // deserializeUser(): access a logged session for a returning user
    async deserializeUser(user: UserDocument, done: (err, session: SessionDto) => void) {

        // If the user exists in the database, get the session
        const currUser = await this.authService.getUserById(user._id);
        if (currUser != null) {
            let session = new SessionDto();
            session._id = currUser._id;
            session.username = currUser.username;
            done(null, session);
        } else {
            done(null, null);
        }
    }
}