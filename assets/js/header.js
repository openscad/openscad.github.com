var pageHeight = $(window).height();
$(document).ready(function() {
	
	$('.top').click(function(){$('body').scrollTo($('body'),700,{offset:{top:-20}});});

	$(".fancybox").fancybox();
	$(".gallery a").fancybox();
	
	$('.sticky').waypoint('sticky');
	
	$('#sidebar.sticky').parent().css('width',$("#sidebar.sticky").css('width'));

	$("a[href^='#']").click(function(e){e.preventDefault(); $('body').scrollTo($(this).attr('href'),1000, {offset:-20}); });

	$('section ul li').prepend("» ");	

});