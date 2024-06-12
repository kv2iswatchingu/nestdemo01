import { Prop, Schema } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class ImgPrivate extends Document{
    @Prop()
    readonly imgName:string;

    @Prop()
    readonly imgRaw:Buffer;

    @Prop()
    readonly imgSize:number;

    @Prop()
    readonly imgType:string;
}