import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CoverPrivate } from 'src/interface/CoverPrivate.interface';
import { Ablum } from 'src/interface/ablum.interface';

@Injectable()
export class AblumService {
    constructor(
        @InjectModel('Ablum_MODEL') private readonly ablumModel:Model<Ablum>,
        @InjectModel('Cover_MODEL') private readonly coverModel:Model<CoverPrivate>

    ){

    }

    //
    public async getAll():Promise<Ablum[]>{
        try{
            return this.ablumModel.find().lean();
        }
        catch{
            throw Error("失败")
        }
    }

    //MainPage
    public async getMainPage():Promise<Ablum[]>{
        try{
            return this.ablumModel.aggregate([
                {$sample:{size:8}}
            ]).sort({['_id']: -1});
        }
        catch{
            throw Error("失败")
        }
    }

    //
    public async getById(ablumId:string):Promise<Ablum>{
        try{
            return this.ablumModel.findById(ablumId).lean();
        }
        catch{
            throw Error("失败")
        }
    }

    //
    public async postAblum(ablumName:string,id_Cover:string,ablumBand:string,ablumYear:string){
        return this.ablumModel.find({
            ablumName:ablumName,
            id_Cover:id_Cover,
            ablumBand:ablumBand,
            ablumYear:ablumYear    
        }).then((res)=>{
            if(res.length > 0){
                throw Error("已有此")
            }
        }).then(()=>{
            try{
                const createAblumData = new this.ablumModel(
                    {
                        ablumName:ablumName,
                        id_Cover:id_Cover,
                        ablumBand:ablumBand,
                        ablumYear:ablumYear,
                        ablumPop:0 
                    }
                )
                return createAblumData.save();
            }catch{
                throw Error("保存失败")
            }
        }).catch(err =>{
            console.log("完全错误")
        })
    }

    //
    public async getCoverByAblumId(ablumId:string):Promise<CoverPrivate>{
        try{    
            const ablumInfo = await this.ablumModel.findById(ablumId).lean();
            const coverId = ablumInfo.id_Cover;
            return this.coverModel.findById(coverId).lean();
        }
        catch{
            throw Error("失败")
        }
    }
    
    public async updatePop(ablumId:string){
        const result = await this.ablumModel.findById(ablumId);
        return this.ablumModel.findByIdAndUpdate(ablumId,{$set:{['ablumPop']:result.ablumPop + 1}},{new:true})
    }
}
