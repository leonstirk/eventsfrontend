const API_GATEWAY_URL = "https://6hei99srqe.execute-api.ap-southeast-2.amazonaws.com";

async function fetchAndDisplayEvents(map) {
    // Get current map center
    const center = map.getCenter();
    const lat = center.lat;
    const lng = center.lng;
    const radius = 5; // Default radius in km

    
    console.log(`Fetching events near: ${lat}, ${lng}, Radius: ${radius}km`);

    // Construct API request URL
    const url = `${API_GATEWAY_URL}?point=${lat},${lng}&radius=${radius}`;

    try {
	const response = await fetch(url);
	const data = await response.json();
	console.log(data);

	// Extract and display events on the map
	data.events.forEach(event => {
	    if (event.point && event.point.lat && event.point.lng) {
		console.log(`Adding marker: ${event.name} at [${event.point.lng}, ${event.point.lat}]`);

		new maplibregl.Marker({ color: "red" })
		    .setLngLat([event.point.lng, event.point.lat])
		    .setPopup(new maplibregl.Popup().setText(`${event.name} - ${event.venue ? event.venue.name : "Unknown Venue"}`))
		    .addTo(map);
	    } else {
		console.warn(`Skipping event "${event.name}" due to missing coordinates`);
	    }
	});

	console.log("All event markers added!");

    } catch (error) {
	console.error("Error fetching events:", error);
    }
}

