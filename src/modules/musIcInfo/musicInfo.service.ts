import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MusicInfo } from 'src/interface/musicInfo.interface';


@Injectable()
export class MusicInfoService {
    constructor(
        @InjectModel("MusicInfo_MODEL") private readonly musicInfoModel:Model<MusicInfo>
    ){}

    public async getMusicInfoListBySonglist(idList:string[]):Promise<MusicInfo[]>{
        try{
            let musicInfoList:MusicInfo[] = [];
            for(let i = 0;i < idList.length;i++){
                const musicInfo = await this.musicInfoModel.findById(idList[i]).lean();
                musicInfoList.push(musicInfo);
            }
            return musicInfoList;
        }
        catch{
            throw Error("失败")
        }
    }

    public async postMusic(
        _AblumId:string,
        musicRawId:string,
        musicName:string,
        musicStyle:string,
        musicSinger:string,
        musicAuthor:string,
        musicLong:number,
        musicUploadTime:string,
    ){
        try{
            const createMusicData = new this.musicInfoModel({
                _AblumId:_AblumId,
                _MusicRawId:musicRawId,
                musicName:musicName,
                musicStyle:musicStyle,
                musicSinger:musicSinger,
                musicAuthor:musicAuthor,
                musicLong:musicLong,
                musicUploadTime:musicUploadTime
            })
            return createMusicData.save();
        }catch{
            throw Error("保存失败")
        }
    }
}
