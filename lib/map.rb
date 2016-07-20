include Nanoc::Helpers::LinkTo

def map_on_page(target, elid, lat, lon, pin)
  # Find path
  path = target.is_a?(String) ? target : target.path

  if @item_rep && @item_rep.path == path
    # Create message

    "<script>
    var map"+elid+";

      var posLatitude = "+lat+";
      var posLongitude = "+lon+";
      var coords"+elid+" = new google.maps.LatLng(posLatitude, posLongitude);
      var options"+elid+" = {
        center: coords"+elid+",
        home: coords"+elid+",
        text: '<div class=\"map-popup\">VDB16</div>',
        icon_url: '/images/"+pin+"',
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
      map"+elid+" = new google.maps.Map(document.getElementById('"+elid+"'), options"+elid+");

      var icon"+elid+" = {
          url: options"+elid+".icon_url,
          origin: new google.maps.Point(0, 0)
      };

      var marker"+elid+" = new google.maps.Marker({
          position: coords"+elid+",
          map: map"+elid+",
          icon: icon"+elid+",
          draggable: false
      });

      var styles"+elid+" = [{'featureType':'all','elementType':'labels.text.fill','stylers':[{'saturation':36},{'color':'#000000'},{'lightness':40}]},{'featureType':'all','elementType':'labels.text.stroke','stylers':[{'visibility':'on'},{'color':'#000000'},{'lightness':16}]},{'featureType':'all','elementType':'labels.icon','stylers':[{'visibility':'off'}]},{'featureType':'administrative','elementType':'geometry.fill','stylers':[{'color':'#000000'},{'lightness':20}]},{'featureType':'administrative','elementType':'geometry.stroke','stylers':[{'color':'#000000'},{'lightness':17},{'weight':1.2}]},{'featureType':'landscape','elementType':'geometry','stylers':[{'color':'#000000'},{'lightness':20}]},{'featureType':'poi','elementType':'geometry','stylers':[{'color':'#000000'},{'lightness':21}]},{'featureType':'road.highway','elementType':'geometry.fill','stylers':[{'color':'#000000'},{'lightness':17}]},{'featureType':'road.highway','elementType':'geometry.stroke','stylers':[{'color':'#000000'},{'lightness':29},{'weight':0.2}]},{'featureType':'road.arterial','elementType':'geometry','stylers':[{'color':'#000000'},{'lightness':18}]},{'featureType':'road.local','elementType':'geometry','stylers':[{'color':'#000000'},{'lightness':16}]},{'featureType':'transit','elementType':'geometry','stylers':[{'color':'#000000'},{'lightness':19}]},{'featureType':'water','elementType':'geometry','stylers':[{'color':'#2e230f'},{'lightness':17}]}];

      map"+elid+".setOptions({styles: styles"+elid+"});

    </script>"

  end
end
