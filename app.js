// const API_URL = "https://tdmukcers6.execute-api.ap-southeast-2.amazonaws.com/events?lat=40.7580&lon=-73.9855&radius=5200"

// async function fetchAndDisplayEvents(map) {
//     console.log("Fetching events from API...");

//     try {
// 	const response = await fetch(API_URL);
// 	console.log("API Response Status:", response.status);

// 	if (!response.ok) {
// 	    throw new Error(`API error: ${response.status} ${response.statusText}`);
// 	}

// 	const events = await response.json();
// 	console.log("Events received:", events);

// 	events.forEach(event => {
// 	    new maplibregl.Marker({ color: "red" })
// 	        .setLngLat([event.longitude, event.latitude]) // Use correct coordinates
// 	        .setPopup(new maplibregl.Popup().setText(`${event.name} - ${event.venue}`))
// 	        .addTo(map);
// 	});

// 	console.log("Event markers added to the map!");
//     } catch (error) {
// 	console.error("Error fetching events:", error);
//     }
// }


const API_GATEWAY_URL = "https://6hei99srqe.execute-api.ap-southeast-2.amazonaws.com";

async function fetchAndDisplayEvents() {
    try {
	const response = await fetch(`${API_GATEWAY_URL}?rows=20`);
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

// const EVENTFINDA_API_URL = "https://api.eventfinda.co.nz/v2/events.json?rows=20";  // Fetches 20 events
// const EVENTFINDA_USERNAME = "na14";  // Replace with your Eventfinda username
// const EVENTFINDA_PASSWORD = "cc2pjkc8bp4m";  // Replace with your Eventfinda password

// async function fetchAndDisplayEvents(map) {
//     console.log("Fetching events from Eventfinda API...");

//     try {
// 	const response = await fetch(EVENTFINDA_API_URL, {
// 	    method: "GET",
// 	    headers: {
// 		"Authorization": "Basic " + btoa(`${EVENTFINDA_USERNAME}:${EVENTFINDA_PASSWORD}`),
// 		"Accept": "application/json"
// 	    }
// 	});

// 	console.log("API Response Status:", response.status);

// 	if (!response.ok) {
// 	    throw new Error(`API error: ${response.status} ${response.statusText}`);
// 	}

// 	const data = await response.json();
// 	console.log("Events received:", data);

// 	// Extract and display events on the map
// 	data.events.forEach(event => {
// 	    if (event.point && event.point.lat && event.point.lng) {
// 		console.log(`Adding marker: ${event.name} at [${event.point.lng}, ${event.point.lat}]`);

// 		new maplibregl.Marker({ color: "red" })
// 		    .setLngLat([event.point.lng, event.point.lat])
// 		    .setPopup(new maplibregl.Popup().setText(`${event.name} - ${event.venue ? event.venue.name : "Unknown Venue"}`))
// 		    .addTo(map);
// 	    } else {
// 		console.warn(`Skipping event "${event.name}" due to missing coordinates`);
// 	    }
// 	});

// 	console.log("All event markers added!");

//     } catch (error) {
// 	console.error("Error fetching events:", error);
//     }
// }
