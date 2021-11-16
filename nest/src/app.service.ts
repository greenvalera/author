import { Injectable } from '@nestjs/common';
import {IUser} from "./models/user";

@Injectable()
export class AppService {
  getUsers(): IUser[] {
    return [
      {
        id: 1,
        name: 'Valera',
      },
      {
        id: 2,
        name: 'Valeraaaaa',
      },
    ];
  }
}
