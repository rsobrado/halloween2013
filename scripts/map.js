var rendererOptions = {
  draggable: true
};
var directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);;
var directionsService = new google.maps.DirectionsService();
var map;

var australia = new google.maps.LatLng(-25.274398, 133.775136);

function initialize() {

navigator.geolocation.getCurrentPosition(function(position) {

  var you = new google.maps.LatLng(position.coords.latitude, 
                                   position.coords.longitude);
    var mapOptions = {
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      center: you,
      zoom:3
    };
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    directionsDisplay.setMap(map);

    google.maps.event.addListener(directionsDisplay, 'directions_changed', function() {
      computeTotalDistance(directionsDisplay.directions);
    });

    calcRoute(you);
  });
}

function calcRoute(you) {
  var request = {
    origin: you,
    destination: new google.maps.LatLng('9.388097','-83.641877'),
    travelMode: google.maps.DirectionsTravelMode.DRIVING
  };
  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
      map.setZoom(3);
    }
  });
}

function computeTotalDistance(result) {
  var total = 0;
  var myroute = result.routes[0];
  for (var i = 0; i < myroute.legs.length; i++) {
    total += myroute.legs[i].distance.value;
  }
  total = total / 1000.
  document.getElementById('total').innerHTML = total + ' km';
}

google.maps.event.addDomListener(window, 'load', initialize);