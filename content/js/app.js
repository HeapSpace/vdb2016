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

    // init controller
    var controller = new ScrollMagic.Controller();

    var $sclockminutes = $('#s-clock-minutes');
    var $sclockhours = $('#s-clock-hours');

		// build tween
		var tweenminutes = TweenMax.to($sclockminutes, 0.5, {rotation: 360*12, ease: Linear.easeNone, transformOrigin: "center bottom"});
    var tweenhours = TweenMax.to($sclockhours, 0.5, {rotation: 360, ease: Linear.easeNone, transformOrigin: "center bottom"});

    new ScrollMagic.Scene({duration: 2400})
      .setTween(tweenminutes)
      .addTo(controller);

    new ScrollMagic.Scene({duration: 2400})
      .setTween(tweenhours)
      .addTo(controller);

		// build scene
		new ScrollMagic.Scene({duration: 2400})
			//.setTween(tween)
			.setPin('#s-clock')
			.addTo(controller);


});
