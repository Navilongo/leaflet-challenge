// Creating map object
var myMap = L.map("map", {
    center: [34.0522, -118.2437],
    zoom: 5
});
  
// Adding tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

var earthquake_url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

d3.json(earthquake_url).then(function(data) {
  geojson = L.geoJson(data, {
    style: function(feature) {
      return {
        color: "white",
        fillColor: chooseColor(feature.geometry.coordinates[2]),
        fillOpacity: 0.9,
        weight: 1.2,
        radius: makeRadius(feature.properties.mag)
      };
    },
    OneachFeature: function(feature, layer) {
      layer.bindPopup("Mag" + feature.properties.mag + "Place: " + feature.properties.place)
    },
    pointToLayer: function(geoJsonPoint, latlng) {
      return L.circleMarker(latlng);
    }
  }).addTo(MyMap);

})