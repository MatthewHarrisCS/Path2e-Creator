import { Module } from '@nestjs/common';
import { Ancestry } from './schemas/ancestry';
import { User } from './schemas/user';
import { AncestryModule } from './api/ancestry/ancestry.module';
import { BackgroundModule } from './api/background/background.module';
import { Background } from './schemas/background';
import { Class } from './schemas/class';
import { ClassModule } from './api/class/class.module';
import { Racket } from './schemas/racket';
import { RacketModule } from './api/racket/racket.module';
import { CharacterSheet } from './schemas/characterSheet';
import { CharacterModule } from './api/character/character.module';
import { AuthModule } from './api/auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { Session } from './schemas/session';
import { HeritageModule } from './api/heritage/heritage.module';
import { Heritage } from './schemas/heritage';
import { MongooseModule } from '@nestjs/mongoose';
import { mongoUser } from './env';

@Module({
  imports: [
    MongooseModule.forRoot(
      mongoUser
      ),
    PassportModule.register({
        session: true,
      }),
    AuthModule,
    AncestryModule, 
    BackgroundModule, 
    ClassModule, 
    RacketModule,
    HeritageModule,
    CharacterModule]
})
export class AppModule {}