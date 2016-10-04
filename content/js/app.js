$(document).ready(function() {

    var winwidth = $(window).width();

    if (winwidth > 1200) {
      var offset = 300;
      var shrinkoffset = 0;
    	var duration = 500;
      var duration2 = 1500;
    	$(window).scroll(function() {
      	if ($(this).scrollTop() > offset) {
      	   $('#scroll-to-top').fadeIn(duration);
           $('.flatmenu').addClass('flatmenu-dark');
      	} else {
      	   $('#scroll-to-top').fadeOut(duration);
           $('.flatmenu').removeClass('flatmenu-dark');
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

    if ($("body").data('schedule')) {
      // init controller
      var controller = new ScrollMagic.Controller();

      var $sclockminutes = $('.s-clock-minutes');
      var $sclockhours = $('.s-clock-hours');

      function backToTop() {
        $('html, body').animate({scrollTop: 0}, 1);
      }

      var starttime = 9; // starting hour from 24h format
      var totalduration = 10; // total duration in hours
      var hourheight = 360; // hour height in pixels

      $('.schedule-list').css('height', hourheight*totalduration);

      var fiveminangle = 30;
      TweenMax.to($sclockminutes, 0.1, {rotation: 0,  ease:Linear.easeNone, transformOrigin: "center bottom"});
      TweenMax.to($sclockhours, 0.1, {rotation: starttime*fiveminangle, ease:Linear.easeNone, transformOrigin: "center bottom"});
      var tweenminutes = TweenMax.to($sclockminutes, 0.1, {rotation: hourheight*totalduration,  ease:Linear.easeNone, transformOrigin: "center bottom"});
      var tweenhours = TweenMax.to($sclockhours, 0.1, {rotation: 300+(starttime*fiveminangle), ease:Linear.easeNone, transformOrigin: "center bottom"});

      if (winwidth > 1200) {

        var clockMinutes = new ScrollMagic.Scene({triggerElement: ".schedule-list",duration: hourheight*totalduration})
        .setTween(tweenminutes)
        .addTo(controller);

        var clockHours = new ScrollMagic.Scene({triggerElement: ".schedule-list",duration: hourheight*totalduration})
        .setTween(tweenhours)
        .addTo(controller);

        var clockPin = new ScrollMagic.Scene({triggerElement: ".schedule-list", duration: hourheight*totalduration})
        .setPin('.s-clock')
        .addTo(controller);

        var trackPin1 = new ScrollMagic.Scene({triggerElement: ".schedule-list", duration: hourheight*totalduration, triggerHook: 'onLeave', offset: -104})
        .setPin('.track1')
        .setClassToggle(".schedule-navbar", "bodybg")
        .addTo(controller);

        var trackPin2 = new ScrollMagic.Scene({triggerElement: ".schedule-list", duration: hourheight*totalduration, triggerHook: 'onLeave', offset: -104})
        .setPin('.track2')
        .setClassToggle(".track-name", "more-z")
        .addTo(controller);

        var trackPin3 = new ScrollMagic.Scene({triggerElement: ".schedule-list", duration: hourheight*totalduration, triggerHook: 'onLeave', offset: -104})
        .setPin('.track3')
        .setClassToggle(".flatmenu", "flatmenu-tall")
        .addTo(controller);

        var trackPin4 = new ScrollMagic.Scene({triggerElement: ".schedule-list", duration: hourheight*totalduration, triggerHook: 'onLeave', offset: -104})
        .setPin('.track4')
        .setClassToggle(".day", "inline")
        .addTo(controller);

        var trackPin5 = new ScrollMagic.Scene({triggerElement: ".schedule-list", duration: hourheight*totalduration, triggerHook: 'onLeave', offset: -104})
        .setPin('.track5')
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
        var slotheight = $(window).height()*Number(highlightTalk.slice(-1))
        if (highlightTalk) {
          if ($(window).scrollTop() < $(window).height()/2-10) {
            $("."+highlightTalk+"").addClass('highlighted');
            $('html, body').animate({
             scrollTop: $("."+highlightTalk+"").offset().top - ($(window).height()/2-10)
            }, slotheight/2);
          } else {
            $('html, body').animate({scrollTop: 0}, 1, function(){
              TweenMax.to($sclockminutes, 0.1, {rotation: 0,  ease:Linear.easeNone, transformOrigin: "center bottom"});
              TweenMax.to($sclockhours, 0.1, {rotation: starttime*fiveminangle, ease:Linear.easeNone, transformOrigin: "center bottom", onComplete: scrollToTalk});
              function scrollToTalk() {
                $("."+highlightTalk+"").addClass('highlighted');
                  $('html, body').animate({
                   scrollTop: $("."+highlightTalk+"").offset().top - ($(window).height()/2-10)
                 }, slotheight/2);
               }
            });
          }
        } else {
          if ($(window).scrollTop() > $(window).height()/2-10) {
            $('html, body').animate({scrollTop: 0}, 1);
            TweenMax.to($sclockminutes, 0.1, {rotation: 0,  ease:Linear.easeNone, transformOrigin: "center bottom"});
            TweenMax.to($sclockhours, 0.1, {rotation: starttime*fiveminangle, ease:Linear.easeNone, transformOrigin: "center bottom"});
          }
        }
      });
    }

    if ($("body").data('cepelin')) {
      var controller2 = new ScrollMagic.Controller();
      var addflip = function(){
        $('.cepelin').addClass('flip');
      }
      var removeflip = function(){
        $('.cepelin').removeClass('flip');
      }
      var cepelinmove = TweenMax.to(".cepelin", 10, {left: winwidth, ease:Linear.easeNone, onStart: removeflip, onComplete: addflip});
      if (winwidth > 1200) {
        var cepelinTween = new ScrollMagic.Scene({triggerElement: "#cepelin-trigger"})
        .setTween(cepelinmove)
        .addTo(controller2);
      }
    }

    if (winwidth > 1200) {
      $('#home-mainscreen-holder').css('height', $(window).height());
    }

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

    $('#tweetslider').slick({
      initialSlide: 3,
      slidesToShow: 1,
      autoplay: true,
      autoplaySpeed: 7500,
      nextArrow: '<button type="button" class="btn btn-primary btn-lg blue">Next</button>',
      prevArrow: '<button type="button" class="btn btn-primary btn-lg blue">Previous</button>',
      appendArrows: $('#slidernav'),
      adaptiveHeight: true,
      infinite: true,
      pauseOnHover: false,
      pauseOnFocus: false,
      respondTo: 'slider'
    });

    $('.navbar-toggle').on('click', function(){
        $('#navmenu').css('display', 'block');
    });

});
