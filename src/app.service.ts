import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World! shimakaze!!';

  }
  getMyFun():string {
    return 'myFun nest的页面路由';
  }
}
