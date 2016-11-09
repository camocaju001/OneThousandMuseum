var points = {
	'19': { 'x':74,   'y':415,  'title':'Aventura', image: '19.jpg'  },
	'4':  { 'x':410,  'y':930,  'title':'Adrienne Arsht Center for the Performing Arts', image: '4.jpg'  },
	'28': { 'x':585,  'y':375,  'title':'Bal Harbor', image: '28.jpg'  },
	'27': { 'x':811,  'y':425,  'title':'I-195', image: '27.jpg'  },
	'3':  { 'x':886,  'y':789,  'title':'Resort World Miami', image: '3.jpg'  },
	'25': { 'x':1240, 'y':555,  'title':'Venetian Causeway', image: '25.jpg'  },
	'26': { 'x':1258, 'y':755,  'title':'McCarthur Causway', image: '26.jpg'  },
	'29': { 'x':1343, 'y':398,  'title':'Mount Sinai Hospital', image: '29.jpg'  },
	'6':  { 'x':1385, 'y':1049, 'title':'PAMM', image: '6.jpg'  },
	'21': { 'x':1639, 'y':533,  'title':'Jungle Island', 'expand':'top', image: '21.jpg'  },
	'20': { 'x':1792, 'y':556,  'title':'Miami Children Museum', image: '20.jpg'  },
	'13': { 'x':1879, 'y':370,  'title':'New World Symphany', image: '13.jpg'  },
	'5':  { 'x':1932, 'y':1050, 'title':'Museum Park', image: '5.jpg'  },
	'22': { 'x':2007, 'y':799,  'title':'Biscayne Bay', image: '22.jpg'   },
	'30': { 'x':2060, 'y':387,  'title':'South Beach', 'expand':'top', image: '30.jpg'  },
	'14': { 'x':2211, 'y':370,  'title':'South Point', image: '14.jpg'  },
	'18': { 'x':2432, 'y':403,  'title':'Fisher Island', image: '18.jpg'  },
	'12': { 'x':2488, 'y':548,  'title':'Portmiami', image: '12.jpg'  },
	'23': { 'x':2718, 'y':365,  'title':'Atlantic Ocean', image: '23.jpg'  },
	'16': { 'x':2936, 'y':409,  'title':'Key Biscayne', image: '16.jpg'   },
	'17': { 'x':3010, 'y':695,  'title':'Bayside Marina', image: '17.jpg'   },
	'9':  { 'x':3043, 'y':978,  'title':'American Airlines Arena', image: '9.jpg'  },
	'11': { 'x':3239, 'y':644,  'title':'Front Park', image: '11.jpg'   },
	'24': { 'x':3313, 'y':452,  'title':'Brickell Key', image: '24.jpg'   },
	'10': { 'x':3524, 'y':387,  'title':'Brickell Citicentre', image: '10.jpg'   },
	'15': { 'x':3654, 'y':906,  'title':'Freedom Tower', image: '15.jpg'  }
};

