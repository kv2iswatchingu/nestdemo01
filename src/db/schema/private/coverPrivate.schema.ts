import { SchemaFactory } from "@nestjs/mongoose";
import { CoverPrivate } from "src/interface/CoverPrivate.interface";
export const CoverPrivateSchmema = SchemaFactory.createForClass(CoverPrivate);