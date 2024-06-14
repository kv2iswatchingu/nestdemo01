import { Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { MusicInfoService } from './musicInfo.service';
import { MusicInfo, MusicInfoExtend, MusicInfoOutput } from 'src/interface/musicInfo.interface';
import { SongListService } from '../songList/songList.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { MusicSavePrivateService } from '../private/musicSavePrivate/musicSavePrivate.service';
import { AblumService } from '../ablum/ablum.service';
import { CoverPrivateService } from '../private/coverPrivate/coverPrivate.service';

@Controller('musicInfo')
export class MusicInfoController {
    constructor(
        private musicInfoService:MusicInfoService,
        private songListService:SongListService,
        private musicSavePrivateService:MusicSavePrivateService,
        private ablumService:AblumService,
    ){

    }

    @Get('songListId/:songListId')
    async getMusicInfoListBySonglist(@Param('songListId') songListId:string):Promise<MusicInfoOutput[]>{
        let output:MusicInfoOutput[] = [];
        const musicIdList = await this.songListService.getSongListById(songListId);
        const resultList = await this.musicInfoService.getMusicInfoListBySonglist(musicIdList._MusicIdList);
        for(let i = 0; i < resultList.length; i ++){
            const musicPrivate = await this.musicSavePrivateService.findMusicPrivate(resultList[i]._MusicRawId)
            const coverPrivate = await this.ablumService.getCoverByAblumId(resultList[i]._AblumId)

            const musicInfoEx:MusicInfoOutput = {
                _id:resultList[i]._id,
                coverRaw:coverPrivate.coverRaw,
                coverType:coverPrivate.coverType,
                musicRaw:musicPrivate.musicRaw,
                musicType:musicPrivate.musicType,
                musicName:resultList[i].musicName,
                musicStyle:resultList[i].musicStyle,
                musicSinger:resultList[i].musicSinger,
                musicAuthor:resultList[i].musicAuthor,
                musicLong:resultList[i].musicLong,
                musicUploadTime:resultList[i].musicUploadTime
            }
            output.push(musicInfoEx)
        }
        return output;
    }


    @Get('ablumId/:ablumId')
    async getMusicInfoListByAblumId(@Param('ablumId') ablumId:string):Promise<MusicInfoOutput[]>{
        let output:MusicInfoOutput[] = [];
        const resultList = await this.musicInfoService.getMusicInfoListByAblumId(ablumId);
        for(let i = 0; i < resultList.length; i ++){
            const musicPrivate = await this.musicSavePrivateService.findMusicPrivate(resultList[i]._MusicRawId)
            const coverPrivate = await this.ablumService.getCoverByAblumId(resultList[i]._AblumId)
            const musicInfoEx:MusicInfoOutput = {
                _id:resultList[i]._id,
                coverRaw:coverPrivate.coverRaw,
                coverType:coverPrivate.coverType,
                musicRaw:musicPrivate.musicRaw,
                musicType:musicPrivate.musicType,
                musicName:resultList[i].musicName,
                musicStyle:resultList[i].musicStyle,
                musicSinger:resultList[i].musicSinger,
                musicAuthor:resultList[i].musicAuthor,
                musicLong:resultList[i].musicLong,
                musicUploadTime:resultList[i].musicUploadTime
            }
            output.push(musicInfoEx)
        }
        return output;
    }

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async uploadMusicSavePrivate(
        @UploadedFile() musicRawData:Express.Multer.File,
        @Body() musicInfo:MusicInfoExtend
        ){
        const res = await this.musicSavePrivateService.saveMusicPrivate(
            musicRawData.originalname,
            musicRawData.buffer,
            musicRawData.size,
            musicRawData.mimetype
        )
        const musicRawId = res._id;
        this.musicInfoService.postMusic(
            musicInfo._AblumId,
            musicRawId,
            musicInfo.musicName,
            musicInfo.musicStyle,
            musicInfo.musicSinger,
            musicInfo.musicAuthor,
            musicInfo.musicLong,
            musicInfo.musicUploadTime
        ) 
    }

    /* @Post('regist')
    async registUser(@Body() userDto:User){
        return await this.userService.regist(userDto)
    } */
}
