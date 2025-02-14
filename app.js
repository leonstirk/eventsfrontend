const API_URL = "https://tdmukcers6.execute-api.ap-southeast-2.amazonaws.com/events?lat=40.7580&lon=-73.9855&radius=5200"

function fetchEvents() {
    fetch(API_URL)
        .then(response => response.json())
        .then(events => {
	    const eventList = document.getElementById("event-list");
	    eventList.innerHTML = "";

	    events.forEach(event => {
		const li = document.createElement("li");
		li.textContent = `${event.name} - ${event.venue} - ${event.date}`;
		eventList.appendChild(li);
	    });
	})
        .catch(error => console.error("Error fetching events:", error));
}
