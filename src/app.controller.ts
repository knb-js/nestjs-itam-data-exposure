import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller("/hello")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post("/name")
  getName(@Body() body):string{
    console.log(body);
    const name = "pedro";
    return this.appService.getName(body.name);
  }
}
