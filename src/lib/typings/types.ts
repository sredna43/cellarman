import type { ObjectId } from 'mongodb';

export interface Wine {
	_id?: ObjectId;
	name?: string;
	points?: string;
	maker?: string;
	appellation?: string;
	vintage?: string;
	varietal?: string;
	price?: string;
	purchaseDate?: string;
	bottles?: string;
	notes?: string;
	type?: string;
}

export type Pages = {
	[path: string]: string;
};
