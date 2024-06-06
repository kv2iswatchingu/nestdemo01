import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/interface/user.interface';

@Controller('user')
export class UserController {
    constructor(
        private userService:UserService
    ){

    }

    @Post('regist')
    async registUser(@Body() userDto:User){
        return await this.userService.regist(userDto)
    }
}
