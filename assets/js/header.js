/* <![CDATA[ */
    (function() {
        var s = document.createElement('script'), t = document.getElementsByTagName('script')[0];
        s.type = 'text/javascript';
        s.async = true;
        s.src = 'http://api.flattr.com/js/0.6/load.js?mode=auto';
        t.parentNode.insertBefore(s, t);
    })();
/* ]]> */

var pageHeight = $(window).height();
$(document).ready(function() {
	
	$('.top').click(function(){$('body').scrollTo($('body'),700,{offset:{top:-20}});});
	
	$('.sticky').waypoint('sticky');
	
	$('#sidebar.sticky').parent().css('width',$("#sidebar.sticky").css('width'));

	$("a[href^='#']").click(function(e){e.preventDefault(); $('body').scrollTo($(this).attr('href'),1000, {offset:-20}); });

	$('section ul li').prepend("» ");	

});