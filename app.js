
const endpoint = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson"
let result = [];

$.ajax({
  // Define the kind of request as 'GET'
  method: 'GET',  
  // The URL for the request
  url: endpoint,   
  // Code to run if the request succeeds 
  success: onSuccess
});

// defining the callback function that will happen if the request succeeds.
var markers = [];
function onSuccess(responseData) {
  for(let i = 0; i < responseData.features.length; i++){
    markers.push({"lat": responseData.features[i].geometry.coordinates[1], "lng": responseData.features[i].geometry.coordinates[0]});
  };
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 2,
    center: new google.maps.LatLng(2.8,-187.3),
    mapTypeId: 'terrain'
  });
  for (let i = 0; i < 3; i++) {
    let marker = new google.maps.Marker({
      position: markers[i],
      map: map      
    });
  }
};

// function initMap() {
//   map = new google.maps.Map(document.getElementById('map'), {
//     zoom: 2,
//     center: new google.maps.LatLng(2.8,-187.3),
//     mapTypeId: 'terrain'
//   });

//   for (let i = 0; i < 3; i++) {
//     let marker = new google.maps.Marker({
//       position: markers[i],
//       // position: {"lat": responseData.features[i].geometry.coordinates[1], "lng": responseData.features[i].geometry.coordinates[0]},
//       map: map      
//     });
//     // map.data.setStyle(function(feature) {
//     //   // var magnitude = feature.getProperty('mag');
//     //   return {
//     //     icon: getCircle(responseData.features[i].properties.mag);
//     //   };
//     // });
//   }
// }

function getCircle(magnitude) {
  return {
    path: google.maps.SymbolPath.CIRCLE,
    fillColor: 'red',
    fillOpacity: .2,
    scale: Math.pow(2, magnitude) / 2,
    strokeColor: 'white',
    strokeWeight: .5
  };
}

// initMap();

