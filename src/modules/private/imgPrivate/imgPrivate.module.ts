import { Module } from '@nestjs/common';
import { ImgPrivateService } from './imgPrivate.service';
import { ImgPrivateController } from './imgPrivate.controller';


@Module({
  providers: [ImgPrivateService],
  controllers: [ImgPrivateController]
})
export class ImgPrivateModule {}
