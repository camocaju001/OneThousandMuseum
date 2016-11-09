$(document).ready( function(){
	MJSFramework.init();
} );
////////////////////////////////
var pageFadeAnimation = {
	delay: 400,
	hide: function( page_dom, callback ){
		page_dom.fadeOut( pageFadeAnimation.delay, callback );
	},
	show: function( page_dom, callback ){
		page_dom.fadeIn( pageFadeAnimation.delay, function(){
			if( MJSFramework._content_iScroll ) MJSFramework._content_iScroll.refresh();
			callback();
		} );
	}
}
////////////////////////////////
var MJSFramework = {
	_session: {},
	_content_iScroll: false,
	init: function(){
		if( $('#_ajax-loader').size() == 0 ){
			var ajax_loader_dom = $('<div id="_ajax-loader" class="ui-loader ui-corner-all ui-body-a ui-loader-verbose"></div>');
			ajax_loader_dom.append( '<span class="ui-icon ui-icon-loading"></span>' );
			ajax_loader_dom.append( '<h1></h1>' );
			$('body').append( ajax_loader_dom );
		}
		window.location.hash = '';
		$(window).on('hashchange', MJSFramework.onHashchange);
		var page_content = $('div[data-role="page"]');
		page_content.trigger({type:'pageinit'});
		page_content.toPage( function(){} );
		$('#slide-content').css({'top':$(window).height()});
	},
	parseLinks: function(){
		$('a').click( function(event){
			event.preventDefault();
			if( $(this).attr('href') != '#' && !$(this).attr('href').match(/^javascript:/) ){
				MJSFramework.gotoPage( $(this).attr('href') );
			}
		});
	},
	hideSlide: function( callback ){
		$('#slide-content').animate({'top':$(window).height()}, 500, function(){
			$(this).find('.slide-content').hide();
			$(this).hide();
			if(callback) callback();
		});
	},
	showSlide: function( content_id, options ){
		var showNextSlide = function(){
			options = options || {};
			options.background_color = options.background_color || 'rgba(255,255,255,0.9)'
			$('#slide-content .slide-content').hide();
			$('#'+content_id).show();
			$('#slide-content').show().css({background: options.background_color }).animate({'top':54}, 500);
		}
		if( $('#slide-content').is(':visible') ){
			MJSFramework.hideSlide( showNextSlide );
		}else{
			showNextSlide();
		}
	},
	showHideSlide: function( content_id, options ){
		if( $('#'+content_id).is(':visible') ){
			MJSFramework.hideSlide();
		}else{
			MJSFramework.showSlide( content_id, options );
		}
	},
	onHashchange: function(){
		var url = window.location.hash!=''?window.location.hash.substring(1):'index.html';
		$(document).showLoader('Cargando ...');
		MJSFramework.loadPage( url );
	},
	loadPage: function( url ){
		var ajaxLoad = function(){
			$.ajax({
				url: url,
				dataType: 'text',
				complete: function(){
					$(window).hideLoader();
				},
				success: function( res ){
					var cont = $('<div id="response"></div>');
					cont.html(res);
					var page_dom = $('div[data-role="page"]');
					pageFadeAnimation.hide( page_dom, function(){
						var page_content = cont.find('div[data-role="page"]');
						page_dom.remove();
						page_content.hide();
						$('body').prepend(page_content);
						page_content.trigger({type:'pageinit'});
						page_content.toPage( function(){} );
					} );
				},
				error: function( res ){
					$(window).showPopup( '<div>Error loading page</div>' );
				}
			});
		}
		if( $('#slide-content').is(':visible') ){
			MJSFramework.hideSlide( ajaxLoad );
		}else{
			ajaxLoad();
		}
	},
	gotoPage: function( url ){
		window.location.hash = url;
	},
	goBack: function(){
		console.log("ACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
		if( $('#slide-content').is(':visible') ){
			MJSFramework.hideSlide();
		}else{
			navigator.app.backHistory();
		}
	}
};
////////////////////////////////
(function ( $ ) {
	$.fn.showPopup = function( html ){
		if( $('#_popup-container').size() == 0 ){
			var popup_container_dom = $('<div id="_popup-container" class="ui-popup-container slideup in ui-popup-active" style="display:none;"></div>');
			popup_dom = $('<div class="ui-popup ui-body-a ui-overlay-shadow ui-corner-all"></div>');
			var close_btn = $('<a href="javascript:void(0);" data-role="close-popup" onclick="$(window).hidePopup();" data-icon="delete" data-theme="c" data-iconpos="notext"></a>');
			popup_dom.append( close_btn );
			popup_dom.append( '<div id="_popup-content"></div>' );
			popup_container_dom.append( popup_dom );
			close_btn.toButton();
			$('body').append( popup_container_dom );
		}
		$('#_cover').show();
		$('#_popup-content').html( html );
		$('#_popup-content').find( 'a[data-role="button"]' ).toButton();
		$('#_popup-container').css( 'left', ($(window).width()-$('#_popup-container').width())/2 );
		$('#_popup-container').css( 'top', ($(window).height()-$('#_popup-container').height())/2);
		$('#_popup-container').show();
	}
	$.fn.showPopup = function( html ){
		if( $('#_popup-container').size() == 0 ){
			var popup_container_dom = $('<div id="_popup-container" class="ui-popup-container slideup in ui-popup-active" style="display:none;"></div>');
			popup_dom = $('<div class="ui-popup ui-body-a ui-overlay-shadow ui-corner-all"></div>');
			var close_btn = $('<a href="javascript:void(0);" data-role="close-popup" onclick="$(window).hidePopup();" data-icon="delete" data-theme="c" data-iconpos="notext"></a>');
			popup_dom.append( close_btn );
			popup_dom.append( '<div id="_popup-content"></div>' );
			popup_container_dom.append( popup_dom );
			close_btn.toButton();
			$('body').append( popup_container_dom );
		}
		$('#_cover').show();
		$('#_popup-content').html( html );
		$('#_popup-content').find( 'a[data-role="button"]' ).toButton();
		$('#_popup-container').css( 'left', ($(window).width()-$('#_popup-container').width())/2 );
		$('#_popup-container').css( 'top', ($(window).height()-$('#_popup-container').height())/2);
		$('#_popup-container').show();
	}
	
	$.fn.hidePopup = function(){
		if( $('#_popup-container').size()>0 && $('#_popup-container').is(':visible') ){
			$('#_cover').hide();
			$('#_popup-container').hide();
			$('#_popup-content').html( '' );
		}
	}
	$.fn.toTextInput = function(){
		var me = $(this).each(function() {
			var theme = $(this).data('theme') || MJSFramework._session.default_theme;
			var container = $('<div class="ui-input-text ui-shadow-inset ui-corner-all ui-btn-shadow ui-body-'+theme+'"></div>');
			$(this).addClass('ui-input-text');
			$(this).wrap( container );
		});
		return me;
	}
	$.fn.toSlideContent = function(){
		var me = $(this).each(function() {
			var instance = $(this);
			var index = 0;
			var win_width = $(window).width();
			var win_height = $(window).height()-54;
			var use_points = $(this).data('points') || false;
			$(this).css( {'width':win_width, 'height': win_height} );
			if(use_points) var slide_points_dom = $('<div class="slide-points"></div>');
			var timer = false;
			$(this).find('div.content').each(function(){
				$(this).css( {left:(index*win_width), width:win_width, height: win_height} );
				if(use_points){
					var point_dom = $('<div class="point">&nbsp;</div>');
					if( index == 0 ) point_dom.addClass('selected');
					slide_points_dom.append( point_dom );
				}
				index ++;
			});
			if(use_points) $(this).append( slide_points_dom );
			$(this).find('div.content-wrap').css('width',(index*win_width));
			var start_x;
			var iscroll = new iScroll($(this).attr('id'),{
				vScrollbar: false,
				hScrollbar: true,
				momentum: false,
				onScrollEnd: function(){
					if( iscroll.x % win_width!=0 ){
						var x = start_x;
						if(start_x > iscroll.x){
							x -= win_width;
						}else{
							x += win_width;
						}
						iscroll.scrollTo( x, 0, 500 );
						var selected = Math.round(-x/win_width);
						instance.find('.point.selected').removeClass('selected');
						instance.find('.point:eq('+selected+')').addClass('selected');
					}
				},
				onScrollStart: function(){
					start_x = iscroll.x;
				}
			});
			setTimeout( function(){
				console.log("refresh scroll");
				iscroll.refresh();
			}, pageFadeAnimation.delay+100 );
		});
		return me;
	}
	$.fn.toPage = function( callback ){
		var me = $(this).each(function() {
			$(this).addClass('ui-page');
			var theme = $(this).data('theme') || 'a';
			if( MJSFramework._session.default_theme ){
				$('body').removeClass('ui-body-'+MJSFramework._session.default_theme);
			}
			MJSFramework._session.default_theme = theme;
			$('body').addClass('ui-body-'+theme);
			var content_height = $(window).height();
			if( $(this).find('div[data-role="header"]').size()>0 ){
				$(this).find('div[data-role="header"]').toHeader();
				content_height -= 54;
			}
			if( $(this).find('div[data-role="footer"]').size()>0 ){
				$(this).find('div[data-role="footer"]').toFooter();
				content_height -= 43;
			}
			$(this).find('div[data-role="content"]').css({'height':content_height}).toContent();
			$('a[data-role="button"]').toButton();
			$('ul[data-role="listview"]').toList();
			$('input[type="text"],input[type="email"],input[type="password"]').toTextInput();
			$('.slide-contents').toSlideContent();
			MJSFramework.parseLinks();
			$(document).hideLoader();
			pageFadeAnimation.show( $(this), callback);
		});
		return me;
	}
	
	$.fn.hidePopup = function(){
		if( $('#_popup-container').size()>0 && $('#_popup-container').is(':visible') ){
			/*$('#_popup-container').animate( {'top': ($(window).height())}, 500, function(){
				$('#_cover').hide();
				$('#_popup-container').hide();
				$('#_popup-content').html( '' );
			} );*/
			//$('#_popup-container').css( {'top': ($(window).height())});
			$('#_cover').hide();
			$('#_popup-container').hide();
			$('#_popup-content').html( '' );
		}
	}
	$.fn.toHeader = function(){
		var me = $(this).each(function() {
			var theme = $(this).data('theme') || MJSFramework._session.default_theme;
			$(this).addClass('ui-header');
			$(this).addClass('ui-bar-'+theme);
			$(this).find('h1').addClass('ui-title');
			$(this).find('a[data-role="button"]').addClass('ui-btn-left');
			$(this).find('h1 ~ a[data-role="button"]').removeClass('ui-btn-left');
			$(this).find('h1 ~ a[data-role="button"]').addClass('ui-btn-right');
			$(this).show();
		});
		return me;
	}
	$.fn.toFooter = function(){
		var me = $(this).each(function() {
			var theme = $(this).data('theme') || MJSFramework._session.default_theme;
			$(this).addClass('ui-footer');
			$(this).addClass('ui-footer-fixed');
			$(this).addClass('ui-bar-'+theme);
			$(this).find('h1').addClass('ui-title');
			$(this).find('a[data-role="button"]').addClass('ui-btn-left');
			$(this).find('h1 ~ a[data-role="button"]').removeClass('ui-btn-left');
			$(this).find('h1 ~ a[data-role="button"]').addClass('ui-btn-right');
			$(this).show();
		});
		return me;
	}
	$.fn.showLoader = function( text ){
		text = text || false;
		if( text ){
			$('#_ajax-loader').addClass( 'ui-loader-verbose' );
			$('#_ajax-loader').removeClass( 'ui-loader-default' );
			$('#_ajax-loader').addClass( 'ui-body-c' );
			$('#_ajax-loader').removeClass( 'ui-body-z' );
			$('#_ajax-loader h1').text( text );
		}else{
			$('#_ajax-loader').removeClass( 'ui-loader-verbose' );
			$('#_ajax-loader').addClass( 'ui-loader-default' );
			$('#_ajax-loader').removeClass( 'ui-body-c' );
			$('#_ajax-loader').addClass( 'ui-body-z' );
		}
		$('#_ajax-loader').show();
	}
	
	$.fn.hideLoader = function(){
		$('#_ajax-loader').hide();
	}
	$.fn.toList = function(){
		var me = $(this).each(function() {
			if( $(this).hasClass('ui-listview') ) return;
			var theme = $(this).data('theme') || MJSFramework._session.default_theme;
			$(this).addClass('ui-listview');
			$(this).addClass('ui-listview-inset');
			$(this).find('li').addClass('ui-li').toButton();
			$(this).find('li[data-role="divider"]').addClass('ui-li-divider ui-first-child ui-bar-'+theme);
			$(this).find('li a').each( function(){
				var iconpos = $(this).data('iconpos') || 'right';
				$(this).parent().addClass('ui-btn ui-btn-icon-'+iconpos+' ui-li-has-arrow ui-li ui-btn-up-'+theme);
				var pre_cont = $('<span class="ui-btn-inner ui-li"></span>');
				var pre_cont_cont = $('<span class="ui-btn-text"></span>');
				pre_cont.append( pre_cont_cont );
				var icon = $(this).data('icon') || false;
				if(icon) pre_cont.append('<span class="ui-icon ui-icon-'+icon+' ui-icon-shadow">&nbsp;</span>');
				$(this).wrap( pre_cont );
				$(this).addClass( 'ui-link-inherit' );
			} );
		});
		return me;
	}
	
	$.fn.toContent = function(){
		var me = $(this).each(function() {
			$(this).addClass('ui-content');
			if( $(this).data('scroll') ){
				$(this).addClass('ui-content-scroll');
				if( !$(this).attr('id') ){
					var id = new Date();
					id = id.getMilliseconds();
					$(this).attr('id', id);
				}
				MJSFramework._content_iScroll = new iScroll($(this).attr('id'), {
					
				});
			}else{
				$(this).css({height:'-=30'});
				MJSFramework._content_iScroll = false;
			}
		});
		return me;
	}
	$.fn.toButton = function(){
		var me = $(this).each(function() {
			$(this).addClass('ui-btn');
			var theme = $(this).data('theme') || MJSFramework._session.default_theme;
			$(this).addClass('ui-btn-up-'+theme);
			var shadow = $(this).data('shadow') || false;
			if( shadow ){
				$(this).addClass('ui-shadow');
			}
			var icon = $(this).data('icon') || false;
			var inline = $(this).data('inline') || false;
			if( inline ) $(this).addClass('ui-btn-inline');
			var inner_dom = $('<span class="ui-btn-inner"></span>');
			var text_dom = $('<span class="ui-btn-text"></span>');
			if( $(this).find('img').addClass('ui-btn-thumb').size() > 0 ){
				$(this).addClass('ui-btn-has-thumb');
				inner_dom.html( $(this).find('img') );
			}
			if( $(this).is('a') ){
				text_dom.text( $(this).text() );
			}else{
				text_dom.append( $(this).find('a') );
			}
			inner_dom.append( text_dom );
			$(this).html(inner_dom);
			if( icon ){
				var iconpos = $(this).data('iconpos') || 'left';
				$(this).addClass('ui-btn-icon-'+iconpos);
				var icon_container = $('<span class="ui-icon ui-icon-'+icon+'">&nbsp;</span>');
				inner_dom.prepend( icon_container );
			}else{
				$(this).find('.ui-icon').remove();
				$(this).removeClass('ui-btn-icon-left');
				$(this).removeClass('ui-btn-icon-right');
			}
			$(this).mouseenter(function(){
				$(this).removeClass('ui-btn-up-'+theme);
				$(this).addClass('ui-btn-hover-'+theme);
			}).mouseleave(function(){
				$(this).removeClass('ui-btn-hover-'+theme);
				$(this).removeClass('ui-btn-down-'+theme);
				$(this).addClass('ui-btn-up-'+theme);
			}).mousedown(function(){
				$(this).removeClass('ui-btn-hover-'+theme);
				$(this).removeClass('ui-btn-up-'+theme);
				$(this).addClass('ui-btn-down-'+theme);
			}).mouseup(function(){
				$(this).removeClass('ui-btn-hover-'+theme);
				$(this).removeClass('ui-btn-down-'+theme);
				$(this).addClass('ui-btn-up-'+theme);
			});
		});
		return me;
	}
}( jQuery ));