import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { LyricService } from './lyric.service';
import { Lyric, LyricOutput } from 'src/interface/lyric.interface';

@Controller('lyric')
export class LyricController {
    constructor(
        private lyricService:LyricService
    ){

    }

    @Get(':musicId')
    async getLyricById(@Param("musicId") musicId:string):Promise<LyricOutput>{
        return await this.lyricService.getLyricById(musicId);
    }

    @Post()
    async postLyric(@Body() lyricData:Lyric){
        return await this.lyricService.postLyric(lyricData)
    }
}
