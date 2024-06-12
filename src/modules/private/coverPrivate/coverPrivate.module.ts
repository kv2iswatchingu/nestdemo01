import { Module } from '@nestjs/common';
import { CoverPrivateService } from './coverPrivate.service';
import { CoverPrivateController } from './coverPrivate.controller';


@Module({
  providers: [CoverPrivateService],
  controllers: [CoverPrivateController]
})
export class CoverPrivateModule {}
