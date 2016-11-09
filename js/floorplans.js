var floor_coordenates = {
	'l-00a': { 'x':249, 'y':551, width:43, height:28, title:'<h4>TOWNHOUSE RESIDENCES 1002</h4>LEVEL 10 - 11', description:'<p>5 BEDROOM - 6.5 BATHROOM </p><p>INTERIORS: 8,060 SQFT 749 m(2)</p><p>TERRACES: 834 SQFT 77 m(2)</p><p>TOTAL AREA: 8,894 SQFT 826 m(2)</p>' },
	'l-00b': { 'x':163, 'y':545, width:87, height:39, title:'<h4>TOWNHOUSE RESIDENCES 1002</h4>LEVEL 10 - 11', description:'<p>5 BEDROOM - 6.5 BATHROOM </p><p>INTERIORS: 8,060 SQFT 749 m(2)</p><p>TERRACES: 834 SQFT 77 m(2)</p><p>TOTAL AREA: 8,894 SQFT 826 m(2)</p>' },
	
	'l-01a': { 'x':250, 'y':533, width:42, height:25, title: '<h4>TOWNHOUSE RESIDENCES 1201</h4>LEVEL 12 - 14', description:'<p>5 BEDROOM - 6.5 BATHROOM </p><p>INTERIORS: 8,102 SQFT 753 m(2)</p><p>TERRACES: 899 SQFT 84 m(2)</p><p>TOTAL AREA: 9,001 SQFT 837 m(2)</p>' },
	'l-01b': { 'x':164, 'y':525, width:87, height:43, title: '<h4>TOWNHOUSE RESIDENCES 1201</h4>LEVEL 12 - 14', description:'<p>5 BEDROOM - 6.5 BATHROOM </p><p>INTERIORS: 8,102 SQFT 753 m(2)</p><p>TERRACES: 899 SQFT 84 m(2)</p><p>TOTAL AREA: 9,001 SQFT 837 m(2)</p>' },
	
	'l-02a': { 'x':250, 'y':429, width:41, height:109, title: '<h4>HALF-FLOOR RESIDENCES</h4>ZONE 1 - LEVEL 15 - 25', description:'<p>4 BEDROOM - 5.5 BATHROOM</p><p>INTERIORS: 4,601 SQFT 427 m(2)</p><p>TERRACE: 819 SQFT 76 m(2)</p><p>TOTAL AREA: 5,420 SQFT 503 m(2)/p>' },
	'l-02b': { 'x':164, 'y':429, width:88, height:114, title: '<h4>HALF-FLOOR RESIDENCES</h4>ZONE 1 - LEVEL 15 - 25', description:'<p>4 BEDROOM - 5.5 BATHROOM</p><p>INTERIORS: 4,601 SQFT 427 m(2)</p><p>TERRACE: 819 SQFT 76 m(2)</p><p>TOTAL AREA: 5,420 SQFT 503 m(2)</p>' },
	
	'l-03a': { 'x':249, 'y':366, width:40, height:66, title: '<h4>HALF-FLOOR RESIDENCES</h4>ZONE 2 - LEVEL 26 - 33 ', description:'<p>4 BEDROOM - 5.5 BATHROOM</p><p>INTERIORS: 4,599 SQFT 427 m(2)</p><p>TERRACE: 781 SQFT 73 m(2)</p><p>TOTAL AREA: 5,380 SQFT 500 m(2)</p>' },
	'l-03b': { 'x':164, 'y':365, width:87, height:67, title: '<h4>HALF-FLOOR RESIDENCES</h4>ZONE 2 - LEVEL 26 - 33 ', description:'<p>4 BEDROOM - 5.5 BATHROOM</p><p>INTERIORS: 4,599 SQFT 427 m(2)</p><p>TERRACE: 781 SQFT 73 m(2)</p><p>TOTAL AREA: 5,380 SQFT 500 m(2)</p>' },
	
	'l-04a': { 'x':248, 'y':207, width:41, height:165, title: '<h4>HALF-FLOOR RESIDENCES</h4>ZONE 3 - LEVEL 34 - 49', description:'<p>4 BEDROOM - 5.5 BATHROOM</p><p>INTERIORS: 4,822 SQFT 448 m(2)</p><p>TERRACE: 603 SQFT 56 m(2)</p><p>TOTAL AREA: 5,425 SQFT 504 m(2)</p>' },
	'l-04b': { 'x':163, 'y':197, width:89, height:177, title: '<h4>HALF-FLOOR RESIDENCES</h4>ZONE 3 - LEVEL 34 - 49', description:'<p>4 BEDROOM - 5.5 BATHROOM</p><p>INTERIORS: 4,822 SQFT 448 m(2)</p><p>TERRACE: 603 SQFT 56 m(2)</p><p>TOTAL AREA: 5,425 SQFT 504 m(2)</p>' },
	
	'l-05': { 'x':163, 'y':106, width:126, height:125, title: '<h4>FULL-FLOOR PENTHOUSES</h4>ZONE 4 - LEVEL 50 - 57', description:'<p>5 BEDROOM - 6.5 BATHROOM </p><p>INTERIORS: 9,910 SQFT 921 m(2)</p><p>TERRACE: 1,216 SQFT 113 m(2)</p><p>TOTAL AREA: 11,126 SQFT 1,034 m(2)</p>' },
	'l-06': { 'x':166, 'y':83, width:121, height:65, title: '<h4>DUPLEX PENTHOUSE</h4>LEVEL 58 - 59', description:'<p>6 BEDROOM - 6 FULL + 2 HALF BATHROOM</p><p>INTERIORS: 15,207 SQFT 1,412 m(2)</p><p>TERRACE: 1,O13 SQFT 94 m(2) </p><p>TOTAL AREA: 16,220 SQFT 1,506 m(2)</p>' },
	'l-07': { 'x':166, 'y':50, width:118, height:74, title: '<h4>AQUATIC CENTER & SKY LOUNGE</h4>', description:'<p></p>' },
};
var floorplans = {
	
	is_init: false,
	
	init: function(){
		floorplans.onResize();
		//$(window).resize(floorplans.onResize);
		
		$('.floor').each(function(){
			var p_id = $(this).attr('rel');
			//$('#'+p_id+' .plan-title').html(floor_coordenates[$(this).attr('id')].title);
			if( floor_coordenates[$(this).attr('id')].title ){
				$(this).attr('title',floor_coordenates[$(this).attr('id')].title).tooltip();
			}
		});
		$('.floor').click(function(){
			$('.floor.active').removeClass('active');
			$(this).addClass('active');
			var p_id = $(this).attr('rel');

			if( $('.plans:visible').size() > 0 ){
				$('.plans:visible').fadeOut( 800, function(){
					$('#'+p_id).fadeIn(900);
				} );
			}else{
				$('#preview_page:visible').fadeOut( 800, function(){
					$('#plan_title').fadeOut(800);
					$('#plan_description').fadeOut(800);
					$('#'+p_id).fadeIn(900);
				});
			}
			
			var title =floor_coordenates[$(this).attr('id')].title;
			var description =floor_coordenates[$(this).attr('id')].description;
			$('#plan_title').fadeOut(800, function(){
				$('#plan_title').html(title);
				$('#plan_title').fadeIn(900);
			});
			$('#plan_description').fadeOut(800, function(){			
				$('#plan_description').html(description);
				$('#plan_description').fadeIn(900);
			});
		});
	},
	
	onResize: function(){
		var win_height = $(window).height()-45;
		var win_width = $(window).width();
		if( !floorplans.is_init ){
			$('.plans img').each(function(){
				var id_dom = $(this).parent().attr('id');
				$(this).touchPanView({
					width: 				win_height-280,
					height: 			win_height-281,
					startZoomedOut: 	true,
					zoomIn: 			'#'+id_dom+'-zoom-in',
					zoomOut:			'#'+id_dom+'-zoom-out',
				});
			});
			floorplans.is_init = true;
		}else{
			$('.touchpanview-wrap, .touchpanview-pan, .touchpanview-pan img').css({width:win_height-199, height:win_height-200});
		}
		floorplans.reposFloors();
	},
	
	reposFloors: function(){
		var win_height = $(window).height()-45;
		var win_width = $(window).width();
		var img_init_width = $('#build-bg').data('init-width');
		var img_init_height = $('#build-bg').data('init-height');
		var img_coc = img_init_height/img_init_width;
		var img_height = win_height;
		var img_width = img_height/img_coc;
		var floor_coc = img_height/img_init_height;
		$('#build-bg').css({height:img_height});
		$('.plans').css({marginLeft:img_width-50});
		$('#preview_page').css({marginLeft:img_width-50});
		
		
		$('.logo_bk_image_left img').css('width',(win_width*0.16));		
		var body_width = win_width*0.05;
		if(body_width>42){	$('body').css('background-size',42);}
		else{	$('body').css('background-size',body_width);}	
				
		$('#plan_description').css("margin-top", win_height-190);
		$('#plan_description').css("marginLeft",img_width-50);
		$('#plan_title').css("marginLeft",img_width-50);
		
		/*$('.plans img').css({height:img_height});*/
		$('.floor').each(function(){
			$(this).css({ 'top': parseInt(floor_coordenates[$(this).attr('id')].y*floor_coc),
				'left':parseInt(floor_coordenates[$(this).attr('id')].x*floor_coc),
				'width':parseInt(floor_coordenates[$(this).attr('id')].width*floor_coc),
				'height':parseInt(floor_coordenates[$(this).attr('id')].height*floor_coc) });
		});
	},
};
var change_floor = function(div) { 
	if(div=='a'){
		$('#p-06 img').fadeOut(500, function(){
			$('#p-06').css("display", "none");
			$('#p-06_a img').fadeIn(500);
			$('#p-06_a').css("display", "block");
		});
	}
	else{
		$('#p-06_a img').fadeOut(500, function(){
			$('#p-06_a').css("display", "none");
			$('#p-06 img').fadeIn(500);		
			$('#p-06').css("display", "block");
		});
	}
};