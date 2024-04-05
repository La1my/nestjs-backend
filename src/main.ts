import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function start() {
  const PORT = process.env.PORT;
  const corsOpts: CorsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
  };

  const app = await NestFactory.create(AppModule, { cors: corsOpts });

  const config = new DocumentBuilder()
    .setTitle('BACKEND для мобильного приложения BeBetter')
    .setDescription('Документация REST API')
    .setVersion('1.0.0')
    .addTag('Laim')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  await app.listen(PORT, () => console.log(`Server started port ${PORT}`));
}
start();
