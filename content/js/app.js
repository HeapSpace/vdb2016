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
         $('.menu_item, .item_link').addClass('mm-item-pad');
    	} else {
         $('.menu_item, .item_link').removeClass('mm-item-pad');
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

    var fx = function fx() {
      return $(".speaker-img img:last", this).fadeToggle();
    };

    $(".speaker-holder").hover(fx, fx);

    $('#home-main-text').css('padding-top', $(window).height()/2)

});
