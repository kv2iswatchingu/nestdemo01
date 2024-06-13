import { Module } from '@nestjs/common';
import { LyricService } from './lyric.service';
import { LyricController } from './lyric.controller';

@Module({
  providers: [LyricService],
  controllers: [LyricController]
})
export class LyricModule {}
