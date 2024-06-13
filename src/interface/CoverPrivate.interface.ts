import { Prop, Schema } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class CoverPrivate extends Document{
    @Prop()
    readonly coverName:string;

    @Prop()
    readonly coverRaw:Buffer;

    @Prop()
    readonly coverSize:number;

    @Prop()
    readonly coverType:string;
}