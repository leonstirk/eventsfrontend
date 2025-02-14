const API_URL = "https://your-api-id.execute-api.ap-southeast-2.amazonaws.com/prod/events";

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
