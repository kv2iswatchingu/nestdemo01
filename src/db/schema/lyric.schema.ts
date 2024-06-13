import { SchemaFactory } from "@nestjs/mongoose";
import { Lyric } from "src/interface/lyric.interface";

export const LyricSchmema = SchemaFactory.createForClass(Lyric);