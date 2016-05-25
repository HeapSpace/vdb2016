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

    $('#home-main-text').css('padding-top', $(window).height()/2.8);

    // init controller
    var controller = new ScrollMagic.Controller();

    var $sclockminutes = $('#s-clock-minutes');
    var $sclockhours = $('#s-clock-hours');

		// build tween
    TweenMax.to($sclockminutes, 0.1, {rotation: 180,  ease:Linear.easeNone, transformOrigin: "center bottom"});
    TweenMax.to($sclockhours, 0.1, {rotation: 255, ease:Linear.easeNone, transformOrigin: "center bottom"});
		var tweenminutes = TweenMax.to($sclockminutes, 0.1, {rotation: 180*25,  ease:Linear.easeNone, transformOrigin: "center bottom"});
    var tweenhours = TweenMax.to($sclockhours, 0.1, {rotation: 360+255, ease:Linear.easeNone, transformOrigin: "center bottom"});

    new ScrollMagic.Scene({triggerElement: "#schedule-list",duration: 4800})
      .setTween(tweenminutes)
      .addTo(controller);

    new ScrollMagic.Scene({triggerElement: "#schedule-list",duration: 4800})
      .setTween(tweenhours)
      .addTo(controller);

		// build scene
		new ScrollMagic.Scene({triggerElement: "#schedule-list", duration: 4800})
			//.setTween(tween)
			.setPin('#s-clock')
			.addTo(controller);


});
