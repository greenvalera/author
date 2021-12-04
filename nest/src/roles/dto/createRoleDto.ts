import {ApiProperty} from "@nestjs/swagger";

export class CreateRoleDto {
    @ApiProperty({example: 'ADMIN', description: 'User role'})
    readonly value: string;

    @ApiProperty({example: 'User with all privileges', description: 'Description of user role'})
    readonly description: string;
}