var dom180 = {
	
	movement_ver: false,
	
	init: function(){
		$('body').css( {'overflow':'hidden'} );
		$('#wrapper').css( {position:'absolute', 'zIndex':1, 'overflow':'hidden'} );
		$('#180-bg').data( 'init-width', 3700 );
		$('#180-bg').data( 'init-height', 1080 );
		$('#180-bg').css( {position:'absolute', 'zIndex':1, 'cursor':'move'} );
		dom180.createPoints();
		dom180.resize();
		$(window).resize(dom180.onResize);
		dom180.iscroll = new iScroll( 'neightborhood_wrapper', {
			scrollbarClass: '-scroll-bar',
			vScroll: false,
			hScroll: true,
			onScrollMove: dom180.onScrollMove,
			onScrollEnd: dom180.onScrollMove,
			bounce: false
		} );
		setTimeout(function(){
			dom180.iscroll.refresh();
		},300);
		$('.point-bullet').click( dom180.onBulletClick );
		$('#btn-next').click(function(){
			dom180.startMovement( 1 );
		});
		$('#btn-prev').click(function(){
			dom180.startMovement( -1 );
		});
		$('#btn-stop').click(function(){
			dom180.stopMovement();
		});
	},
	
	onResize: function(){
		dom180.resize();
		dom180.iscroll.refresh();
	},
	
	onScrollMove: function(){
		if( !dom180.movement_ver ){
			$('#legend').fadeOut(800);
			dom180.movement_ver = true;
			var win_width = $(window).width();
			var area_to_show = win_width/8; // define area width
			var show_from = ((win_width-area_to_show)/2);
			var show_to = show_from+area_to_show;
			var point_position;
			var content_dom;
			var is_visible;
			$('.point').each(function(){
				point_position = $(this).offset();
				content_dom = $(this).find('.point-content');
				is_visible = content_dom.is(':visible');
				if( point_position.left > show_from && point_position.left < show_to ){
					if( !is_visible ){
						dom180.expandPoint( content_dom );
					}
				}else{
					if( is_visible ){
						dom180.collapsePoint( content_dom );
					}
				}
			});
			dom180.movement_ver = false;
		}
	},
	
	resize: function(){
		var win_height =  $(window).height();
		var win_width = $(window).width();
		var img_height = 1080;
		var img_width = 3700;
		var img_coc = img_height/img_width;
		var n_img_width = win_height/img_coc;
		$('#180-bg').css( {'width':n_img_width,'height':win_height} );
		$('#scroll-content').css( {'width':n_img_width,'height':win_height} );
		$('#wrapper').css( {'width':win_width, 'height':win_height} );
		dom180.posPoints();
	},
	
	getPointDom: function( index, point ){
		var point_dom = $('<div class="point" id="point_'+index+'" style="position:absolute;z-index:9;"></div>');
		var bullet_dom = $('<div class="point-bullet" data-index="'+index+'">&nbsp;</div>');
		var content_dom = $('<div class="point-content" style="display:none;"></div>');
		var text_dom = $('<div class="point-text">'+point.title+'</div>');
		var arrow_dom = $('<div class="point-arrow"><img src="images/180/pointer_arrow.png" height="20" /></div>');
		var arrow_d_dom = $('<div class="point-arrow-d" style="display:none;"><img src="images/180/pointer_arrow_d.png" height="20" /></div>');
		var image_dom = point.image? $('<div class="thumb"><img src="images/180/thumbs/'+point.image+'" /></div>') : '';
		if(point.image) text_dom.append( image_dom );
		if( point.expand ) content_dom.data( 'expand', point.expand );
		content_dom.append( arrow_dom );
		content_dom.append( text_dom );
		content_dom.append( arrow_d_dom );
		point_dom.append( bullet_dom );
		point_dom.append( content_dom );
		return point_dom;
	},
	
	createPoints: function(){
		var point_dom;
		$.each( points, function( k, v ){
			point_dom = dom180.getPointDom( k, v );
			$('#scroll-content').append( point_dom );
		} );
	},
	
	posPoints: function(){
		var img_init_height = $('#180-bg').data('init-height');
		var img_height = $('#180-bg').height();
		var img_coc = img_height/img_init_height;
		$.each( points, function( k, v ){
			var n_x = (v.x*img_coc)-15;
			var n_y = (v.y*img_coc)-15;
			$('#point_'+k).css( {'top':n_y, 'left':n_x} );
		} );
	},
	
	expandPoint: function( content_dom ){
		if( content_dom.is(':animated') ) return;
		var win_height = $(window).height()-45;
		var win_width = $(window).width();
		
		var init_height = content_dom.css({'height':'auto'}).height();
		var parent_position = content_dom.parent().offset();
		// Acomodate left
		var left_dif = parent_position.left+90;
		var m_left = -60;
		if( parent_position.left<75 ){
			m_left = -parent_position.left;
		}else if( left_dif > win_width ){
			m_left = -(150-(win_width-parent_position.left));
		}
		var pointer_left = -m_left;
		if( pointer_left < 5 ){
			pointer_left = 5;
		}else if( pointer_left > 115 ){
			pointer_left = 115;
		}
		
		// Acomodate top
		var top_dif = parent_position.top+init_height+30;
		var m_top = 30;
		if( top_dif>win_height || (content_dom.data('expand')&&content_dom.data('expand')=='top') ){
			m_top = -(init_height);
			content_dom.find('.point-arrow').hide();
			content_dom.find('.point-arrow-d').show().find('img').css({marginLeft:pointer_left});
		}else{
			content_dom.find('.point-arrow-d').hide();
			content_dom.find('.point-arrow').show().find('img').css({marginLeft:pointer_left});
		}
		content_dom.css({'height':0,'left':m_left,'top':m_top, 'opacity':0}).show().animate( {height:init_height, 'opacity':1}, 500 );
	},
	
	collapsePoint: function( content_dom ){
		if( content_dom.is(':animated') ) return;
		content_dom.animate( {height:0,opacity:0}, 500, function(){
			$(this).hide();
		} );
	},
	onBulletClick: function(){
		var index = $(this).data('index');
		var content_dom = $('#point_'+index+' .point-content');
		if( content_dom.is(':visible') ){
			dom180.collapsePoint( content_dom );
		}else{
			dom180.expandPoint( content_dom );
		}
		
	},
	
	stopMovement: function(){
		dom180.iscroll.stop();
	},
	
	startMovement: function( direction ){
		dom180.stopMovement();
		var total_time = 20000;
		var win_width = $(window).width();
		var img_width = $('#180-bg').width();
		var scroll_to;
		if( direction > 0 ){
			scroll_to = win_width-img_width;
		}else{
			scroll_to = 0;
		}
		total_time = total_time*((dom180.iscroll.x-scroll_to)/(win_width-img_width));
		if( total_time < 0 ){
			total_time = -total_time;
		}
		dom180.iscroll.scrollTo(scroll_to, 0, total_time, false );
	}
	
};
