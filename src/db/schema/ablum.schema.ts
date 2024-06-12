import { SchemaFactory } from "@nestjs/mongoose";
import { Ablum } from "src/interface/ablum.interface";

export const AblumSchmema = SchemaFactory.createForClass(Ablum);