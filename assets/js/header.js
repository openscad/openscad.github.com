var pageHeight = $(window).height();
$(document).ready(function() {

	$('.top').click(function(){$('body').scrollTo($('body'),700,{offset:{top:-20}});});

	$('.sticky').waypoint('sticky');

	$('#sidebar.sticky').parent().css('width',$("#sidebar.sticky").css('width'));

	// $("a[href^='#']").click(function(e){e.preventDefault(); $('body').scrollTo($(this).attr('href'),1000, {offset:-20}); });

	$('section ul li').prepend("» ");

	// Mode picker
	applyMode(getDisplayMode());
	$('#displayMode .currentMode').click(function () {
		$('#displayMode .pickMode').show();
	});
	$('#displayMode .pickMode li').click(function () {
		setDisplayMode(this.className);
		applyMode(this.className);
		$('#displayMode .pickMode').hide();
	});
});

function getDisplayMode() { return localStorage.getItem('mode') || 'system'; }
function setDisplayMode(mode) { localStorage.setItem('mode', mode); }
function modeToTheme(mode) {
	if (mode === 'light' || mode === 'dark') { return mode; }
	if (matchMedia('(prefers-color-scheme: light').matches) { return 'light'; }
	return 'dark';
}
function modeIconClasses(mode) {
	if (mode === 'light') { return "fa fa-sun"};
	if (mode === 'dark') { return "fa fa-moon"};
	return "fa fa-circle-half-stroke"
}
function applyMode(mode) {
	document.documentElement.dataset.appliedTheme = modeToTheme(mode);
	$('#displayMode .currentMode i').removeClass().addClass(modeIconClasses(mode));
}
