import { Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { MusicInfoService } from './musicInfo.service';
import { MusicInfo, MusicInfoExtend, MusicInfoOutput } from 'src/interface/musicInfo.interface';
import { SongListService } from '../songList/songList.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { MusicSavePrivateService } from '../private/musicSavePrivate/musicSavePrivate.service';

@Controller('musicInfo')
export class MusicInfoController {
    constructor(
        private musicInfoService:MusicInfoService,
        private songListService:SongListService,
        private musicSavePrivateService:MusicSavePrivateService
    ){

    }

    @Get(':songListId')
    async getMusicInfoListBySonglist(@Param('songListId') songListId:string):Promise<MusicInfoOutput[]>{
        let output:MusicInfoOutput[] = [];
        const musicIdList = await this.songListService.getSongListById(songListId);
        const resultList = await this.musicInfoService.getMusicInfoListBySonglist(musicIdList._MusicIdList);
        for(let i = 0; i < resultList.length; i ++){
            const musicRaw = await this.musicSavePrivateService.findMusicPrivate(resultList[i]._MusicRawId)
            const musicInfoEx:MusicInfoOutput = {
                _id:resultList[i]._id,
                _AblumId:resultList[i]._AblumId,
                musicRaw:musicRaw.musicRaw,
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
            musicRawData.size
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
