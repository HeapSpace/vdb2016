$(document).ready(function() {

    $(".float-label").jvFloat();

    $("a").attr("href", function(i, href) {
      return '/new-site' + href;
    });

    $('.header-holder').affix({
      offset: {
        top: $('header').height() + 1
      }
    });

});
