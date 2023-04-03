import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { User } from 'src/schemas/user';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import { LocalStrategy } from './utils/local-strategy';
import { SessionSerializer } from './utils/session-serializer';

@Module({
  imports: [
    PassportModule
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: "AUTH_SERVICE",
      useClass: AuthService
    },
    LocalStrategy,
    SessionSerializer
  ]
})
export class AuthModule {}
