var pageHeight = $(window).height();
$(document).ready(function() {

	$('.top').click(function(){$('body').scrollTo($('body'),700,{offset:{top:-20}});});

	$('.sticky').waypoint('sticky');

	$('#sidebar.sticky').parent().css('width',$("#sidebar.sticky").css('width'));

	// $("a[href^='#']").click(function(e){e.preventDefault(); $('body').scrollTo($(this).attr('href'),1000, {offset:-20}); });

	$('section ul li').prepend("» ");

	// Mode picker
	setDisplayModeIcon(getDisplayMode());
	$('#displayMode .currentMode').click(function () {
		$('#displayMode .pickMode').show();
	});
	$('#displayMode .pickMode li').click(function () {
		changeMode(this.className);
		setDisplayModeIcon(this.className);
		$('#displayMode .pickMode').hide();
	});
});

function setDisplayModeIcon(mode) {
	let iconClass = "fa fa-circle-half-stroke";
	let title = "OS Default"
	if (mode === 'light') { iconClass = "fa fa-sun"; title = "Light Theme"; }
	else if (mode === 'dark') { iconClass = "fa fa-moon"; title = "Dark Theme";}
	$('#displayMode .currentMode i').removeClass().addClass(iconClass);
	$('#displayMode .currentMode').attr({title});
}
