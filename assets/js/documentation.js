$(document).ready(function() {

	/*initialize */
	var playlist_id, playlist_title, playlist_thumb, video_id, video_title, video_frame;
	/*retrieve playlist data from openscad user*/
	$.getJSON('https://gdata.youtube.com/feeds/api/users/openscad/playlists?v=2&alt=jsonc', function(response) {
		$.each(response.data.items, function(key, val) {
			var playlist_id = val.id;
			/*retrieve data from single playlist*/
			$.getJSON('https://gdata.youtube.com/feeds/api/playlists/'+playlist_id+'?v=2&alt=jsonc', function(response) {
				playlist_title = response.data.title;
				playlist_thumb = response.data.thumbnail.hqDefault;

				$("#tutorials-video").append("<div id="+playlist_id+" class='tutorial-links multi'><div class='img-container'><img src='"+playlist_thumb+"' width='320' height='200'/></div><div class='text-container'><h2>"+playlist_title+"</h2></div></div>");
				/*append video titles*/
			  $.each(response.data.items, function(key, val) {
					video_id = val.video.id;
					video_title = val.video.title;
					$("#"+playlist_id+" .text-container").append("<h3><span class='video_link link' id='"+video_id+"'>"+video_title+"</span></h3>");
			  });
					
				/*display video on click*/
				$(".video_link").click(function(){
					video_frame = '<iframe width="320" height="200" src="http://www.youtube.com/embed/'+$(this).attr("id")+'" frameborder="0" allowfullscreen></iframe>';
					$(this).parent().parent().parent().find(".img-container").html(video_frame);
					$(this).parent().parent().find(".current").removeClass("current");
					$(this).addClass("current");
				});
			});
		});			
	});

	$("a[href^='#']").click(function(e){e.preventDefault(); $('body').scrollTo($(this).attr('href'),1000, {offset:-20}); });

});