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
    });

    $('.tags-reset').on('click', function(){
      if (!$('.tagsort-active').length) {
        $('.tags-reset').hide();
      }
    });

});
