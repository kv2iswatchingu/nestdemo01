import { Prop, Schema } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Document } from "mongoose";

@Schema()
export class User extends Document{
    @Prop()
    @ApiProperty({
        description:"用户账户",
        example:"12312341234"
    })
    readonly userAccount:string;

    @Prop()
    @ApiProperty({
        description:"用户密码",
        example:"123456"
    })
    readonly userPassword:string;
}