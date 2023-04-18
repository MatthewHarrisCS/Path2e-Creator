import { Module } from '@nestjs/common';
import { AncestryModule } from './api/ancestry/ancestry.module';
import { BackgroundModule } from './api/background/background.module';
import { ClassModule } from './api/class/class.module';
import { RacketModule } from './api/racket/racket.module';
import { CharacterModule } from './api/character/character.module';
import { AuthModule } from './api/auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { HeritageModule } from './api/heritage/heritage.module';
import { MongooseModule } from '@nestjs/mongoose';
import { mongoUser } from './env';
import { DebugModule } from './api/debug/debug.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      mongoUser
      ),
    PassportModule.register({
        session: true,
      }),
    DebugModule,
    AuthModule,
    AncestryModule, 
    BackgroundModule, 
    ClassModule, 
    RacketModule,
    HeritageModule,
    CharacterModule]
})
export class AppModule {}