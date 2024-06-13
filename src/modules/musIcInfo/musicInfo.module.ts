import { Module } from '@nestjs/common';
import { MusicInfoService} from './musicInfo.service';
import { MusicInfoController} from './musicInfo.controller';
import { SongListService } from '../songList/songList.service';
import { MusicSavePrivateService } from '../private/musicSavePrivate/musicSavePrivate.service';
import { AblumService } from '../ablum/ablum.service';
import { CoverPrivateService } from '../private/coverPrivate/coverPrivate.service';

@Module({
  providers: [
    MusicInfoService,
    SongListService,
    MusicSavePrivateService,
    AblumService,
    CoverPrivateService
  ],
  controllers: [MusicInfoController]
})
export class MusicInfoModule {}
