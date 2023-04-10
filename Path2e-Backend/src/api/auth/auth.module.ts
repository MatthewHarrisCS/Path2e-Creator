import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { User, UserSchema } from 'src/schemas/user';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import { LocalStrategy } from './utils/local-strategy';
import { SessionSerializer } from './utils/session-serializer';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
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
