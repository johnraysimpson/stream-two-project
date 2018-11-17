function initMap() {
    // The location of Uluru
    var startLoc = { lat: 46.619261, lng: -33.134766 };
    // The map, centered at Uluru
    var map = new google.maps.Map(
        document.getElementById('map'), { zoom: 2, center: startLoc });

    var defaultBounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(-90, -180),
        new google.maps.LatLng(90, 180));

    var input = document.getElementById('city');
    var options = {
        bounds: defaultBounds,
        types: ['(cities)']
    };
}
