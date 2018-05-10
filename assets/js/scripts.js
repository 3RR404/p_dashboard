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
	if( viewportSize.getWidth() < 768 ) {
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

	if( viewportSize.getWidth() >= 768 && viewportSize.getWidth() < 1199 ){
		var link = $( '.nav-link' );
		link.find('span').css('display','none');
	} else if( viewportSize.getWidth() > 1200 || viewportSize.getWidth() < 768 ){
		var link = $( '.nav-link' );
		link.find('span').css('display','block');
	}

	// back to top button
	function btnBackToTop(){
		var offset = 200,
			offsetOpacity = 200,
			$backToTop = $('.btn-to-top');

		$( '#main-content' ).scroll(function() {
			( $( this ).scrollTop() > offset ) ? $backToTop.addClass( 'is-visible' ) : $backToTop.removeClass( 'is-visible fade-out' );
			if ( $( this ).scrollTop() > offsetOpacity ) {
				$backToTop.addClass( 'fade-out' );
			}
		});

		$backToTop.on('click', function(){
			$( '#main-content' ).animate({
					scrollTop: 0
				}, 700
			);
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

	// Logo onClick roll back the site to top in 700 ms
	$( 'a[href="#home"]' ).on( 'click', function(){
		$( '#main-content' ).animate({
				scrollTop: 0
			}, 700
		);
	});

	$( '.message.unread-message' ).on( 'mouseleave', function(){
		$(this).removeClass('unread-message');
	});
	$( '.dropdown a[href="#user-notification"]' ).on( 'click', function(){
		( $('.dropdown').hasClass('show') == 'show' ) ? $('.badge').css('display','block') : $('.badge').remove();
	} );

	$( '[href="#open-searchbar"]' ).on( 'click', function(){
		$( '#search-bar-form' ).animate({ 'width':'100%' }, 1000);
	} );
	$( '.closebtn' ).on( 'click', function( event ){
		$('.overlay').animate({'width':'0'}, 1000);
		event.preventDefault();
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

	btnBackToTop();

	$('.chart').each( function(){
		var dataVal = $(this).attr('data-chart');
		$(this).append('<canvas class="newCanvas"></canvas>');
		$(this).find('.newCanvas').width('30px').height(dataVal + '%');
		var ctx = $(this).find('.newCanvas')[0].getContext('2d');
			ctx.fillStyle = "#16a085";
			ctx.fillRect(0,0,600,800);
	} );

	if( viewportSize.getWidth() < 768 ){
		$('[name="submit"]').on('click', function( event ){
			event.preventDefault();
			$('.overlay').animate({'width':'0'}, 1000);
			//Hilitor.apply();
		});
	} else {
		$('[name="submit"]').on('click', function( event ){
			event.preventDefault();
		});
	}

	$( 'input#search' ).on('keyup', function(){
		var intVal = $( '#search' ).val();
		if( intVal == '' || intVal == ' ' ){
			$('button[name="clear-search"]').css('display','none');
		} else {
			$('button[name="clear-search"]').css('display','block');
		}
	});

	/**
	 *
	 * Hide edit button and show Save button
	 * Add new text input and hide the Heading
	 * delete old Text from heading and set new
	 *
	 */
		$( 'a[href="#edit"]' ).on( 'click', function( e ){
			var userName = $( 'h4.user-name' ).text();
				$( 'h4.user-name' ).hide();
				$('.user-info-head').append('<input type="text" class="userName" name="userName" value="' + userName + '" />');
			$(this).hide();
			$('.user-actions').each(function(){
				$(this).append('<a href="#save-it" class="save-it">Save</a>');
			});
			e.preventDefault();
		} );
		$('.user-info-head').on('keyup', '.userName', function(){
			var newUserName =  $(this).val();

			$( '.user-actions' ).on( 'click', 'a[href="#save-it"]', function( e ){
				$('.userName').hide();
				$( 'h4.user-name' ).show().html( newUserName );
				$( '.brand-logo .brand-title' ).html( newUserName );
				$( '.user-name' ).attr({'title': newUserName, 'data-original-title': newUserName});
				localStorage.setItem("lastname", newUserName);

				$(this).hide();
				$('a[href="#edit"]').show();
				e.preventDefault();
			});
		});



	});//if document is ready (is loaded

})(window.jQuery);
