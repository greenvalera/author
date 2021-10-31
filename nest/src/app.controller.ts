import {Controller, Get} from '@nestjs/common';
import {AppService} from './app.service';

@Controller('/api')
export class AppController {

    @Get('/users')
    getUsers() {
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
