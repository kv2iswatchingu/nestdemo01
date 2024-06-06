import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';


import { DbModule } from './db/db.module';
import { UserModule } from './modules/user/user.module';
import { MusicSavePrivateModule } from './modules/private/musicSavePrivate/musicSavePrivate.module';

@Module({
  imports: [
    DbModule, 
    UserModule, 
    MusicSavePrivateModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
