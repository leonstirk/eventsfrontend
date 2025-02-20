const API_GATEWAY_URL = "https://6hei99srqe.execute-api.ap-southeast-2.amazonaws.com/";
function getFutureDateISO() {
    // Get current time in Auckland timezone
    const now = new Date();

    // Convert to Auckland timezone & add 1 day
    const futureDate = new Date(
	new Intl.DateTimeFormat("en-US", {
	    timeZone: "Pacific/Auckland",
	    year: "numeric",
	    month: "2-digit",
	    day: "2-digit",
	    hour: "2-digit",
	    minute: "2-digit",
	    second: "2-digit",
	    hour12: false
	}).format(now)
	    .replace(/(\d{2})\/(\d{2})\/(\d{4}), (\d{2}):(\d{2}):(\d{2})/, "$3-$1-$2T$4:$5:$6") // Format as YYYY-MM-DDTHH:mm:ss
    );

    // Add 1 day to the Auckland time
    futureDate.setDate(futureDate.getDate() + 1);

    // Convert to ISO 8601 format without milliseconds
    const formattedDate = futureDate.toISOString().split('.')[0]; // "YYYY-MM-DDTHH:mm:ss"

    // Encode for URL
    return encodeURIComponent(formattedDate);
}

//console.log(getFutureDateISO());
// Example Output: "2024-03-05T14%3A30%3A00" (URL-encoded for "2024-03-05T14:30:00")

async function fetchAndDisplayEvents(map) {
    // Get current map center
    const center = map.getCenter();
    const lat = center.lat;
    const lng = center.lng;
    const radius = 5; // Default radius in km
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
	// Build a detailed popup content
	let popupContent = `<strong>${event.name}</strong><br>`;

	// Include event description (truncate if too long)
	if (event.description) {
	    popupContent += `<p>${event.description.length > 150 ? event.description.substring(0, 150) + "..." : event.description}</p>`;
	}

	// Include start and end time
	if (event.datetime_start) {
	    popupContent += `<strong>Start:</strong> ${new Date(event.datetime_start).toLocaleString("en-NZ", { timeZone: "Pacific/Auckland" })}<br>`;
	}
	if (event.datetime_end) {
	    popupContent += `<strong>End:</strong> ${new Date(event.datetime_end).toLocaleString("en-NZ", { timeZone: "Pacific/Auckland" })}<br>`;
	}

	// Include location summary and address
	if (event.location_summary) {
	    popupContent += `<strong>Location:</strong> ${event.location_summary}<br>`;
	}
	if (event.address) {
	    popupContent += `<strong>Address:</strong> ${event.address}<br>`;
	}

	// Include event URL
	if (event.url) {
	    popupContent += `<a href="${event.url}" target="_blank">View Event</a>`;
	}

	// Create marker and attach the popup
	const marker = new maplibregl.Marker({ color: "red" })
	      .setLngLat([event.point.lng, event.point.lat])
	      .setPopup(new maplibregl.Popup().setHTML(popupContent))
	      .addTo(map);

	window.eventMarkers.push(marker);
	console.log(`ð Marker added for event: ${event.name}`);
    });

    console.log("â All event markers added to the map.");
}

