(function( $ ) {

	'use strict';

	jQuery( document ).ready( function( $ ){

		var el, leftPos, newWidth,
		  mainNav = $('.navbar-white .nav-items');

		  mainNav.append('<li id="magic-line"></li>');

		  var magicLine = $('#magic-line');
		  magicLine.width($(".nav-items .current").width()).css("left", $(".current a").position().left).data("origLeft", magicLine.position().left).data("origWidth", magicLine.width());

		  $(".navbar-white li a").hover(function() {
			       	el = $(this);
			        leftPos = el.position().left;
			        newWidth = el.parent().width();
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

	$( 'a[href="#"]' ).on( 'click', function( e ){
		e.preventDefault();
	});
	if( $( '.navbar a' ).attr('href') != '' || $( '.navbar a' ).attr('href') != '#' ){
		
	}

	});//if document is ready (is loaded)

})(window.jQuery);
