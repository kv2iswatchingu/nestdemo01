import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/interface/user.interface';

@Injectable()
export class UserService {
    constructor(
        @InjectModel("USER_MODEL") private readonly userModel: Model<User>
    ){}

    public async regist(user:User){
        return this.userModel.find({
            userAccount:user.userAccount,
            userPassword:user.userPassword
        }).then(res =>{
            if(res.length != 0){
                console.log("已注册！")
                throw Error("已注册！")
            }
        }).then(()=>{
            try{
                const createUser = new this.userModel(user)
                return createUser.save();
            }catch{
                throw Error("保存失败")
            }
        }).catch(err =>{
            console.log("完全错误")
        })
    }
}
