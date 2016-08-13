$(document).ready(function() {

    var winwidth = $(window).width();

    if (winwidth > 1200) {
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
    }

    $(".float-label").jvFloat();

    $('.header-holder').affix({
      offset: {
        top: $('header').height() + 1
      }
    });

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

    // $('#home-main-text').css('padding-top', $(window).height()/2.8);
    $('[data-toggle="popover"]').popover();

    $("#talk-desc").showMore({
      minheight: 78, // measured in px
      buttontxtmore: 'show more',
      buttontxtless: 'show less',
      animationspeed: 250
    });

    // init controller
    var controller = new ScrollMagic.Controller();

    var $sclockminutes = $('.s-clock-minutes');
    var $sclockhours = $('.s-clock-hours');

    TweenMax.to($sclockminutes, 0.1, {rotation: 0,  ease:Linear.easeNone, transformOrigin: "center bottom"});
    TweenMax.to($sclockhours, 0.1, {rotation: 270, ease:Linear.easeNone, transformOrigin: "center bottom"});
    var tweenminutes = TweenMax.to($sclockminutes, 0.1, {rotation: 360*10,  ease:Linear.easeNone, transformOrigin: "center bottom"});
    var tweenhours = TweenMax.to($sclockhours, 0.1, {rotation: 300+270, ease:Linear.easeNone, transformOrigin: "center bottom"});
    var addflip = function(){
      $('.cepelin').addClass('flip');
    }
    var removeflip = function(){
      $('.cepelin').removeClass('flip');
    }
    var cepelinmove = TweenMax.to(".cepelin", 10, {left: winwidth, ease:Linear.easeNone, onStart: removeflip, onComplete: addflip});

    if (winwidth > 1200) {

      var clockMinutes = new ScrollMagic.Scene({triggerElement: ".schedule-list",duration: 3600})
      .setTween(tweenminutes)
      .addTo(controller);

      var clockHours = new ScrollMagic.Scene({triggerElement: ".schedule-list",duration: 3600})
      .setTween(tweenhours)
      .addTo(controller);

      var clockPin = new ScrollMagic.Scene({triggerElement: ".schedule-list", duration: 3600})
      .setPin('.s-clock')
      .addTo(controller);

      var cepelinTween = new ScrollMagic.Scene({triggerElement: "#cepelin-trigger"})
      .setTween(cepelinmove)
      .addTo(controller);

    } else {
      $(".schedule-item").each(function() {
        $(this).attr('style', 'padding-bottom: 15px;');
      })
    }

    $(window).bind('load', function () {
      var highlightTalk = $(location).attr('hash').slice(1);
      if (highlightTalk) {
        $("."+highlightTalk+"").addClass('highlighted');
          $('html, body').animate({
           scrollTop: $("."+highlightTalk+"").offset().top - ($(window).height()/2-10)
         }, $(window).height()/2, function () {});
      }
    });

    $('#home-mainscreen-holder').css('height', $(window).height());

    $('div.tagsort-tags-container').tagSort({
		  items: '.speaker-tags',
		  tagElement: 'span',
		  itemTagsSeperator: ' ',
		  fadeTime: 0,
			sortType: 'inclusive',
      reset: '.tags-reset'
		});

    $('.tagsort-tags-container > span:empty').remove();

    $("[data-doughnut]").each(function(){
      var $this = $(this),
          start = 0,
          offset = 0,
          total = 0,
          n = 0;


      $this.find("> div").each(function(){
        var item = $(this);
        var value = item.data("doughnut-value") * 1;
        item.append('<div class="before"></div>');

        if(value > 50){
          item.addClass("big");
        }

        total += value;
        n++;
      }).each(function(index, el){
        var item = $(this);
        var value = Math.round(item.data("doughnut-value") * 3.6); //because the value is percent

        if(total >= 99.9 && n == index + 1){
          value = 360 - start;
        }

        item.css({
          '-webkit-transform': 'rotate(' + (start+offset) + 'deg)',
          '-moz-transform': 'rotate(' + (start+offset) + 'deg)',
          '-o-transform': 'rotate(' + (start+offset) + 'deg)',
          'transform': 'rotate(' + (start+offset) + 'deg)'
        });

        item.find('.before').css({
          '-webkit-transform': 'rotate(' + (value+1) + 'deg)',
          '-moz-transform': 'rotate(' + (value+1) + 'deg)',
          '-o-transform': 'rotate(' + (value+1) + 'deg)',
          'transform': 'rotate(' + (value+1) + 'deg)'
        });

        start += value;
      });
    });

    $('.tags-reset').hide();

    $('.tagsort-tags-container > span').on('click', function(){
        $('.tags-reset').show();
        if (!$('.tagsort-active').length) {
          $('.tags-reset').hide();
        }
    });

    $('.tags-reset').on('click', function(){
      if (!$('.tagsort-active').length) {
        $('.tags-reset').hide();
      }
    });


    $("#flatmenu").menumaker({
        title: "Menu",
        breakpoint: 768,
        format: "multitoggle"
    });

    $("#flatmenu").prepend("<div id='menu-line'></div>");

    var foundActive = false, activeElement, linePosition = 0, menuLine = $("#flatmenu #menu-line"), lineWidth, defaultPosition, defaultWidth;

    $("#flatmenu > ul > li").each(function() {
        if ($(this).hasClass('active')) {
            activeElement = $(this);
            foundActive = true;
        }
    });

    if (foundActive === false) {
        activeElement = $("#flatmenu > ul > li").first();
    }

    defaultWidth = lineWidth = activeElement.width();

    defaultPosition = linePosition = activeElement.position().left;

    menuLine.css("width", lineWidth);
    menuLine.css("left", linePosition);

    $("#flatmenu > ul > li").hover(function() {
        activeElement = $(this);
        lineWidth = activeElement.width();
        linePosition = activeElement.position().left;
        menuLine.css("width", lineWidth);
        menuLine.css("left", linePosition);
    }, function() {
        menuLine.css("left", defaultPosition);
        menuLine.css("width", defaultWidth);
    });

    $('.navbar-toggle').on('click', function(){
        $('#navmenu').css('display', 'block');
    });

});
