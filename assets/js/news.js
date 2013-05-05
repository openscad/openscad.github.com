$(document).ready(function() {
	$("article section").each(function(){
		$('#sidebar ul').append("<li><a href='#"+$(this).attr("id")+"'>"+$(this).find(".title").text()+"</a></li>");
	});
});