const API_URL = "https://tdmukcers6.execute-api.ap-southeast-2.amazonaws.com/events?lat=40.7580&lon=-73.9855&radius=5200"

// Fetch event locations and place them on the map
async function fetchEvents() {
    console.log("Fetching events...");

    const response = await fetch(API_URL);
    const events = await response.json();

    console.log("Events received:", events);

    events.forEach(event => {
	new amazon.Location.Marker({
	    position: [event.longitude, event.latitude],
	    title: event.name,
	    map,
	});
    });
}

// Initialize the map when the page loads
document.addEventListener("DOMContentLoaded", initMap);

