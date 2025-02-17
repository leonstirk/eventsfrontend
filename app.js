const API_GATEWAY_URL = "https://6hei99srqe.execute-api.ap-southeast-2.amazonaws.com/";

async function fetchAndDisplayEvents(map) {
    // Get current map center
    const center = map.getCenter();
    const lat = center.lat;
    const lng = center.lng;
    const radius = 1; // Default radius in km

    console.log(`Fetching events near: ${lat}, ${lng}, Radius: ${radius}km`);

    // Construct API request URL
    const url = `${API_GATEWAY_URL}?lat=${lat}&lng=${lng}&radius=${radius}`;

    try {
	const response = await fetch(url);
	const data = await response.json();

	// Log and display events
	console.log("Fetched Events:", data);
	addEventsToMap(data, map);
    } catch (error) {
	console.error("Error fetching events:", error);
    }
}

function addEventsToMap(events, map) {
    // Remove old event markers if necessary
    if (window.eventMarkers) {
	window.eventMarkers.forEach(marker => marker.remove());
    }
    window.eventMarkers = [];

    // Loop through events and add markers
    events.events.forEach(event => {
	const marker = new maplibregl.Marker({ color: "red" })
	      .setLngLat([event.point.lon, event.point.lat])
	      .setPopup(new maplibregl.Popup().setText(event.name)) // Show event name on click
	      .addTo(map);

	window.eventMarkers.push(marker);
    });

    console.log("Markers added to map.");
}
