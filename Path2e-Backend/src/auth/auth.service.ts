import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthService {
    signup() {
        return "Testing signup from service";
    }

    signin() {
        return "Testing signin from service";
    }
}