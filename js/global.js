function changePage(page){
	$("#content").fadeOut(300, function(){
		$("#content").load('pages/'+page+'.html', function(){
			$("#content").fadeIn(500,function(){
				$( ".text_container" ).animate({left: "0px"}, 800);
				$( ".close_text_container_button" ).animate({left: "425px"},800);
			});
		});
	});
}

function galleryPage(gallery_name){
	var gallery_zaha = new Array();
	gallery_zaha.push({'image':'1.jpg','description':"test description image 1"});
	gallery_zaha.push({'image':'2.jpg','description':"test description image 2"});
	gallery_zaha.push({'image':'3.jpg','description':"test description image 3"});
	
	var gallery_int_render = new Array();
	gallery_int_render.push({'image':'1.jpg','description':"description image 1"});
	gallery_int_render.push({'image':'2.jpg','description':"description image 2"});
	gallery_int_render.push({'image':'3.jpg','description':"description image 3"});
	gallery_int_render.push({'image':'4.jpg','description':"description image 5"});
	
	var gallery_ext_render = new Array();
	gallery_ext_render.push({'image':'1.jpg','description':"description image 1"});
	gallery_ext_render.push({'image':'2.jpg','description':"description image 2"});
	gallery_ext_render.push({'image':'3.jpg','description':"description image 3"});
	gallery_ext_render.push({'image':'4.jpg','description':"description image 4"});
	gallery_ext_render.push({'image':'5.jpg','description':"description image 5"});
	
	var gallery_array_name = eval(gallery_name);
	
	$("#content").fadeOut(300, function(){
		$("#content").load('pages/gallery.html', function(){
			$("#content").fadeIn(500,function(){
				$.each(gallery_array_name,function(key, value) {
					if(key=="0"){
						$(".gallery_image").append( '<img id="'+gallery_name+'_'+key+'" src="images/gallery/'+gallery_name+'/'+value.image+'" class="img_visible" data-id="'+key+'" data-description="'+value.description+'"/>').hide().fadeIn(1200);
						$(".gallery_description").html(value.description);
					}
					else{
						$(".gallery_image").append( '<img id="'+gallery_name+'_'+key+'" src="images/gallery/'+gallery_name+'/'+value.image+'" data-id="'+key+'" data-description="'+value.description+'"/>'  );
					}
				}); 
			});
		});
	});
}
function change_gallery_image(action){
	var count_img = $('.gallery_image img').size() - 1;
	if(action=="next"){
		if(parseInt($( ".img_visible" ).data("id"))==count_img){
			var id_show =0;
		}
		else{
			var id_show = parseInt($( ".img_visible" ).data("id"))+1;			
		}
	}
	else{
		var id_show = parseInt($( ".img_visible" ).data("id"))-1;
	}
	
	$('.gallery_image img').removeClass("img_visible");
	$('.gallery_image img').fadeOut(1000);
	$('.gallery_image img:eq('+id_show+')').fadeIn(3000);
	$('.gallery_image img:eq('+id_show+')').addClass("img_visible");
	$(".gallery_description").html( $('.gallery_image img:eq('+id_show+')').data("description") );
}
function expandMenu(command){
	if(command =="0"){ /*minimize menu*/
		$( "#menu" ).animate({width: "0"}, 600);
		$( "#menu" ).hide();
		$( "#content" ).animate({width:"100%"},600);
		$( ".close_menu_button" ).animate({left: "0"},600, function(){
			$( ".close_menu_button" ).hide();
			$( ".open_menu_button" ).css("left","0px");
			$( ".close_menu_button" ).css("left","23%");
			$( ".open_menu_button" ).show();
		});
	}
	else{ /*expand menu*/		
		$( "#content" ).animate({width: "77%"},600);
		$( "#menu" ).animate({width: "23%"}, 600,function(){
			$( "#menu" ).show();
		});
		$( ".open_menu_button" ).animate({left: "23%"},600, function(){
			$( ".open_menu_button" ).hide();
			$( ".close_menu_button" ).show();
			$( ".close_menu_button" ).css("left","23%");
			$( ".open_menu_button" ).css("left","0");
		});
	}
}
function expandcontent(command){
	if(command =="0"){ /*minimize menu*/
		$( ".text_container h2" ).fadeOut(300);
		$( ".text_container p" ).fadeOut(300,function(){
			$( ".text_container" ).animate({width: "0",padding:"5% 0%"}, 600,function(){
				$( ".text_container" ).hide();
			});
			$( ".close_text_container_button" ).animate({left: "0px"},600, function(){
				$( ".close_text_container_button" ).hide();
				$( ".open_text_container_button" ).css("left","0px");
				$( ".close_text_container_button" ).css("left","423px");
				$( ".open_text_container_button" ).show();
			});
		});
		
	}
	else{ /*expand menu*/		
		$( ".text_container" ).show();
		$( ".text_container" ).animate({width: "341px",padding:"5%"},600,function(){
			$( ".text_container p" ).fadeIn(300);
			$( ".text_container h2" ).fadeIn(300);
		});
		$( ".open_text_container_button" ).animate({left: "423px"},600, function(){
			$( ".open_text_container_button" ).hide();
			$( ".close_text_container_button" ).show();
			$( ".close_text_container_button" ).css("left","423px");
			$( ".open_text_container_button" ).css("left","0px");
		});
	}
}
$( document ).ready(function() {
	$('.parent').removeClass("active");
	/*Submenu expand*/
  	$('.parent').click(function(){
		var id = $(this).data('id');
		if($(this).hasClass("active")){
			$('.sub_menu_item[data-parent="'+id+'"]').animate({height: "0px",padding: "0px 10px 0px 50px !important"},600,function(){
				$(this).hide();
				$('.sub_menu_item[data-parent="'+id+'"]').hide();
			});
			$('.sub_menu_item[data-parent="'+id+'"] a').fadeOut(400);
			$(this).removeClass("active");
		}
		else{
			/*function show*/
			$('.parent').removeClass("active");
			$('.sub_menu_item').hide();
			$('.sub_menu_item[data-parent="'+id+'"]').animate({height: "33px",padding: "8px 10px 8px 50px !important"},600);
			$('.sub_menu_item[data-parent="'+id+'"]').show();
			$('.sub_menu_item[data-parent="'+id+'"] a').fadeIn(400);
			$(this).addClass("active");
		}
	});
});