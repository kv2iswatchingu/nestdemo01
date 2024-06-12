import { Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { MusicSavePrivateService } from './musicSavePrivate.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { MusicSavePrivate } from 'src/interface/musicSavePrivate.interface';


@Controller('musicSavePrivate')
export class MusicSavePrivateController {
    constructor(
        //private userService:UserService
        private readonly musicSavePrivateService:MusicSavePrivateService
    ){

    }

    /* @Post('regist')
    async registUser(@Body() userDto:User){
        return await this.userService.regist(userDto)
    } */

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async uploadMusicSavePrivate(@UploadedFile() musicData:Express.Multer.File){
        const createMusicData = await this.musicSavePrivateService.saveMusicPrivate(
            musicData.originalname,
            musicData.buffer,
            musicData.size
        );
        return createMusicData;
    }

    /* @Get(':musicName')
    async getMusicPrivateRaw(@Param('musicName') musicName:string):Promise<MusicSavePrivate[]>{
        return this.musicSavePrivateService.findMusicPrivate(musicName);
    } */

    /* @Get('url/:musicName')
    async getUrl(@Param('musicName') musicName:string):Promise<string>{
        return this.musicSavePrivateService.finduRL(musicName)
    } */

}
