import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {ValidationPipe} from './pipes/validation.pipe';
import * as cookieParser from "cookie-parser";

async function start() {
  const PORT = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule, {
  });

  const config = new DocumentBuilder()
      .setTitle('Author API')
      .setDescription('Документация по author API')
      .setVersion('1.0.0')
      .addTag('green')
      .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());

  await app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}
start();
