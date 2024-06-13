import { Prop, Schema } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Lyric extends Document{
    @Prop()
    readonly _MusicInfoId:string;

    @Prop()
    readonly lyricContent:string;

}

export type LyricOutput = {
    lyric:string;
}
