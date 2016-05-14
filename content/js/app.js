$(document).ready(function() {

    $(".float-label").jvFloat();

    (function ($) {
        $.fn.CustomMap = function( options ) {

            var posLatitude = $('#map').data('position-latitude'),
            posLongitude = $('#map').data('position-longitude');

            var settings = $.extend({
                home: { latitude: posLatitude, longitude: posLongitude },
                text: '<div class="map-popup"><h5>Black Glass servis</h5>Novi Beograd<br />Ivana Markovića Irca 17<br />063/ 822-90-96<br />062/ 8-400-400<br />office@blackglass.rs</div>',
                icon_url: 'images/map-pin-vdb.png',
                zoom: 15
            }, options );

            var coords = new google.maps.LatLng(settings.home.latitude, settings.home.longitude);

            return this.each(function() {
                var element = $(this);

                var options = {
                    zoom: settings.zoom,
                    center: coords,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    mapTypeControl: false,
                    scaleControl: false,
                    streetViewControl: false,
                    panControl: true,
                    disableDefaultUI: true,
                    zoomControlOptions: {
                        style: google.maps.ZoomControlStyle.DEFAULT
                    },
                    scrollwheel: false,
                    overviewMapControl: true,
                };

                var map = new google.maps.Map(element[0], options);

                var icon = {
                    url: settings.icon_url,
                    origin: new google.maps.Point(0, 0)
                };

                var marker = new google.maps.Marker({
                    position: coords,
                    map: map,
                    icon: icon,
                    draggable: false
                });

                var info = new google.maps.InfoWindow({
                    content: settings.text
                });

                google.maps.event.addListener(marker, 'click', function() {
                    info.open(map, marker);
                });

                var styles = [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#2e230f"},{"lightness":17}]}];

                    map.setOptions({styles: styles});
                });

            };

            $('#map').CustomMap();

    }(jQuery));



});
