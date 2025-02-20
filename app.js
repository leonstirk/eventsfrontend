const API_GATEWAY_URL = "https://6hei99srqe.execute-api.ap-southeast-2.amazonaws.com/";

function getFutureDateISO() {
    const now = new Date();
    now.setDate(now.getDate() + 2); // Add 2 days

    // Format as YYYY-MM-DD HH:mm:ss
    const formattedDate = now.toISOString().split('T')[0] + " " +
	  now.toISOString().split('T')[1].split('.')[0];

    return formattedDate;
}

// console.log(getFutureDateISO());  // Example Output: "2024-03-01 14:30:00"

async function fetchAndDisplayEvents(map) {
    // Get current map center
    const center = map.getCenter();
    const lat = center.lat;
    const lng = center.lng;
    const radius = 0.5; // Default radius in km
    const rows = 20; // Request 20 rows
    const end_date = getFutureDateISO()

    // Construct API request URL
    const url = `${API_GATEWAY_URL}?lat=${lat}&lng=${lng}&radius=${radius}&rows=${rows}&order=distance$end_date=${end_date}`;

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
