import { FROST_API_KEY } from '$env/static/private';

export interface Station {
	id: string;
	name?: string;
	shortName?: string;
	county?: string;
	municipality?: string;
	municipalityId?: number;
	country?: string;
	geometry?: {
		'@type': string;
		coordinates: string; //"59.9423, 10.72"
	};
}

export interface StationRainData {
	referenceTime: string;
	observations: {
		value: number;
		unit: string;
	}[];
}

const stations: Station[] = [];

async function fetchAllStations() {
	return await fetch('https://frost.met.no/sources/v0.jsonld?types=SensorSystem', {
		headers: {
			Authorization: `Basic ${FROST_API_KEY}`
		}
	})
		.then(async (res) => {
			const resJson = await res.json();
			const frostStations: Station[] = resJson.data;
			stations.push(...frostStations.sort((a, b) => a.name?.localeCompare(b.name ?? '') || 0));
		})
		.catch((err) => {
			console.error(err);
		});
}

export async function fetchStationRainData(id: string) {
	return await fetch(
		`https://frost.met.no/observations/v0.jsonld?sources=${id}&referencetime=latest&elements=sum(precipitation_amount%20PT1H)&maxage=P1D&limit=all&fields=referenceTime%2Cvalue%2Cunit`,
		{
			headers: {
				Authorization: `Basic ${FROST_API_KEY}`
			}
		}
	)
		.then(async (res) => {
			const resJson = await res.json();
			return (resJson.data ?? []) as StationRainData[];
		})
		.catch((err) => {
			console.error(err);
			return [];
		});
}

fetchAllStations();

export function getStationsByQuery(query: string) {
	if (!query) return stations;
	return stations.filter(
		(station) =>
			station.name?.toLowerCase().includes(query.toLowerCase()) ||
			station.shortName?.toLowerCase().includes(query.toLowerCase()) ||
			station.id?.toLowerCase().includes(query.toLowerCase()) ||
			station.county?.toLowerCase().includes(query.toLowerCase()) ||
			station.municipality?.toLowerCase().includes(query.toLowerCase()) ||
			station.municipalityId?.toString().includes(query) ||
			station.country?.toLowerCase().includes(query.toLowerCase())
	);
}

export function getStationById(id: string) {
	return stations.find((station) => station.id === id);
}
