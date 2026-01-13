import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:4200', 'https://localhost:4200', 'https://angular-project-nine-eta.vercel.app'],
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    credentials: true,
  });

  const port = Number(process.env.PORT) || 3000;
  await app.listen(port);
}
bootstrap();
