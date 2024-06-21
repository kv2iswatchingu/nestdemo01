import { Prop, Schema } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class SongList extends Document{
    @Prop()
    readonly _MusicIdList:string[];

    @Prop()
    readonly _ImgPrivate_id:string;

    @Prop()
    readonly songListName:string;

    @Prop()
    readonly songListDesprition:string;

    @Prop()
    readonly songListStyle:string;

    @Prop()
    readonly songListPop:number;
}

export class SongListExtend extends Document{
    @Prop()
    readonly _MusicIdList:string;

    @Prop()
    readonly songListName:string;

    @Prop()
    readonly songListDesprition:string;

    @Prop()
    readonly songListStyle:string;

}

export type SongListOutput = {
    _id:unknown;
    _MusicIdList:string[];
    ImgRaw:Buffer;
    songListName:string;
    songListDesprition:string;
    songListStyle:string;
    songListPop:number;
}

