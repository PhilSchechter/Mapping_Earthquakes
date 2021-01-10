
// We create the tile layer that will be the background of our map.
let dayGuide = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/navigation-guidance-day-v4/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY,
});

// We create the dark view tile layer that will be an option for our map.
let nightGuide = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/navigation-guidance-night-v4/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
  Day: dayGuide,
  Night: nightGuide
};

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
  center: [44, -80],
  zoom: 2,
  layers: [nightGuide]
});

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);


let torontoData = "https://raw.githubusercontent.com/PhilSchechter/Mapping_Earthquakes/Mapping_GeoJSON_Linestrings/Mapping_GeoJSON_Linesrings/torontoRoutes.json"

// Create a style for the lines.
let myStyle = {
  color: "yellow",
  weight: 2
}

// Grabbing our GeoJSON data.
d3.json(torontoData).then(function(data) {
   console.log(data);
  L.geoJson(data, {
   style: myStyle,
    onEachFeature: function(Feature, layer){
     console.log(layer);
    layer.bindPopup("<h2>Airline: "+ Feature.properties.airline + "</h2><hr><h3>Destination: " +Feature.properties.dst +"</h3>" );
   }}).addTo(map);
});