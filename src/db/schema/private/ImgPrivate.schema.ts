import { SchemaFactory } from "@nestjs/mongoose";
import { ImgPrivate } from "src/interface/ImgPrivate.interface";
export const ImgPrivateSchmema = SchemaFactory.createForClass(ImgPrivate);