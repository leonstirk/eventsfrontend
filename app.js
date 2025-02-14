const API_URL = "https://tdmukcers6.execute-api.ap-southeast-2.amazonaws.com/events?lat=40.7580&lon=-73.9855&radius=5200"

function fetchEvents() {
    console.log("Fetching events...");  // Debug: Check if function runs

    fetch(API_URL)
        .then(response => {
	    console.log("API Response Status:", response.status);  // Debug: Log status code
	    return response.json();
	})
        .then(data => {
	    console.log("API Response Data:", data);  // Debug: Log full response
	    const eventList = document.getElementById("event-list");
	    eventList.innerHTML = "";

	    data.forEach(event => {
		const li = document.createElement("li");
		li.textContent = `${event.name} - ${event.venue} - ${event.date}`;
		eventList.appendChild(li);
	    });
	})
        .catch(error => console.error("Error fetching events:", error));
}
