import { Module } from '@nestjs/common';
import { CharacterSchema, CharacterSheet } from 'src/schemas/characterSheet';
import { CharacterController } from './controller/character.controller';
import { CharacterService } from './service/character.service';
import { MongooseModule } from '@nestjs/mongoose';
import { LocalStrategy } from '../auth/utils/local-strategy';
import { AuthService } from '../auth/service/auth.service';
import { User, UserSchema } from 'src/schemas/user';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CharacterSheet.name, schema: CharacterSchema },
      { name: User.name, schema: UserSchema }
    ])],
  controllers: [CharacterController],
  providers: [
    CharacterService,
    {
      provide: "AUTH_SERVICE",
      useClass: AuthService
    }, 
    LocalStrategy
  ]
})
export class CharacterModule {}
