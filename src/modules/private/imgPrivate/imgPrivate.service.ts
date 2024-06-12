import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ImgPrivate } from 'src/interface/ImgPrivate.interface';

@Injectable()
export class ImgPrivateService {
    constructor(
       @InjectModel("IMG_MODEL") private readonly imgPrivateModel: Model<ImgPrivate>
    ){}

    async saveImgPrivate(imgName:string,imgRaw:Buffer,imgSize:number,imgType:string):Promise<any>{
        return this.imgPrivateModel.find({
            imgName:imgName,
            imgRaw:imgRaw,
            imgSize:imgSize,
            imgType:imgType
        }).then(res =>{
            if(res.length != 0){
                console.log("已有")
                throw Error("已有此")
            }
        }).then(()=>{
            try{
                const createImgData = new this.imgPrivateModel(
                    {
                        imgName:imgName,
                        imgRaw:imgRaw,
                        imgSize:imgSize,
                        imgType:imgType
                    }
                )
                /* const result = await createImgData.save();
                return result; */
                return createImgData.save();
            }catch{
                throw Error("保存失败")
            }
        }).catch(err =>{
            console.log("完全错误")
        })
    }

    async findImgPrivate(id:string):Promise<ImgPrivate>{
        return this.imgPrivateModel.findById(id).lean();
    }

    
}
