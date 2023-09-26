import type { Wine } from '$lib/typings/types';
import db from './database';

export const wines = db.collection<Wine>('wines');
