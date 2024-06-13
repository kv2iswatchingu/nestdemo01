import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CoverPrivate } from 'src/interface/CoverPrivate.interface';

@Injectable()
export class CoverPrivateService {
    constructor(
       @InjectModel("Cover_MODEL") private readonly coverPrivateModel: Model<CoverPrivate>
    ){}

    async saveCoverPrivate(coverName:string,coverRaw:Buffer,coverSize:number,coverType:string):Promise<any>{
        return this.coverPrivateModel.find({
            coverName:coverName,
            coverRaw:coverRaw,
            coverSize:coverSize,
            coverType:coverType
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
                        coverSize:coverSize,
                        coverType:coverType
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

    async findCoverPrivate(id:string):Promise<CoverPrivate>{
        const file = await this.coverPrivateModel.findById(id).lean();
        return file;
    }

}
