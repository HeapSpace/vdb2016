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

    function fx() {
      return $(".speaker-img img").last().fadeToggle();
    };

    $(".speaker-holder").hover(fx, fx);

    $('#home-mainscreen-holder').css('height', $(window).height());

    $('.frame > img').each(function(){
      var $el = $(this),
        staticSrc = $el.attr('src'),
        gifSrc = $el.data('animated');
      $el.hover(
        function(){
          $(this).attr("src", gifSrc);
        },
        function(){
          $(this).attr("src", staticSrc);
        });
    });

});
