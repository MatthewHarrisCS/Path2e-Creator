import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);app.enableCors({
    origin: 'http://localhost:4200', // FOR DEV
    methods: ["GET", "POST"],
    credentials: true,
  });
  app.use(
    session({
      secret: 'VaderIsLukesDad', // FOR DEV - REPLACE WITH ENVIRONMENTAL VARIABLE
      resave: false,
      saveUninitialized: false,
      cookie: { 
        maxAge: 60000 // 1 minute
      }
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(4201);
}
bootstrap();
