import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Habilitar CORS
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  
  // Validación global
  app.useGlobalPipes(new ValidationPipe());
  
  await app.listen(3000);
  console.log(' Servidor corriendo en http://localhost:3000');
}
bootstrap();