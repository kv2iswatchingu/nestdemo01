import { Module } from '@nestjs/common';
import { SongListService } from './songList.service';
import { SongListController } from './songList.controller';
import { ImgPrivateService } from '../private/imgPrivate/imgPrivate.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  providers: [SongListService,ImgPrivateService],
  controllers: [SongListController]
})
export class SongListModule {}
