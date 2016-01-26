$(document).ready(function() {
  var apikey = 'AIzaSyA1aGXRO8l4wMcX1iKk1GdahrhldB7Ydjw';
	/*initialize */
	var playlist_id, playlist_title, playlist_thumb, video_id, video_title, video_frame;
	/*retrieve playlist data from openscad user*/
	$.getJSON('https://www.googleapis.com/youtube/v3/playlists?part=id%2Csnippet&channelId=UCdchsMEauU6gmG_wC0ioluA&key=' + apikey, function(response) {
		$.each(response.items, function(key, val) {
		  var playlist_id = val.id;
		  var playlist_title = val.snippet.title;
		  var playlist_thumb = val.snippet.thumbnails.high.url;

			/*retrieve data from single playlist*/
			$.getJSON('https://www.googleapis.com/youtube/v3/playlistItems?part=id%2CcontentDetails%2Csnippet&playlistId=' + playlist_id + '&key=' + apikey, function(response) {
				$("#tutorials-video").append("<div id="+playlist_id+" class='tutorial-links multi'><div class='img-container'><img src='"+playlist_thumb+"' width='320' height='200'/></div><div class='text-container'><h2>"+playlist_title+"</h2></div></div>");
				/*append video titles*/
			  $.each(response.items, function(key, val) {
					video_id = val.contentDetails.videoId;
					video_title = val.snippet.title;
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
