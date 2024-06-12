import { Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CoverPrivateService } from './coverPrivate.service';



@Controller('coverPrivate')
export class CoverPrivateController {
    constructor(
        private readonly coverPrivateService:CoverPrivateService
    ){

    }

    

    /* @Post()
    @UseInterceptors(FileInterceptor('file'))
    async uploadMusicSavePrivate(@UploadedFile() coverData:Express.Multer.File):Promise<any>{
        const res =  await this.coverPrivateService.saveCoverPrivate(
            coverData.originalname,
            coverData.buffer,
            coverData.size
        );
        return res._id;
    } */

 

}
