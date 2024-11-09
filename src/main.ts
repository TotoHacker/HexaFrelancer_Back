import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SERVER_PORT } from './config/constans';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const port = configService.get<number>(SERVER_PORT) || 3000;
  await app.listen(port);
  console.log("Escuchando en el puerto ", await app.getUrl());
  
}
bootstrap();
