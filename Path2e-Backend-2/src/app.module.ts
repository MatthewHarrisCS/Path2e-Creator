import { Module } from '@nestjs/common';
import { Ancestry } from './typeorm/entities/ancestry';
import { User } from './typeorm/entities/user';
import { AncestryModule } from './api/ancestry/ancestry.module';
import { BackgroundModule } from './api/background/background.module';
import { Background } from './typeorm/entities/background';
import { Class } from './typeorm/entities/class';
import { ClassModule } from './api/class/class.module';
import { Racket } from './typeorm/entities/racket';
import { RacketModule } from './api/racket/racket.module';
import { CharacterSheet } from './typeorm/entities/characterSheet';
import { CharacterModule } from './api/character/character.module';
import { AuthModule } from './api/auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { Session } from './typeorm/entities/session';
import { HeritageModule } from './api/heritage/heritage.module';
import { Heritage } from './typeorm/entities/heritage';

@Module({
  imports: [
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