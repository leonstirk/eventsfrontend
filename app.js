const API_URL = "https://tdmukcers6.execute-api.ap-southeast-2.amazonaws.com/events?lat=40.7580&lon=-73.9855&radius=5200"

async function fetchAndDisplayEvents(map) {
    console.log("Fetching events from API...");

    try {
	const response = await fetch(API_URL);
	console.log("API Response Status:", response.status);

	if (!response.ok) {
	    throw new Error(`API error: ${response.status} ${response.statusText}`);
	}

	const events = await response.json();
	console.log("Events received:", events);

	events.forEach(event => {
	    new maplibregl.Marker({ color: "red" })
	        .setLngLat([event.longitude, event.latitude]) // Use correct coordinates
	        .setPopup(new maplibregl.Popup().setText(`${event.name} - ${event.venue}`))
	        .addTo(map);
	});

	console.log("Event markers added to the map!");
    } catch (error) {
	console.error("Error fetching events:", error);
    }
}



    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <script>

var username = 'na14';
var password = 'cc2pjkc8bp4m';
$.ajax({
    url: 'https://api.eventfinda.co.nz/v/events.json',
    beforeSend: function (xhr) {
	xhr.setRequestHeader ("Authorization", "Basic " + btoa(username + ":" + password));
    },
    success: function(xhr) {
	console.log(xhr);
    }
});
</script>


https://api.eventfinda.co.nz/v2/events.xml?row=10&fields=event:(url,name,sessions),session:(timezone,datetime_start)&q=concert&order=popularity
