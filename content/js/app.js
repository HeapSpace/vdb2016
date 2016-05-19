$(document).ready(function() {

    var offset = 300;
    var shrinkoffset = 1;
  	var duration = 400;
  	$(window).scroll(function() {
    	if ($(this).scrollTop() > offset) {
    	   $('#scroll-to-top').fadeIn(duration);
    	} else {
    	   $('#scroll-to-top').fadeOut(duration);
    	}
      if ($(this).scrollTop() > shrinkoffset) {
         $('.main-menu-item').addClass('mm-item-pad');
    	} else {
         $('.main-menu-item').removeClass('mm-item-pad');
    	}
  	});

  	$('#scroll-to-top').click(function(event) {
    		event.preventDefault();
    	$('html, body').animate({scrollTop: 0}, 800);
    		return false;
  	});

    $(".float-label").jvFloat();

    $('.header-holder').affix({
      offset: {
        top: $('header').height() + 1
      }
    });

});
