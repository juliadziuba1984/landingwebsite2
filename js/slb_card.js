var mobile=false;
if(navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i)|| navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/Blackberry/i) ) mobile=true;

/*-------------video player*/
function InitPlayer(){
	$('.js_videoplayer').each(function() {
			var the_player_wrapper = $(this);
			var the_player = $('video', the_player_wrapper);
			the_player.mediaelementplayer({
				alwaysShowControls: true,
				startVolume: 1,
				features: ['playpause','progress', 'duration','volume','fullscreen'],
				success: function(mediaElement, domObject) {
				
					
					$('.play').on('click', function() {
						 mediaElement.play();
					   });
				}
			});
		});
	$('.mejs-time-current').css('width', '0px');
	
}
/*-------------end video player*/


/*-------------------popup init-------------------*/
function InitPopup(popup){
	popup = $(popup);
	var cls = popup.attr('data-popup');

	$('.custom-popup.'+cls).fadeIn('300');
	$('.custom-popup.'+cls).prev('.custom-overlay').fadeIn('300');	

	if(cls == 'js_video_popup') {
		var video_target = popup.attr('href');
		$('.custom-popup.'+cls).find('video').attr('src', video_target);
		InitPlayer();
		
	}
}
/*-------------------end popup init-------------------*/


/*-------------ALIGN POPUPS-------------------------*/
function AlignPopup(){
	$('.custom-popup').each(function(){
		if($(this).outerWidth() > $(window).width()-80 && $(this).outerHeight()+80 > $(window).height()) {
			$(this).css({
				"position": "absolute",
				"top": $(window).scrollTop() + 50 + "px",
				'left': '40px'
			});
		}
		
		else if($(this).outerHeight()+80 > $(window).height()) {
			$(this).css({
				"position": "absolute",
				"top": $(window).scrollTop() + 50 + "px",
				'left': ($(window).width()-$(this).outerWidth())/ 2 + 'px'
			});
		}
		
		else if($(this).outerWidth() > $(window).width()-80) {
			$(this).css({
				"position": "absolute",
				"top": $(window).scrollTop() + 50 + "px",
				'left': '40px'
			});
		}
		
		else {
			$(this).css('top',($(window).height()-$(this).outerHeight())/ 2 + 'px');
			$(this).css('left',($(window).width()-$(this).outerWidth())/ 2 + 'px');
			$(this).css('position', 'fixed');	
		}
	});

	
	if(mobile){
		$('.custom-popup').each(function(){
			if($(window).width()<=640){
				$('.custom-popup').css('left', '5%');
				$('.custom-popup').css('width','75%');
				$('.call_back_form').css('width','80%');
				$('.call_back_form .captcha_input input[type="text"], .call_back_form input[type=text], .call_back_form textarea, .call_back_form .form_row,.call_back_form .form_row_2').css('width','100%');
				$(' .call_back_form .captcha_input, .captcha_image_holder').css('width','49%');
			}
			else {
				$('.custom-popup').css('left', '50%');
				$('.custom-popup').css('margin-left', '-270px');
			}		
		});
    }
}
/*-------------END ALIGN POPUPS-------------------------*/


/*-------------remove input placeholders on click*/
function ClearPlaceholder(){
	$('input,textarea').focus(function(){
		 $(this).data('placeholder',$(this).attr('placeholder'))
		 $(this).attr('placeholder','');
	});
	$('input,textarea').blur(function(){
		 $(this).attr('placeholder',$(this).data('placeholder'));
	});
}
/*-------------end remove placeholders on click*/


/*init sections*/
var sections=null;
function initsections(){
	if($(window).width()>=800 && !mobile){
	var height = $(window).height()-100;
	$('.js_sections .section').height(height);
	
		$('.js_feat_height_item').css('height', $('.section').height()+'px');
		$('.js_feat_height_item_text').css('height', $('.section').height()+'px');
		$('.js_feat_height_scrollpane').css('height', $('.section').height()-190+'px');
		$('.js_next_section, .btn_scroll_content_top, .btn_scroll_content_bottom').show();
		$('.js_next_section').removeClass('hide');
		$('.section_block, .section_block div').removeClass('autoHeight');
		$('.content_scroll_block').removeClass('disablescroll');
		$('.btn_scroll_content_top, .btn_scroll_content_bottom, .gradient_before, .gradient_after').removeClass('hide');
	}
	else{
		$('.js_next_section, .btn_scroll_content_top, .btn_scroll_content_bottom').hide();
		$('.js_next_section, .btn_scroll_content_top, .btn_scroll_content_bottom, .gradient_before, .gradient_after').addClass('hide');
		$('.content_scroll_block, .jspPane, .jspContainer').css('width', 'auto');
		$('.jspPane').css('position','relative');
		$('.section_block, .section_block div').addClass('autoHeight');
		$('.content_scroll_block').addClass('disablescroll');
	}
}
/*end init sections*/


