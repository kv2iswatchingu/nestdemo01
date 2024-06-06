import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieparser from 'cookie-parser'
import { join } from 'path/posix';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule,{cors:true});
  //app.useStaticAssets('public');

  const config = new DocumentBuilder()
    .setTitle('MusicWebDemo')
    .setDescription('Api for MusicDemo')
    .setVersion('0.1')
    .addTag('ColorfulStage')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);


}
bootstrap();
