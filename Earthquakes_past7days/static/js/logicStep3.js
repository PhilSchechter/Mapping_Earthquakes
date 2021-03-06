
// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY,
});

// We create the dark view tile layer that will be an option for our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
  "Street View": streets,
  "Satelite View": satelliteStreets
};

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
  center: [39.5, -98.5],
  zoom: 3,
  layers: streets
});

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);


let earthquakeData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
//let torontoHoods = "https://raw.githubusercontent.com/PhilSchechter/Mapping_Earthquakes/Mapping_GeoJSON_Polygons/torontoNeighborhoods.json"
// Create a style for the lines.
let myStyle = {
  color: "blue",
  weight: 1,
  fillColor: "yellow"
}

// Grabbing our GeoJSON data.
d3.json(earthquakeData).then(function(data) {
  function styleInfo(feature){
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: getColor(feature.properties.mag),
      color: "#000000",
      radius: getRadius(feature.properties.mag),
      stroke: true,
      weight: 0.5
    };
  }
// This function determines the color of the circle based on the magnitude of the earthquake.
function getColor(magnitude) {
    if (magnitude > 5) {
      return "#ea2c2c";
    }
    if (magnitude > 4) {
      return "#ea822c";
    }
    if (magnitude > 3) {
      return "#ee9c00";
    }
    if (magnitude > 2) {
      return "#eecc00";
    }
    if (magnitude > 1) {
      return "#d4ee00";
    }
    return "#98ee00";
  }

function getRadius(magnitude){
  if (magnitude === 0) {
    return 1;
  }
  return magnitude * 4;
}
//   console.log(data);
//  L.geoJson(data, {
//   style: myStyle,
//    onEachFeature: function(Feature, layer){
//     console.log(layer);
//    layer.bindPopup("<h2>Neighborhood: "+ Feature.properties.AREA_NAME + "</h2><hr><h3>" +Feature.properties.AREA_S_CD +"</h3>" );
//   }}).addTo(map);
L.geoJSON(data, {
//turn each feature into a circleMarker on the map
  pointToLayer: function(feature,latlng){
    console.log(data);
    return L.circleMarker(latlng);

  },
  style: styleInfo
}).addTo(map);
});