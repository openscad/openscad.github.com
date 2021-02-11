var pageHeight = $(window).height();
$(document).ready(function() {
	
	$('.top').click(function(){$('body').scrollTo($('body'),700,{offset:{top:-20}});});
	
	$('.sticky').waypoint('sticky');
	
	$('#sidebar.sticky').parent().css('width',$("#sidebar.sticky").css('width'));

});
