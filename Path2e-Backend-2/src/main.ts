import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { Session } from './schemas/session';
import { corsOrigin, sessionName, sessionSecret } from './env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const sessionRepo = app.get(DataSource).getRepository(Session);
  app.enableCors({
    origin: corsOrigin,
    methods: ["GET", "POST"],
    credentials: true,
  });
  app.use(
    session({
      name: sessionName,
      secret: sessionSecret,
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
