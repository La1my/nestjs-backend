import { SetMetadata } from '@nestjs/common';

export const ADMIN_KEY = 'isAdmin';

export const isAdmin = (isAdmin: boolean) => SetMetadata(ADMIN_KEY, isAdmin);
