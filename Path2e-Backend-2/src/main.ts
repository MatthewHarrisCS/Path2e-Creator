import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { Session } from './schemas/session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const sessionRepo = app.get(DataSource).getRepository(Session);
  app.enableCors({
    origin: 'http://localhost:4200', // FOR DEV
    methods: ["GET", "POST"],
    credentials: true,
  });
  app.use(
    session({
      name: 'path2e.sid',
      secret: 'VaderIsLukesDad', // FOR DEV - REPLACE WITH ENVIRONMENTAL VARIABLE
      resave: false,
      saveUninitialized: false,
      // store: ,
      cookie: { 
        maxAge: 300000 // 5 minute
      }
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(4201);
}
bootstrap();
