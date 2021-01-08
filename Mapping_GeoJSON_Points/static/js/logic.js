//add console.log to check if our code is getting here
console.log("working - from logic.js")

// create map object with center at San Francisco airport
let map = L.map('mapid').setView([37.5,-122.5],10);

// Add GeoJSON data.
let sanFranAirport =
{"type":"FeatureCollection","features":[{
    "type":"Feature",
    "properties":{
        "id":"3469",
        "name":"San Francisco International Airport",
        "city":"San Francisco",
        "country":"United States",
        "faa":"SFO",
        "icao":"KSFO",
        "alt":"13",
        "tz-offset":"-8",
        "dst":"A",
        "tz":"America/Los_Angeles"},
        "geometry":{
            "type":"Point",
            "coordinates":[-122.375,37.61899948120117]}}
]};

// Grabbing our GeoJSON data.
L.geoJSON(sanFranAirport,{
    // turn each feature into a marker on the map
    onEachFeature: function(feature,layer) {
        console.log(layer);
        let layerStuff = layer.feature.properties;
        let layerText = "Airport Code " + layerStuff.faa + "<br> Airport Name" + layerStuff.name;
        layer.bindPopup(layerText);

    }
}).addTo(map);

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY,
});
// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);