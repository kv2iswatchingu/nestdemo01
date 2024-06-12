import { Module } from '@nestjs/common';
import { AblumService } from './ablum.service';
import { AblumController } from './ablum.controller';
import { CoverPrivateService } from '../private/coverPrivate/coverPrivate.service';

@Module({
    providers: [AblumService,CoverPrivateService],
    controllers: [AblumController]
})
export class AblumModule {}
