const API_GATEWAY_URL = "https://6hei99srqe.execute-api.ap-southeast-2.amazonaws.com/";

function getFutureDateISO() {
    const now = new Date();
    now.setDate(now.getDate() + 1); // Add 2 days

    // Convert to ISO format and remove milliseconds
    const formattedDate = now.toISOString().split('.')[0]; // "YYYY-MM-DDTHH:mm:ss"

    // Encode for URL
    return encodeURIComponent(formattedDate);
}

async function fetchAndDisplayEvents(map) {
    // Get current map center
    const center = map.getCenter();
    const lat = center.lat;
    const lng = center.lng;
    const radius = 0.2; // Default radius in km
    const rows = 20; // Request 20 rows
    const end_date = getFutureDateISO()

    // Construct API request URL
    const url = `${API_GATEWAY_URL}?lat=${lat}&lng=${lng}&radius=${radius}&rows=${rows}&order=distance&end_date=${end_date}`;

    console.log(`API Request URL: ${url}`);

    try {
	const response = await fetch(url);
	console.log("API Response Status:", response.status);

	if (!response.ok) {
	    throw new Error(`API error: ${response.status} ${response.statusText}`);
	}

	const data = await response.json();
	console.log(`Number of events received: ${data.events.length}`);

	// Display events on the map
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
	      .setLngLat([event.point.lng, event.point.lat])
	      .setPopup(new maplibregl.Popup().setText(event.name)) // Show event name on click
	      .addTo(map);

	window.eventMarkers.push(marker);
	console.log("Marker added")
    });

    console.log("Markers added to map.");
}
