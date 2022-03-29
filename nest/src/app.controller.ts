import { Controller, Get, Request } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}