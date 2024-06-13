import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Lyric, LyricOutput } from 'src/interface/lyric.interface';

@Injectable()
export class LyricService {
    constructor(
        @InjectModel("Lyric_MODEL") private readonly lyricModel: Model<Lyric>
    ){}

    public async postLyric(lyric:Lyric){
        return this.lyricModel.find({
            _MusicInfoId:lyric._MusicInfoId,
        }).then(res =>{
            if(res.length != 0){
                throw Error("！")
            }
        }).then(()=>{
            try{
                const createLyric = new this.lyricModel(lyric)
                return createLyric.save();
            }catch{
                throw Error("保存失败")
            }
        })
    }

    public async getLyricById(id:string):Promise<LyricOutput>{
        const lyricClass = await this.lyricModel.find({_MusicInfoId:id}).lean();
        if(lyricClass.length > 0){
            const lyric:LyricOutput = {
                lyric:lyricClass[0].lyricContent
            }
            return lyric;
        }else{
            return null;
        }
    }
}
