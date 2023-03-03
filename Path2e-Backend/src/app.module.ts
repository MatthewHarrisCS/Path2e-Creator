import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ancestry } from './typeorm/entities/ancestry';
import { User } from './typeorm/entities/user';
import { AncestryModule } from './api/ancestry/ancestry.module';
import { BackgroundModule } from './api/background/background.module';
import { Background } from './typeorm/entities/background';
import { Class } from './typeorm/entities/class';
import { ClassModule } from './api/class/class.module';
import { Racket } from './typeorm/entities/racket';
import { RacketModule } from './api/racket/racket.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost', // FOR DEV
      port: 3306,
      username: 'matthewharriscs', // FOR DEV
      password: 'path2e-pw', // FOR DEV
      database: 'path2e_db',
      entities: [User, Ancestry, Background, Class, Racket],
      synchronize: true }), 
    AncestryModule, 
    BackgroundModule, 
    ClassModule, 
    RacketModule]
})
export class AppModule {}