(function( $ ) {

	'use strict';
	var getSize;
    window.viewportSize = {};

    window.viewportSize.getWidth = function() {
        return getSize( 'Width' );
    };

    window.viewportSize.getHeight = function() {
        return getSize( 'Height' );
    };

    getSize = function( Name ) {
        var size, bodyElement, divElement;
        var name = Name.toLowerCase();
        var document = window.document;
        var documentElement = document.documentElement;
        if ( undefined === window['inner' + Name] ) {

            // IE6 & IE7 don't have window.innerWidth or innerHeight
            size = documentElement['client' + Name];
        } else if ( window['inner' + Name] !== documentElement['client' + Name] ) {

            // WebKit doesn't include scrollbars while calculating viewport size so we have to get fancy
            // Insert markup to test if a media query will match document.doumentElement["client" + Name]
            bodyElement = document.createElement( 'body' );
            bodyElement.id = 'vpw-test-b';
            bodyElement.style.cssText = 'overflow:scroll';
            divElement = document.createElement( 'div' );
            divElement.id = 'vpw-test-d';
            divElement.style.cssText = 'position:absolute;top:-1000px';

            // Getting specific on the CSS selector so it won't get overridden easily
            divElement.innerHTML = '<style>@media(' + name + ':' + documentElement['client' + Name] + 'px){body#vpw-test-b div#vpw-test-d{' + name + ':7px!important}}</style>';
            bodyElement.appendChild( divElement );
            documentElement.insertBefore( bodyElement, document.head );
            if ( 7 === divElement['offset' + Name] ) {

                // Media query matches document.documentElement["client" + Name]
                size = documentElement['client' + Name];
            } else {

                // Media query didn't match, use window["inner" + Name]
                size = window['inner' + Name];
            }

            // Cleanup
            documentElement.removeChild( bodyElement );
        } else {

            // Default to use window["inner" + Name]
            size = window['inner' + Name];
        }
        return size;
    };

	function openTab() {
		$('a[href*="#"]').on('click',function(e){
			var a = $(this).attr('href');
			$( this ).parent('div').addClass('tab-head-active').removeClass('cell-disabled').siblings().removeClass('tab-head-active').addClass('cell-disabled');

			$( '[id*="table-"] ' + a ).addClass('tab-active');
			$( '[id*="table-"] ' + a ).siblings().removeClass('tab-active');
			e.preventDefault();
		});
	}
	if( viewportSize.getWidth() < 670 ) {
		$('#main #main-content').scroll(function(){
			var offset = 190;

			( $(this).scrollTop() > offset ) ? $('#user-bar-header,header').addClass('sticky') : $('#user-bar-header,header').removeClass('sticky');

			if( $(this).scrollTop() > offset ){
				$('#user-bar-header').stop().animate({top:'-200px'},1000 );
				$('header').stop().animate({top:0});
			} else {
				$('#user-bar-header').stop().animate({top:'0'},1000 );
				$('header').stop().animate({top:0});
			}
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
		( $('.dropdown').hasClass('show') == 'show' ) ? $('.badge').css('display','block') : $('.badge').remove();
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
