import {Pool} from "./pool.entity";

export const poolsProviders = [
    {
        provide: 'POOLS_REPOSITORY',
        useValue: Pool,
    },
];