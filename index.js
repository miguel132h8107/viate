
// BEGIN One Page
var $doc = $(document),
    $sections = $('.section'),
    $menu = $('.main-nav a'),
    $body = $('html,body');

var topToIndex = function(scrollTop) {
  var offsetTop = 0,
      indexlastSection;
  $sections.each(function(i){
    offsetTop = $(this).offset().top;
    if ( scrollTop > offsetTop - 100 ) {
    	indexlastSection = i;
    }
  })
  return indexlastSection;
}

var retrieveActive = function() {
  var scrollTop = $doc.scrollTop(),
      activeIndex = topToIndex(scrollTop);
  $('#debug').text( scrollTop )
  
  $sections.removeClass('active').eq(activeIndex).addClass('active')
  $menu.removeClass('active').eq(activeIndex).addClass('active')
  
  return activeIndex;
}

$doc.keydown(function(e) {
  e.preventDefault()

  var $active = $sections.filter('.active'),
      $prev = $active.prev('.section'),
      $next = $active.next('.section');
  
	if (e.keyCode == 37 || e.keyCode == 38) { // Arrow left or up
		$body.animate({
			scrollTop: $prev.length ? $prev.offset().top : $active.offset().top
		}, 400);
	}
	if (e.keyCode == 39 || e.keyCode == 40) { // Arrow right or down
		$body.animate({
			scrollTop: $next.length ? $next.offset().top : $active.offset().top
		}, 400);
	}
});
// END One Page

/*
$('body').append('<div id ="debug" style="position:fixed;top:0;left:0;background:#0f0;" />')
$doc.on('scroll', function() {
  retrieveActive()
})
retrieveActive()
*/

// @link https://css-tricks.com/snippets/jquery/smooth-scrolling/
$(function() {
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $body.animate({
          scrollTop: target.offset().top
        }, 400);
        return false;
      }
    }
  });
});