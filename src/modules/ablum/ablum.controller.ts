import { Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AblumService } from './ablum.service';
import { Ablum, AblumInfo } from 'src/interface/ablum.interface';
import { CoverPrivateService } from '../private/coverPrivate/coverPrivate.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('ablum')
export class AblumController {
    constructor(
       private ablumService:AblumService,
       private coverService:CoverPrivateService
    ){

    }
    
    @Get('getAll')
    async getAll():Promise<Ablum[]>{
        return this.ablumService.getAll();
    }

    @Get('GetById/:ablumId')
    async getById(@Param("ablumId") ablumId:string):Promise<Ablum>{
        return this.ablumService.getById(ablumId);
    }

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async uploadAblum(
        @UploadedFile() coverData:Express.Multer.File,
        @Body() ablumInfo:AblumInfo
        ){
        const res =  await this.coverService.saveCoverPrivate(
            coverData.originalname,
            coverData.buffer,
            coverData.size,
            coverData.mimetype
        );
        const id_Cover = res._id;
        //console.log(ablumInfo)
        this.ablumService.postAblum(
            ablumInfo.ablumName,
            id_Cover,
            ablumInfo.ablumBand,
            ablumInfo.ablumYear
        )
    }
}
