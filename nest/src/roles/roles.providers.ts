import { Role } from './role.entity';

export const rolesProviders = [
    {
        provide: 'ROLES_REPOSITORY',
        useValue: Role,
    },
];