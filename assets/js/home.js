$(document).ready(function() {

	var OSName="Unknown OS";
	if (navigator.appVersion.indexOf("Win")!=-1) { OSName="Windows"; downloadLink = fileinfo['WIN32_RELEASE1_URL'];}
	if (navigator.appVersion.indexOf("Mac")!=-1) { OSName="Mac OS X"; downloadLink = fileinfo['MAC_RELEASE_URL']; }
	if (navigator.appVersion.indexOf("X11")!=-1) { OSName="Linux"; downloadLink = "downloads.html#linux"; }
	if (navigator.appVersion.indexOf("Linux")!=-1) { OSName="Linux"; downloadLink = "downloads.html#linux"; }

	$("#home-download a#download-link").attr("href",downloadLink);
	$("#home-download-link h4").append(OSName);
	
	var news, i;
	
	$.get('news.html', function(data) {
		$html      = $(data)
		$entries    = $html.find('article section');

		i=0;

		$entries.each(function(){
			$title    = $(this).find('.title').html();
			$date    = $(this).find('.date').html();
			$content    = $(this).find('.entry').html();
			$shortContent = jQuery.trim($content).substring(0, 150).split(" ").slice(0, -1).join(" ") + "...";
			if(i<3){
			$('#sidebar ul').append("<li style='padding-bottom:10px;'><strong><small>"+$date+"</small><strong><br/><a class='underline' href='news.html#"+$(this).attr("id")+"'>"+$title+"</a><br/><small>"+$shortContent+"</small></li>");				
			}
			i++;
		});
	}, "html");

	});
