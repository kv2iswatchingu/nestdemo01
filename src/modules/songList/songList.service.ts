import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SongList } from 'src/interface/songList.interface';

@Injectable()
export class SongListService {
    constructor(
        @InjectModel("SongList_MODEL") private readonly songListModel: Model<SongList>
    ){}

    public async getSongListById(songListId:string):Promise<SongList>{
        return this.songListModel.findById(songListId).lean();
    }

    public async getAll():Promise<SongList[]>{
        try{
            return this.songListModel.find().lean();
        }catch{
            throw Error("失败")
        }
    }

    public async postSongList(_MusicIdList:string[],_ImgPrivate_id:string,songListName:string,songListDesprition:string,songListStyle:string){
        try{
            const coverSongListData = new this.songListModel({
                _MusicIdList:_MusicIdList,
                _ImgPrivate_id:_ImgPrivate_id,
                songListName:songListName,
                songListDesprition:songListDesprition,
                songListStyle:songListStyle
            })
            return coverSongListData.save();
        }catch{
            throw Error("保存失败")
        }
    }
}
