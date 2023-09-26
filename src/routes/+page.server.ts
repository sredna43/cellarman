import { wines } from '$lib/server/wines.js';
import type { Wine } from '$lib/typings/types.js';
import { ObjectId, type FindOptions } from 'mongodb';
import type { PageServerLoad } from './$types.js';

export const actions = {
	add: async (event) => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const saveObject: any = {};
		const data = await event.request.formData();
		data.forEach((val, key) => {
			saveObject[key.toString()] = val.toString();
		});
		const id = new ObjectId(saveObject._id) || new ObjectId();
		saveObject._id && delete saveObject._id;
		try {
			await wines.updateOne({ _id: id }, { $set: saveObject }, { upsert: true });
			console.log('Saved record', saveObject);
		} catch (e) {
			console.error(e);
		}
	},

	delete: async (event) => {
		const id: string = (await event.request.formData()).get('_id')?.valueOf().toString() || '';
		try {
			await wines.deleteOne({ _id: { $eq: new ObjectId(id) } });
		} catch (e) {
			console.error(e);
		}
	}
};

export const load: PageServerLoad = async () => {
	const query = {};
	const options = { sort: { bottles: -1 } };
	const data = (await wines.find(query, options as FindOptions<Document>).toArray()).map((item) =>
		JSON.parse(
			JSON.stringify(item, (key, value) => (key === '_id' ? value.toString(value) : value))
		)
	);
	if ((await wines.countDocuments(query)) === 0) {
		console.log('no documents found');
		return {
			wines: []
		};
	}

	return {
		wines: data as Wine[]
	};
};
