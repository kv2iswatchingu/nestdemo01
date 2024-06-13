import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';


import { DbModule } from './db/db.module';
import { UserModule } from './modules/user/user.module';
import { MusicSavePrivateModule } from './modules/private/musicSavePrivate/musicSavePrivate.module';
import { MusicInfoModule } from './modules/musIcInfo/musicInfo.module';
import { SongListModule } from './modules/songList/songList.module';
import { AblumModule } from './modules/ablum/ablum.module';
import { CoverPrivateModule } from './modules/private/coverPrivate/coverPrivate.module';
import { ImgPrivateModule } from './modules/private/imgPrivate/imgPrivate.module';
import { LyricModule } from './modules/lyric/lyric.module';

@Module({
  imports: [
    DbModule, 
    UserModule, 
    MusicSavePrivateModule,
    SongListModule,
    MusicInfoModule,
    AblumModule,
    CoverPrivateModule,
    ImgPrivateModule,
    LyricModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
