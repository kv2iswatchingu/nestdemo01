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

    public async getMusicInfoListByAblumId(ablumId:string):Promise<MusicInfo[]>{
        try{
            return this.musicInfoModel.find({_AblumId:ablumId}).lean()
        }
        catch{
            throw Error("失败")
        }
    }


    public async searchPagination(query:any):Promise<MusicInfo[]>{
        const {  page,limit,name,style,singer,author } = query
        const filters:any = {};
        if(name){
            filters.musicName = { $regex:name,$options:"i"};
        }
        if(style){
            filters.musicStyle = { $regex:style,$options:"i"};
        }

        /* if(sortBy){
            const sortDirection = sortBy.startsWith('-') ? -1 : 1;
            sort[sortBy.replace(/^-/, '')] = sortDirection;
        }  */

        return this.musicInfoModel.find(filters)
        .skip((page - 1) * limit)
        .limit(limit)
        .lean();

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
