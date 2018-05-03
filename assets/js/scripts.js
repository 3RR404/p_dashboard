(function( $ ) {

	'use strict';

	function openTab() {
		$('a[href*="#"]').on('click',function(e){
			var a = $(this).attr('href');
			$( this ).parent('div').addClass('tab-head-active').removeClass('cell-disabled').siblings().removeClass('tab-head-active').addClass('cell-disabled');

			$( '[id*="table-"] ' + a ).addClass('tab-active');
			$( '[id*="table-"] ' + a ).siblings().removeClass('tab-active');
			e.preventDefault();
		});
	}

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
	$( '.message.unread-message' ).on( 'mouseleave', function(){
		$(this).removeClass('unread-message');
	});
	$( '.dropdown a[href="#user-notification"]' ).on( 'click', function(){
		( $('.dropdown').hasClass('show') == false ) ? $('.badge').css('display','block') : $('.badge').remove();
	} );

	// Add tooltips Script
	$('[data-tooltip="tooltip"]').tooltip();

	$('[data-show="show-sidebar"]').on('click', function(){
		var openById = $(this).attr('href');

		if( $( openById ).attr('style') == 'width: 200px;' ){
			$('#left-sidebar .navbar.navbar-dark').removeAttr('style');
			$( openById ).animate({
					'width': '0'
				}, 420);
			$( '.menu-collapse' ).animate({left:0},420);
		} else {
			$('#left-sidebar .navbar.navbar-dark').css('display','block');
			$( openById ).animate({
					'width': '200px'
				}, 420);
			$( '.menu-collapse' ).animate({left:'200px'},420);
		}
	});
	openTab();

	});//if document is ready (is loaded)

})(window.jQuery);
