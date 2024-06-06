import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('defalut/index')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('myFun')
  getMyFun():string{
    return this.appService.getMyFun();
  }
}
