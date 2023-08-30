import { getStationsByQuery, type Station } from '$lib/met/frost/frost.js';

let stationData: Station[] = [];

export function load() {
	return {
		stations: stationData
	};
}

export const actions = {
	stationQuery: async ({ request }) => {
		const data = await request.formData();
		stationData = getStationsByQuery(String(data.get('stationQuery')));
	}
};
