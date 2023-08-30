import { fetchStationRainData, getStationById } from '$lib/met/frost/frost.js';

export async function load({ params }) {
	const stationRainData = await fetchStationRainData(params.slug);
	const rainObservations: Record<string, number> = {};
	stationRainData.forEach(({ observations, referenceTime }) => {
		rainObservations[referenceTime] = observations[0].value;
	});
	const stationData = getStationById(params.slug);

	return {
		stationData: stationData,
		rainObservations: rainObservations
	};
}
