import { Post } from './post.entity';

export const postsProviders = [
    {
        provide: 'POSTS_REPOSITORY',
        useValue: Post,
    },
];