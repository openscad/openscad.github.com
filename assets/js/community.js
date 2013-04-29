$(document).ready(function() {

	$("#mailing-list-irc form").submit(function() {
	  var url = $(this).attr('action') + '?' + $(this).serialize();
	  $.get(url, function(r) {
	alert("success");
	  });
	  return false;
	});

	setTimeout(function(){
		document.title = 'OpenSCAD - Community';
	},2000);

});