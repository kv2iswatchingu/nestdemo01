import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MusicSavePrivate } from 'src/interface/musicSavePrivate.interface';

@Injectable()
export class MusicSavePrivateService {
    constructor(
        @InjectModel("MusicSavePrivate_MODEL") private readonly musicSavePrivateModel: Model<MusicSavePrivate>
    ){}

    async saveMusicPrivate(musicName:string,musicRaw:Buffer,musicSize:number):Promise<any>{
        return this.musicSavePrivateModel.find({
           musicName:musicName,
           musicRaw:musicRaw,
           musicSize:musicSize
        }).then(res =>{
            if(res.length != 0){
                console.log("已有此曲目")
                throw Error("已有此曲目")
            }
        }).then(()=>{
            try{
                const createMusicPData = new this.musicSavePrivateModel(
                    {
                        musicName:musicName,
                        musicRaw:musicRaw,
                        musicSize:musicSize
                    }
                )
                return createMusicPData.save();
            }catch{
                throw Error("保存失败")
            }
        }).catch(err =>{
            console.log("完全错误")
        })
    }

    async findMusicPrivate(id:string):Promise<MusicSavePrivate>{
        return this.musicSavePrivateModel.findById(id).lean();
    }

    /* async finduRL(musicName:string):Promise<string>{
        const file = await this.musicSavePrivateModel.find({musicName:musicName}).lean();
        if(file[0].musicRaw){
            const blob = new Blob([file[0].musicRaw])
            console.log(blob)
            const url = URL.createObjectURL(blob)
            console.log(url)
            return url;
        }else{
            return "err"
        }
    } */
}
