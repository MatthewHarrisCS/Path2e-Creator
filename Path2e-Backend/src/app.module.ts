import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [AuthModule, UserModule, 
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost', // FOR DEV
      port: 3306,
      username: 'matthewharriscs', // FOR DEV
      password: 'path2e-pw', // FOR DEV
      database: 'path2e_db',
      entities: [],
      synchronize: true

  })]
})
export class AppModule {}
