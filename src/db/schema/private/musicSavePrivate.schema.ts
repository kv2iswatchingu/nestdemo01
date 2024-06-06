import { SchemaFactory } from "@nestjs/mongoose";
import { MusicSavePrivate } from "src/interface/musicSavePrivate.interface";
export const MusicSavePrivateSchmema = SchemaFactory.createForClass(MusicSavePrivate);