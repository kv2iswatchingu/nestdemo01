import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CoverPrivate } from 'src/interface/CoverPrivate.interface';

@Injectable()
export class CoverPrivateService {
    constructor(
       @InjectModel("Cover_MODEL") private readonly coverPrivateModel: Model<CoverPrivate>
    ){}

    async saveCoverPrivate(coverName:string,coverRaw:Buffer,coverSize:number):Promise<any>{
        return this.coverPrivateModel.find({
            coverName:coverName,
            coverRaw:coverRaw,
            coverSize:coverSize
        }).then(res =>{
            if(res.length != 0){
                console.log("已有")
                throw Error("已有此")
            }
        }).then(()=>{
            try{
                const createCoverData = new this.coverPrivateModel(
                    {
                        coverName:coverName,
                        coverRaw:coverRaw,
                        coverSize:coverSize
                    }
                )
                /* const result = await createCoverData.save();
                return result; */
                return createCoverData.save();
            }catch{
                throw Error("保存失败")
            }
        }).catch(err =>{
            console.log("完全错误")
        })
    }

    async findMusicPrivate(id:string):Promise<CoverPrivate>{
        const file = await this.coverPrivateModel.findById(id).lean();
        return file;
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