/*init scroll for sections*/
function initScrollSections(){
$('.section_holder').each(function(){
	var context = $(this);
	var block = $('.js_scrollPane', context);	
	
	var pane = block.jScrollPane({
		showArrows: true
	});
	var api = pane.data('jsp');
	api.reinitialise();
	$('.js_btn_scroll_content_top', context).click(function(e){
		e.preventDefault();
		var current = api.getContentPositionY();
		api.scrollTo( 0, current-50, 300);
		$('.js_btn_scroll_content_bottom', block).css('display', 'block');
	
	})
	$('.js_btn_scroll_content_bottom', context).click(function(e){
		e.preventDefault();
		var current = api.getContentPositionY();
		api.scrollTo(0, current+50, 300);
		$('.js_btn_scroll_content_top', block).css('display', 'block');
	
	})
	

	if(api) {
		if ($(this).outerHeight() >= api.getContentHeight()+190) {
			$('.js_btn_scroll_content_bottom', context).css('display', 'none');
		}
		else $('.js_btn_scroll_content_bottom', context).css('display', 'block');
		
		if (api.getContentPositionY() <= 0) {
			$('.js_btn_scroll_content_top', context).css('display', 'none');
		}
		else $('.js_btn_scroll_content_top', context).css('display', 'block');
	}
	
	$(this).bind(
	'jsp-scroll-y',
		function(event, scrollPositionY, isAtTop, isAtBottom)
		{
			if (isAtTop==true){
				$('.js_btn_scroll_content_top', context).css('display', 'none');
				console.log('isAtTop='+isAtTop);
				$('.gradient_before',context).css('display', 'none');
			}
			else if (isAtBottom==true){
				$('.js_btn_scroll_content_bottom', context).css('display', 'none');
				$('.gradient_after',context).css('display', 'none');
				console.log('isAtBottom='+isAtBottom);
			}
			else{
				$('.js_btn_scroll_content_bottom', context).css('display', 'block');
				$('.js_btn_scroll_content_top', context).css('display', 'block');
				$('.gradient_before',context).css('display', 'block');
				$('.gradient_after',context).css('display', 'block');
				}
		}
	)

})
}
/*end init scroll for sections*/


function showNextPageBtn(){
	if($(window).width()<=800 || mobile){
		$('.btn_next_page').hide();
	}
	else
		$('.btn_next_page').show();
}



var sectionArr;
var header_footer_height;
$( window ).resize(function() {
	AlignPopup();
	initsections();

	$('.js_sections .section').each(function(index, element) {
		if($(this).HasOverflowContent()){
			$(this).addClass('fp-auto-height');
		}
		else 
		{
			$(this).removeClass('fp-auto-height');
			}
	});

	if($(window).width()<=800 || mobile){
		$('.gradient_before').css('display', 'none');
		$('.gradient_after').css('display', 'none');
		$('.js_img_src img').css('display','block');
		$('.js_img_src img').css('width','100%');
	}
	else{
		$('.js_img_src img').css('display','none');
	}
	
	sectionArr = [];
	$('.section').each(function(){
		sectionArr.push($(this).offset().top-100);
	});
	showNextPageBtn();
	initScrollSections();

});	



$(window).scroll(function() {	
	var header_footer_height = $('.header').height()+$('.footer').height();					  
   if($(window).scrollTop() + $(window).height() > $(document).height() - header_footer_height-100) {
	   $('.js_scroll').removeClass('down').addClass('up');
	  	var href = $('.section:first-of-type').attr('id');
		$('.section').removeClass('active');
		$('.section:last-of-type').addClass('active');
		$('body').scrollTo(href, {duration:'slow', offset: -100});
   }else{
	   $('.js_scroll').removeClass('up').addClass('down');
   }

});


