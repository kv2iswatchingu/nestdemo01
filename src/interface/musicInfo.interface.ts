import { Prop, Schema } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class MusicInfo extends Document{
    @Prop()
    readonly _AblumId:string;

    @Prop()
    readonly _MusicRawId:string;

    @Prop()
    readonly musicName:string;

    @Prop()
    readonly musicStyle:string;

    @Prop()
    readonly musicSinger:string;

    @Prop()
    readonly musicAuthor:string;

    @Prop()
    readonly musicLong:number;

    @Prop()
    readonly musicUploadTime:string;
}

export class MusicInfoExtend extends Document{
    @Prop()
    readonly _AblumId:string;

    @Prop()
    readonly musicName:string;

    @Prop()
    readonly musicStyle:string;

    @Prop()
    readonly musicSinger:string;

    @Prop()
    readonly musicAuthor:string;

    @Prop()
    readonly musicLong:number;

    @Prop()
    readonly musicUploadTime:string;

}

export type MusicInfoOutput = {
    _id:unknown;
    _AblumId:string;
    musicRaw:Buffer;
    musicName:string;
    musicStyle:string;
    musicSinger:string;
    musicAuthor:string;
    musicLong:number;
    musicUploadTime:string;
}