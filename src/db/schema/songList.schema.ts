import { SchemaFactory } from "@nestjs/mongoose";
import { SongList } from "src/interface/songList.interface";

export const SongListSchmema = SchemaFactory.createForClass(SongList);