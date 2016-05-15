include Nanoc::Helpers::LinkTo

def map_on_page(target)
  # Find path
  path = target.is_a?(String) ? target : target.path

  if @item_rep && '.'+@item_rep.path == path
    # Create message

    "<script>
    var map;
    function customMap() {
      var posLatitude = 44.809871;
      var posLongitude = 20.413875;
      var coords = new google.maps.LatLng(posLatitude, posLongitude);
      var options = {
        center: coords,
        home: coords,
        text: '<div class=\"map-popup\"><h5>Black Glass servis</h5>Novi Beograd<br />Ivana Markovića Irca 17<br />063/ 822-90-96<br />062/ 8-400-400<br />office@blackglass.rs</div>',
        icon_url: 'images/map-pin-vdb.png',
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: true,
        panControl: true,
        disableDefaultUI: false,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.DEFAULT
        },
        scrollwheel: false,
        overviewMapControl: false
      }
      map = new google.maps.Map(document.getElementById('map'), options);

      var icon = {
          url: options.icon_url,
          origin: new google.maps.Point(0, 0)
      };

      var marker = new google.maps.Marker({
          position: coords,
          map: map,
          icon: icon,
          draggable: false
      });

      // var info = new google.maps.InfoWindow({
      //     content: options.text
      // });
      //
      // google.maps.event.addListener(marker, 'click', function() {
      //     info.open(map, marker);
      // });


      var styles = [{'featureType':'all','elementType':'labels.text.fill','stylers':[{'saturation':36},{'color':'#000000'},{'lightness':40}]},{'featureType':'all','elementType':'labels.text.stroke','stylers':[{'visibility':'on'},{'color':'#000000'},{'lightness':16}]},{'featureType':'all','elementType':'labels.icon','stylers':[{'visibility':'off'}]},{'featureType':'administrative','elementType':'geometry.fill','stylers':[{'color':'#000000'},{'lightness':20}]},{'featureType':'administrative','elementType':'geometry.stroke','stylers':[{'color':'#000000'},{'lightness':17},{'weight':1.2}]},{'featureType':'landscape','elementType':'geometry','stylers':[{'color':'#000000'},{'lightness':20}]},{'featureType':'poi','elementType':'geometry','stylers':[{'color':'#000000'},{'lightness':21}]},{'featureType':'road.highway','elementType':'geometry.fill','stylers':[{'color':'#000000'},{'lightness':17}]},{'featureType':'road.highway','elementType':'geometry.stroke','stylers':[{'color':'#000000'},{'lightness':29},{'weight':0.2}]},{'featureType':'road.arterial','elementType':'geometry','stylers':[{'color':'#000000'},{'lightness':18}]},{'featureType':'road.local','elementType':'geometry','stylers':[{'color':'#000000'},{'lightness':16}]},{'featureType':'transit','elementType':'geometry','stylers':[{'color':'#000000'},{'lightness':19}]},{'featureType':'water','elementType':'geometry','stylers':[{'color':'#2e230f'},{'lightness':17}]}];

      map.setOptions({styles: styles});
    }
    </script>
    <script src=\"https://maps.googleapis.com/maps/api/js?key=AIzaSyA3JQOqnA29_8q982bNgzDPPX3gsVqK5oY&callback=customMap\"></script>"

  end
end
