import { Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { SongListService} from './songList.service';
import { SongList, SongListExtend, SongListOutput } from 'src/interface/songList.interface';
import { ImgPrivateService } from '../private/imgPrivate/imgPrivate.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';


@Controller('songList')
export class SongListController {
    constructor(
        private songListService:SongListService,
        private imgPrivateService:ImgPrivateService
    ){

    }

    /* @Get(':songlistId')
    async getallbysonglist(@Param('songlistId') songlistId:string):Promise<string[]>{
        return this.songListService.getSongListById(songlistId);
    }
    */ 

    @Get('all')
    async getAll():Promise<SongListOutput[]>{
        let extend:SongListOutput[] = [];
        const resultList = await this.songListService.getAll();
        for(let i = 0; i < resultList.length; i ++){
            const imgPrivate = await this.imgPrivateService.findImgPrivate(resultList[i]._ImgPrivate_id)
            
            const songlistEx:SongListOutput = {
                _id:resultList[i]._id,
                _MusicIdList:resultList[i]._MusicIdList,
                ImgRaw:imgPrivate.imgRaw,
                songListName:resultList[i].songListName,
                songListDesprition:resultList[i].songListDesprition,
                songListStyle:resultList[i].songListStyle,
                songListPop:resultList[i].songListPop
            }
            extend.push(songlistEx)
        }
        return extend;
    }


    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async uploadSongList(
        @UploadedFile() imgData:Express.Multer.File,
        @Body() songList:SongListExtend
    ){
        const res = await this.imgPrivateService.saveImgPrivate(
            imgData.originalname,
            imgData.buffer,
            imgData.size,
            imgData.mimetype
        );
        const id_Img = res._id;
        this.songListService.postSongList(
            songList._MusicIdList,
            id_Img,
            songList.songListName,
            songList.songListDesprition,
            songList.songListStyle
        )

    }
}
