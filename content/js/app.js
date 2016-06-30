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

    new ScrollMagic.Scene({triggerElement: "#schedule-list",duration: 4320})
      .setTween(tweenminutes)
      .addTo(controller);

    new ScrollMagic.Scene({triggerElement: "#schedule-list",duration: 4320})
      .setTween(tweenhours)
      .addTo(controller);

		// build scene
		new ScrollMagic.Scene({triggerElement: "#schedule-list", duration: 4320})
			//.setTween(tween)
			.setPin('#s-clock')
			.addTo(controller);



    $(".speaker-img img").each(function(){
      var $el = $(this),
        staticSrc = $el.attr('src'),
        hoverSrc = $el.data('hover');
      $el.hover(
        function(){
          $el.attr("src", hoverSrc);
        },
        function(){
          $el.attr("src", staticSrc);
        });
    });


    $('#home-mainscreen-holder').css('height', $(window).height());

    $('.frame > img').each(function(){
      var $el = $(this),
        staticSrc = $el.attr('src'),
        gifSrc = $el.data('animated');
      $el.hover(
        function(){
          $el.attr("src", gifSrc);
        },
        function(){
          $el.attr("src", staticSrc);
        });
    });


});
