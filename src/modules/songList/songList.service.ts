import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { songListDto } from 'src/dto/pagination.dto';
import { SongList, SongListOutput } from 'src/interface/songList.interface';

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

    public async getMainPage():Promise<SongList[]>{
        try{
            return this.songListModel.aggregate([
                {$sample:{size:8}}
            ]);
        }catch{
            throw Error("失败")
        }
    }

    public async getSongList(query:songListDto):Promise<SongList[]>{
        const {  page,limit,sortBy,name,category } = query
        //console.log(query)
        //console.log(query.name)

        const filters:any = {};
        if(name){
            filters.songListName = { $regex:name,$options:"i"};
        }
        if(category){
            filters.songListStyle = { $regex:category,$options:"i"};
        }
        ///adddd

        const sort:any = {}
        if(sortBy){
            const sortDirection = sortBy.startsWith('-') ? -1 : 1;
            sort[sortBy.replace(/^-/, '')] = sortDirection;
        } 

        return this.songListModel.find(filters)
        .sort(sort)
        .skip((page - 1) * limit)
        .limit(limit)
        .lean();
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
