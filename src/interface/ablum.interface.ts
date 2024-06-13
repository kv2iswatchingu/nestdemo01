import { Prop, Schema } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Ablum extends Document{
    @Prop()
    readonly ablumName:string;

    @Prop()
    readonly id_Cover:string;

    @Prop()
    readonly ablumBand:string;

    @Prop()
    readonly ablumYear:string;
}

export class AblumInfo extends Document{
    @Prop()
    readonly ablumName:string;

    @Prop()
    readonly ablumBand:string;

    @Prop()
    readonly ablumYear:string;
}

export type AblumOutput = {
    ablumName:string;
    coverRaw:Buffer;
    coverType:string;
    ablumBand:string;
    ablumYear:string;

}