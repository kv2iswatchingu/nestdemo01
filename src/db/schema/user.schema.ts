import { SchemaFactory } from "@nestjs/mongoose";
import { User } from "src/interface/user.interface";

export const UserSchmema = SchemaFactory.createForClass(User);