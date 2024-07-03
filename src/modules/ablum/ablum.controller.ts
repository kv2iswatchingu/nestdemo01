import { Body, Controller, Get, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AblumService } from './ablum.service';
import { Ablum, AblumInfo, AblumOutput } from 'src/interface/ablum.interface';
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
    async getAll():Promise<AblumOutput[]>{
        let output:AblumOutput[] = [];
        const ablumRaw = await this.ablumService.getAll();
        for(let i = 0; i < ablumRaw.length; i++){
            const coverData = await this.coverService.findCoverPrivate(ablumRaw[i].id_Cover)
            
            const ablumEx:AblumOutput = {
                ablumId:ablumRaw[i]._id,
                ablumName:ablumRaw[i].ablumName,
                coverRaw:coverData.coverRaw,
                coverType:coverData.coverType,
                ablumBand:ablumRaw[i].ablumBand,
                ablumYear:ablumRaw[i].ablumYear,
                ablumPop:ablumRaw[i].ablumPop
            }
            output.push(ablumEx)
        }
        return output;
    }

    @Get('getMainPage')
    async getMainPage():Promise<AblumOutput[]>{
        let output:AblumOutput[] = [];
        const ablumRaw = await this.ablumService.getMainPage();
        for(let i = 0; i < ablumRaw.length; i++){
            const coverData = await this.coverService.findCoverPrivate(ablumRaw[i].id_Cover)
            
            const ablumEx:AblumOutput = {
                ablumId:ablumRaw[i]._id,
                ablumName:ablumRaw[i].ablumName,
                coverRaw:coverData.coverRaw,
                coverType:coverData.coverType,
                ablumBand:ablumRaw[i].ablumBand,
                ablumYear:ablumRaw[i].ablumYear,
                ablumPop:ablumRaw[i].ablumPop
            }
            output.push(ablumEx)
        }
        return output;
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

    @Put('pop/:ablumId')
    async updatePop(@Param('ablumId') ablumId:string){
        return this.ablumService.updatePop(ablumId);
    }
}
