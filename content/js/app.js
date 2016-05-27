$(document).ready(function() {

    var offset = 300;
    var shrinkoffset = 0;
  	var duration = 400;
  	$(window).scroll(function() {
    	if ($(this).scrollTop() > offset) {
    	   $('#scroll-to-top').fadeIn(duration);
    	} else {
    	   $('#scroll-to-top').fadeOut(duration);
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

    var cnt = 0

    function fxin() {
      cnt += 1;
      return $(".speaker-img img").last().fadeToggle();
    };

    function fxout() {
      if (cnt == 5) {
        cnt = 0;
        return $(".speaker-img img")
          .last()
          .fadeToggle()
          .css({ transformOrigin: 'center center' })
          .transition({ rotate: '+=360deg', duration: 500 });
      } else {
        return $(".speaker-img img").last().fadeToggle();
      }
    };

    $(".speaker-holder").hover(fxin, fxout);

    $('#home-main-text').css('padding-top', $(window).height()/2)

});
