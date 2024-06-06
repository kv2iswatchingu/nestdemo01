import { Prop, Schema } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class MusicSavePrivate extends Document{
    @Prop()
    readonly musicName:string;

    @Prop()
    readonly musicRaw:Buffer;

    @Prop()
    readonly musicSize:number;
}