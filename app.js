// Step 1: Setup API Key and AWS Region
const API_KEY = "v1.public.eyJqdGkiOiI4NDMzMjEzZi1kODE0LTQzOWUtOTE2Ny0yODY1ZjIyZTIzMWIifStjGlcH_QWCBYvNNhliQunck8zUMjKq-WztLWokV_DepbdPs7z2p\
2KObbwLx3H9LLtj_CIWRih6yRWH1SozaDU0HhF433Twic0dCHm4F7McwJJHaEDppvqJO2cTxduPPLD-MkyDMZqZz6NYmR2PllRcjTwrAhboId8CbfIlPzbSvzIcWOiXMbAcsRlyoUxF-RKdN-p46ibmiuPpwdJFzubprTFq8yMAE_zyEtBDpi1PBzPvM2hSV6JYgOTs12JY-lFJkEmxtft_RkTFvngn_HSN6kD8UiS7VMmnKZnxO2s1KcpPI24PJlIw1ZyjNF9P41G2Jtf6oSCqnxJfuYTBnfk.ZTA2OTdiZTItNzgyYy00YWI5LWFmODQtZjdkYmJkODNkMmFh";
const AWS_REGION = "ap-southeast-2";

// Step 2 Add maps to application
// Step 2.1 initialize the map
const map = initializeMap("Standard","Light");
// Step 2.2 Add navigation controls to the map
map.addControl(new maplibregl.NavigationControl());
// Step 3: Add places features to application
// Step 3.1: Get GeoPlaces instance. It will be used for addion search box and map click functionality
// Step 3.2: Add search box to the map
// Step 3.3.: Setup map click functionality
// Add functions

/**
 * Initializes the map with the specified style and color scheme.
 */
function initializeMap(mapStyle = "Standard", colorScheme = "Dark") {
    const styleUrl = `https://maps.geo.${AWS_REGION}.amazonaws.com/v2/styles/${mapStyle}/descriptor?key=${API_KEY}&color-scheme=${colorSchem\
e}`;
    const map = new maplibregl.Map({
	container: 'map',                 // The ID of the map container
	style: styleUrl,                  // The style URL for the map
	center: [-73.9855, 40.7580],      // Starting center coordinates
	zoom: 10,                         // Initial zoom level
	validateStyle: false              // Disable style validation
    });
    return map;                           // Return the initialized map
}

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
document.addEventListener("DOMContentLoaded", initializeMap);



// // Replace with your actual Amazon Location credentials
// const AWS_REGION = "ap-southeast-2";
// const MAP_NAME = "event-map";
// const API_URL = "https://tdmukcers6.execute-api.ap-southeast-2.amazonaws.com/events?lat=40.7580&lon=-73.9855&radius=5200";

// // Initialize the map
// async function initMap() {
//     const { createMap } = await import("https://unpkg.com/amazon-location-sdk@latest");

//     const map = createMap({
// 	container: "map", // The div where the map will be displayed
// 	region: AWS_REGION,
// 	mapName: MAP_NAME,
//     });

//     console.log("Map initialized successfully!", map);
}




