var canvasOverlay;
var overlayContext;


// images
var images = [new Image(), new Image()];
var imageNdx = 0;
var imageDim = [[907, 909, 50], [500, 776, 50]];

images[0].setAttribute('crossOrigin', 'anonymous');
images[0].src = "i/face1.png";
images[1].setAttribute('crossOrigin', 'anonymous');
images[1].src = "i/face2.png";

var props = images[0];
var xoff = 400;
var yoff = 200;

var videoHeight;
var videoWidth;

function selectNextImage() {
	imageNdx = imageNdx + 1;
	if (imageNdx >= images.length) {
		imageNdx = 0;
	}

	props = images[imageNdx];

	var w = imageWidth();
	var h = imageHeight();

	xoff = 400 - (w / 2);
	yoff = 200 - (h / 2);
	drawProps();
}

function imageWidth() {
	var p = imageDim[imageNdx][2];
	return imageDim[imageNdx][0] * p / 100;
}
function imageHeight() {
	var p = imageDim[imageNdx][2];
	return imageDim[imageNdx][1] * p / 100;
}

function drawProps() {
	if (overlayContext == undefined) {
		return;
	}

	overlayContext.clearRect(0,0,800,600);

	var w = imageWidth();
	var h = imageHeight();

	overlayContext.drawImage(props, xoff, yoff, w, h);

	overlayContext.font = "20px Arial";
	overlayContext.fillStyle = "white";
	overlayContext.textAlign = "left";
	overlayContext.fillText("VoxxedDays Belgrade 2016", 6, 26);
};

OAuth.initialize("PMvLi-bPCgrZFYNsp_FVmEPGP9c");

function postCanvasToURL() {
	  var snap = document.getElementById('flatten');

	  var img = snap.toDataURL();
	  var file = dataURItoBlob(img);
	  var tweetText = $('#tweetText').text();

	  OAuth.popup("twitter").then(function(result) {
	      var data = new FormData();
	      data.append('status', tweetText + "  @VoxxedBelgrade #vdb16");
	      // data.append('text', '#elfie http://devteaminc.co/');
	      data.append('media[]', file, 'vdb.png');

	      return result.post('/1.1/statuses/update_with_media.json', {
	          data: data,
	          cache:false,
	          processData: false,
	          contentType: false
	      });
	  }).done(function(data){
	      var str = JSON.stringify(data, null, 2);
	      $('#result').html("Success\n" + str).show()
	  }).fail(function(e){
	      var errorTxt = JSON.stringify(e, null, 2)
	      $('#result').html("Error\n" + errorTxt).show()
	      console.log(e);
	  });
}

function dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);
    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], {type:mimeString});
}

$('#snap').click(function(){
	var snap = document.getElementById('flatten');
	var ctx3 = snap.getContext('2d');

	$('.wrapper').removeClass('clicked');
	$('#tweet-wrapper').hide();
	$('#flatten').hide();
	$('.wrapper').addClass('clicked');

	setTimeout(function() {
		//Webcam.snap(function() {}, snap);
		Webcam.snap(function(data_uri, canvas, context) {
        	ctx3.drawImage(canvas, 0, 0, ww, hh);
    	});

		ctx3.drawImage(canvasOverlay, 0, 0);

		$('#flatten').show();
		$('#tweet-wrapper').show();
	}, 3000);
})

$('#tweet').click(function(){
	postCanvasToURL();
})

var delta = 10;
$('#up').click(function(){
	yoff = yoff - delta;
	drawProps();
});
$('#down').click(function(){
	yoff = yoff + delta;
	drawProps();
});
$('#left').click(function(){
	xoff = xoff - delta;
	drawProps();
});
$('#right').click(function(){
	xoff = xoff + delta;
	drawProps();
});
$('#next').click(function(){
	selectNextImage();
});
$('#plus').click(function(){
	var w = imageWidth();
	var h = imageHeight();

	imageDim[imageNdx][2] += 5;

	var w2 = imageWidth();
	var h2 = imageHeight();

	xoff = xoff + (w-w2)/2;
	yoff = yoff + (h-h2)/2;

	drawProps();
});
$('#minus').click(function(){
	var w = imageWidth();
	var h = imageHeight();

	imageDim[imageNdx][2] -= 5;

	var w2 = imageWidth();
	var h2 = imageHeight();

	xoff = xoff + (w-w2)/2;
	yoff = yoff + (h-h2)/2;

	drawProps();
});

Webcam.set({
	width: 800,
	height: 600,
	dest_width: 800,
    dest_height: 600,
});

Webcam.attach('#mycam');

var ww = 800;
var hh = 600;

Webcam.on( 'live', function() {
	var vid = $("#mycam video").get()[0];
	videoHeight = vid.videoHeight;
	videoWidth = vid.videoWidth;

	ww = 800;
	hh = 600;

	if (videoWidth > ww) {
		hh = videoHeight * ww / videoWidth;
	}

	var canvas = document.createElement("canvas");
    canvas.id = 'overlay';
    canvas.width = ww;
    canvas.height = hh;
//    canvas.style.border = '2px solid red';

    var parentDiv = document.getElementById("mycam");
    parentDiv.appendChild(canvas);

    var canvas2 = document.createElement("canvas");
    canvas2.id = 'flatten';
    canvas2.width = ww;
    canvas2.height = hh;
    canvas2.style.display = `none`;

    parentDiv.appendChild(canvas2);

    canvasOverlay = canvas;
    overlayContext = canvasOverlay.getContext('2d');

    selectNextImage();

});

if (window.location.hostname != "localhost") {
	if (window.location.protocol != "https:") {
	    window.location.href = "https:" + window.location.href.substring(window.location.protocol.length);
	}
}
