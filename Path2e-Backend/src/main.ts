import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);app.enableCors({
    origin: 'http://localhost:4200', // DEV
    methods: ["GET", "POST"],
    credentials: true,
  });
  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 60000 }
    }),
  );
  await app.listen(4201);
}
bootstrap();
