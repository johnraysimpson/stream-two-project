var autocomplete, map, places;
var markers = [];
var MARKER_PATH = 'https://developers.google.com/maps/documentation/javascript/images/marker_green';
var infoWindow;
var hostnameRegexp = new RegExp('^https?://.+?/');

// DEFINED FUNCTIONS
//Initialise the map
function initMap() {
    var startLoc = { lat: 46.619261, lng: -33.134766 };
    map = new google.maps.Map(
        document.getElementById('map'), {
            zoom: 2,
            center: startLoc,
            mapTypeControl: false,
            panControl: false
        });

    var defaultBounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(-90, -180),
        new google.maps.LatLng(90, 180));

    var input = document.getElementById('city');
    var options = {
        bounds: defaultBounds,
        types: ['(cities)']
    };

    infoWindow = new google.maps.InfoWindow({
        content: document.getElementById("info-content")
    });

    places = new google.maps.places.PlacesService(map);

    autocomplete = new google.maps.places.Autocomplete(input, options);

    autocomplete.addListener('place_changed', searchCity);
    
    //Function for autocompleting search field with cities, only executes if a city is selected
    
    function searchCity() {
        var place = autocomplete.getPlace();
        if (place.geometry) {
            map.panTo(place.geometry.location);
            map.setZoom(15);
            $("#buttons").slideDown('slow');
        }
        else {
            document.getElementById('city').placeholder = 'Enter a city';
        }
    }
}

//Function to search within an area (given a type) and results are shown with markers (given a color for the type of attraction)

function searchInArea(event) {
    $("button > div").removeClass("click");
    $(this).children("div").addClass("click");
    var search = {
        bounds: map.getBounds(),
        types: [event.data.type]
    };
    clearMarkers();
    places.nearbySearch(search, function(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                var markerIcon = `assets/images/icons8-map-pin-${event.data.color}.png`;
                markers[i] = new google.maps.Marker({
                    position: results[i].geometry.location,
                    animation: google.maps.Animation.DROP,
                    icon: markerIcon
                });
                markers[i].placeResult = results[i];
                google.maps.event.addListener(markers[i], 'click', showInfoWindow);
                setTimeout(dropMarker(i), i * 100);
            }
        }
    });
}

//Function for clearing markers if markers alreay exist

function clearMarkers() {
    for (var i = 0; i < markers.length; i++) {
        if (markers[i]) {
            markers[i].setMap(null);
        }
    }
    markers = [];
}

//Function for dropping markers on corresponding search results

function dropMarker(i) {
    return function() {
        markers[i].setMap(map);
    };
}

//Function for displaying the info windowwhen a marker is clicked

function showInfoWindow() {
    var marker = this;
    places.getDetails({ placeId: marker.placeResult.place_id },
        function(place, status) {
            if (status !== google.maps.places.PlacesServiceStatus.OK) {
                return;
            }
            infoWindow.open(map, marker);
            buildIWContent(place);
        });
}

//Function for the information gathered from the search result marker and formatted

function buildIWContent(place) {
    document.getElementById('iw-icon').innerHTML = '<img style="height: 24px;" ' +
        'src="' + place.icon + '"/>';
    document.getElementById('iw-url').innerHTML = '<b><a target="_blank" href="' + place.url +
        '">' + place.name + '</a></b>';
    document.getElementById('iw-address').textContent = place.vicinity;

    if (place.formatted_phone_number) {
        document.getElementById('iw-phone-row').style.display = '';
        document.getElementById('iw-phone').textContent =
            place.formatted_phone_number;
    }
    else {
        document.getElementById('iw-phone-row').style.display = 'none';
    }

    if (place.rating) {
        var ratingHtml = '';
        for (var i = 0; i < 5; i++) {
            if (place.rating < (i + 0.5)) {
                ratingHtml += '&#10025;';
            }
            else {
                ratingHtml += '&#10029;';
            }
            document.getElementById('iw-rating-row').style.display = '';
            document.getElementById('iw-rating').innerHTML = ratingHtml;
        }
    }
    else {
        document.getElementById('iw-rating-row').style.display = 'none';
    }

    if (place.website) {
        var fullUrl = place.website;
        var website = hostnameRegexp.exec(place.website);
        if (website === null) {
            website = 'http://' + fullUrl + '/';
            fullUrl = website;
        }
        document.getElementById('iw-website-row').style.display = '';
        document.getElementById('iw-website').innerHTML = '<b><a target="_blank" href="' + website + '">' + website + '</a></b>';
    }
    else {
        document.getElementById('iw-website-row').style.display = 'none';
    }
}

//CALLED FUNCTIONS
//search hotels in map
$("#search-hotels").click({type: 'lodging', color: 'green'}, searchInArea);
//search attractions in map
$("#search-museum").click({type: 'museum', color: 'red'}, searchInArea);
$("#search-zoo").click({type: 'zoo', color: 'red'}, searchInArea);
$("#search-shopping").click({type: 'shopping_mall', color: 'red'}, searchInArea);
//search food and drink in map
$("#search-restaurant").click({type: 'restaurant', color: 'blue'}, searchInArea);
$("#search-bar").click({type: 'bar', color: 'blue'}, searchInArea);
$("#search-cafe").click({type: 'cafe', color: 'blue'}, searchInArea);