(function( $ ) {

	'use strict';

	jQuery( document ).ready( function( $ ){

		var el, leftPos, newWidth,
		  mainNav = $('.navbar-white .nav-items');

		  mainNav.append('<li id="magic-line"></li>');

		  var magicLine = $('#magic-line');
		  magicLine.width($(".nav-items .current a").width()).css("left", $(".current a").position().left).data("origLeft", magicLine.position().left).data("origWidth", magicLine.width());

		  $(".navbar-white li").hover(function() {
			       	el = $(this).find('a');
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
				
	// Remove Anchors
	$( 'a[href="#"]' ).on( 'click', function( e ){
		e.preventDefault();
	});

	// Add tooltips Script
	$('[data-toggle="tooltip"]').tooltip();

	});//if document is ready (is loaded)

})(window.jQuery);
