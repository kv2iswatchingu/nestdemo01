import { SchemaFactory } from "@nestjs/mongoose";
import { MusicInfo } from "src/interface/musicInfo.interface";

export const MusicInfoSchmema = SchemaFactory.createForClass(MusicInfo);