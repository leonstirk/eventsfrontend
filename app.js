const API_GATEWAY_URL = "https://6hei99srqe.execute-api.ap-southeast-2.amazonaws.com/";

// async function fetchAndDisplayEvents(map) {
//     // Get current map center
//     const center = map.getCenter();
//     const lat = center.lat;
//     const lng = center.lng;
//     const radius = 10; // Default radius in km
//     const rows = 40; // Default number of rows 40
    
//     console.log(`Fetching events near: ${lat}, ${lng}, Radius: ${radius}km`);

//     // Construct API request URL
//     const url = `${API_GATEWAY_URL}?lat=${lat}&lng=${lng}&radius=${radius}&rows=${rows}&order=distance`;

//     try {
// 	const response = await fetch(url);
// 	const data = await response.json();

// 	// Log and display events
// 	console.log("Fetched Events:", data);
// 	addEventsToMap(data, map);
//     } catch (error) {
// 	console.error("Error fetching events:", error);
//     }
// }

async function fetchAndDisplayEvents(map) {
    // Get current map center
    const center = map.getCenter();
    const lat = center.lat;
    const lng = center.lng;
    const radius = 10; // Default radius in km
    const rows = 40; // Request 40 rows

    // Construct API request URL
    const url = `${API_GATEWAY_URL}?lat=${lat}&lng=${lng}&radius=${radius}&rows=${rows}&order=distance`;

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
