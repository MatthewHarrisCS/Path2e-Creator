import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { Ancestry } from './typeorm/entities/ancestry';
import { User } from './typeorm/entities/user';
import { UserModule } from './user/user.module';
import { AncestryModule } from './ancestry/ancestry.module';

@Module({
  imports: [AuthModule, UserModule, 
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost', // FOR DEV
      port: 3306,
      username: 'matthewharriscs', // FOR DEV
      password: 'path2e-pw', // FOR DEV
      database: 'path2e_db',
      entities: [User, Ancestry],
      synchronize: true

  }), AncestryModule]
})
export class AppModule {}
