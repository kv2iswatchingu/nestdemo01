import { Module } from '@nestjs/common';
import { MusicSavePrivateService } from './musicSavePrivate.service';
import { MusicSavePrivateController } from './musicSavePrivate.controller';


@Module({
  providers: [MusicSavePrivateService],
  controllers: [MusicSavePrivateController]
})
export class MusicSavePrivateModule {}
