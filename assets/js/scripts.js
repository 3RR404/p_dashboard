(function( $ ) {

	'use strict';

	jQuery( document ).ready( function( $ ){

		  var magicLine = $('div.magic-line');

		  magicLine.width($(".current").width())
			        .css("left", $("a.active").position().left)
			        .data("origLeft", magicLine.position().left)
			        .data("origWidth", magicLine.width());

		  $(".navbar-white li a").hover(function() {
			        var el = $(this);
			        var leftPos = el.position().left;
			        var newWidth = el.parent().width();
			        magicLine.stop().animate({
			            left: leftPos,
			            width: newWidth
			        });
			    }, function() {
			        magicLine.stop().animate({
			            left: magicLine.data("origLeft"),
			            width: magicLine.data("origWidth")
			        });
			    });
	});//if document is ready (is loaded)

})(window.jQuery);
