const API_URL = "https://tdmukcers6.execute-api.ap-southeast-2.amazonaws.com/events?lat=40.7580&lon=-73.9855&radius=5200"

async function fetchAndDisplayEvents(map) {
    console.log("ð¡ Fetching events from API...");

    try {
	const response = await fetch(API_URL);
	console.log("ð¢ API Response Status:", response.status);

	if (!response.ok) {
	    throw new Error(`â API error: ${response.status} ${response.statusText}`);
	}

	const events = await response.json();
	console.log("ð¢ Events received:", events);

	events.forEach(event => {
	    new maplibregl.Marker({ color: "red" })
	        .setLngLat([event.longitude, event.latitude]) // Use correct coordinates
	        .setPopup(new maplibregl.Popup().setText(`${event.name} - ${event.venue}`))
	        .addTo(map);
	});

	console.log("ð Event markers added to the map!");
    } catch (error) {
	console.error("ð¨ Error fetching events:", error);
    }
}

