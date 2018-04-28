(function( $ ) {

	'use strict';

	jQuery( document ).ready( function( $ ){


	    var $el, leftPos, newWidth,
	        $mainNav = $(".navbar-white .nav-items");

	    $mainNav.append("<li class='magic-line'></li>");
	    var $magicLine = $(".magic-line");

	    $magicLine
	        .width($("nav-item.current").width())
	        .css("left", $("nav-item.current a").position().left)
	        .data("origLeft", $magicLine.position().left)
	        .data("origWidth", $magicLine.width());

	    $(".navbar-white li a").hover(function() {
	        $el = $(this);
	        leftPos = $el.position().left;
	        newWidth = $el.parent().width();
	        $magicLine.stop().animate({
	            left: leftPos,
	            width: newWidth
	        });
	    }, function() {
	        $magicLine.stop().animate({
	            left: $magicLine.data("origLeft"),
	            width: $magicLine.data("origWidth")
	        });
	    });
	});

})(window.jQuery);
