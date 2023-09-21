import { start_mongo } from '$lib/server/database';

start_mongo()
	.then(() => {
		console.log('Connected to database');
	})
	.catch((e) => console.error(e));
