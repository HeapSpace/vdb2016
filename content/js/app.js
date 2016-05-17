$(document).ready(function() {

    var offset = 500;
  	var duration = 500;
  	$(window).scroll(function() {
    	if ($(this).scrollTop() > offset) {
    	   $('#scroll-to-top').fadeIn(duration);
    	} else {
    	   $('#scroll-to-top').fadeOut(duration);
    	}
  	});

  	$('#scroll-to-top').click(function(event) {
    		event.preventDefault();
    	$('html, body').animate({scrollTop: 0}, 1200);
    		return false;
  	});

    

    $(".float-label").jvFloat();

    $('.header-holder').affix({
      offset: {
        top: $('header').height() + 1
      }
    });

});
