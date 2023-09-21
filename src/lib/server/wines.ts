import type { Wine } from '$lib/types';
import db from './database';

export const wines = db.collection<Wine>('wines');