$(document).ready(function(){
	AlignPopup();
	ClearPlaceholder();
	initsections();
	showNextPageBtn();
	initScrollSections();
	
	if(mobile){
		$('.section_video_wrapper').css('display','none');
		$('.mobile_video_block').css('display','block');
	}

	
	
/*-------------input mask*/
    if($(".js_phone_mask").length > 0){
         $(".js_phone_mask").mask("+7 (999) 999-99-99");
    }
/*-------------end input mask*/


/*-------------custom select-------------------*/
	$('.js_select select').styler({
		selectSearch:false
});
/*-------------custom select-------------------*/


/*-----------------------------POPUP-------------------------*/
$('[data-popup]').on('click', function(e){
	e.preventDefault();
	AlignPopup();
	InitPopup($(this));

});
$('.custom-overlay, .custom-popup .close, .js_close_popup').on('click',function(e){
	e.preventDefault();	
	$('.custom-overlay').delay(200).fadeOut('300');																		  
	$('.custom-popup').fadeOut('300');	
	if($('#video_src')){
		$('.mejs-pause').click();
		//$('#video_src').attr('src', '');
	}	

});
/*-------------END POPUP----------------------------*/


/*swiper sliders*/
$('.js_swiper').each(function(){
	var index = $(this).closest('.section').index();
	$(this).addClass('swiper_'+index);
	var swiper = new Swiper('.js_swiper.swiper_'+index+' .swiper-container', {
		slidesPerView: '1',
		spaceBetween: 0,
		loop: false,
		nextButton: '.js_swiper.swiper_'+index+' .js_swiper_next',
		prevButton: '.js_swiper.swiper_'+index+' .js_swiper_prev',
		mousewheelControl: false
	});
})
/*end swiper sliders*/

/*-------------validation-------------------*/
	$.validate({
	  form : '.js_validation',
		onSuccess : function() {
			$('.js_call_back_popup').fadeOut();
		    $('.js_message_popup').fadeIn();
		    return false;
        }
	});
	

/*-------------end validation-------------------*/


//do element has overflow content
$.fn.HasOverflowContent = function() {
    var _elm = $(this)[0];
    var _hasScrollBar = false; 
    if ((_elm.clientHeight < _elm.scrollHeight) || (_elm.clientWidth < _elm.scrollWidth)) {
        _hasScrollBar = true;
    }
    return _hasScrollBar;
}

$('.js_sections .section').each(function(index, element) {
	if($(this).HasOverflowContent()){
		$(this).addClass('fp-auto-height');
	}
});


/*go to top*/
$('.js_top').click(function(e){
	var section_first_href = $('.section:first-of-type').attr('id');
	$('body').scrollTo('#'+section_first_href, {duration:'slow', offset: -100});
	$('.section').removeClass('active');
	$('.section:first-of-type').addClass('active');
})
/*end go to top*/

/*get section bg color*/
$('.section').each(function(){
	var block = $(this);
	var content = $(this).find('.section_block');
	var background = $(this).css( "background-color" );
	var background_from = background.replace(')', ', 1)').replace('rgb', 'rgba');
	var background_to = background.replace(')', ', 0)').replace('rgb', 'rgba');
	var gradient_before = "<div class='gradient_before' style='background: linear-gradient(to bottom, "+background_from+" 0%,"+background_to+" 100%)'></div>";
	var gradient_after = "<div class='gradient_after' style='background: linear-gradient(to top, "+background_from+" 0%,"+background_to+" 100%)'></div>";
	content.append(gradient_before);
	content.prepend(gradient_after);
})

if($(window).width()<=800 || mobile){
	$('.gradient_before').css('display', 'none');
	$('.gradient_after').css('display', 'none');
}

/*end get section bg color*/




/*sections scroll next*/
$('.section:first-of-type').addClass('active');
sectionArr = [];
	$('.section').each(function(){
		sectionArr.push($(this).offset().top-100);
	});
$('.js_scroll').on('click', function(event){
	event.preventDefault();
	console.log('from top ',$(window).scrollTop());
	for(var i=0; i < sectionArr.length; i++){
		if($(window).scrollTop() < sectionArr[0]){
			$('body').scrollTo(sectionArr[1],'slow');
			break;
		}
		if($(window).scrollTop() >= sectionArr[i] && $(window).scrollTop() < sectionArr[i+1]){
			console.log(i);
			$('body').scrollTo(sectionArr[i+1],'slow');
			break;
		}
		if($(window).scrollTop() >= sectionArr[sectionArr.length-1]){
			$('body').scrollTo(sectionArr[0],'slow');
			break;
		}
	}	
})
/*end sections scroll next*/

/*set image width as a block width*/
function initBackgroundFixed(){
	var	bgSize = '70';
	if($('.js_img_src').length){
		var imgSrc = $('.js_img_src img').attr('src');
		$('.js_img_src').css({
			'background': 'url("'+imgSrc+'") no-repeat center',
			'background-size':'auto '+bgSize+'%',
			'background-position-y':'50px',
			'background-size':'cover'
		});
	}
	
	
	if($(window).width()<=800){
		$('.js_img_src img').css('display','block');
		$('.js_img_src img').css('width','100%');
	}
	else {
		$('.js_img_src img').css('display','none');
	}
	
}
initBackgroundFixed();
/*end set image width as a block width*/


});