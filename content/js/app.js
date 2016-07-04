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
			sortType: 'inclusive'
		});

    $('.tagsort-tags-container > span:empty').remove();

});
