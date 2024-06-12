import { Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImgPrivateService } from './imgPrivate.service';



@Controller('imgPrivate')
export class ImgPrivateController {
    constructor(
        private readonly imgPrivateService:ImgPrivateService
    ){

    }

}
