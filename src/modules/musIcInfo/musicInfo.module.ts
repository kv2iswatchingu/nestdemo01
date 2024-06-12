import { Module } from '@nestjs/common';
import { MusicInfoService} from './musicInfo.service';
import { MusicInfoController} from './musicInfo.controller';
import { SongListService } from '../songList/songList.service';
import { MusicSavePrivateService } from '../private/musicSavePrivate/musicSavePrivate.service';

@Module({
  providers: [
    MusicInfoService,
    SongListService,
    MusicSavePrivateService
  ],
  controllers: [MusicInfoController]
})
export class MusicInfoModule {}
