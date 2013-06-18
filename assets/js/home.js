$(document).ready(function() {

	var OSName="Unknown OS";
	if (navigator.appVersion.indexOf("Win")!=-1) { 
          OSName="Windows"; 
          DLName = fileinfo['WIN32_RELEASE1_NAME'];
          downloadLink = fileinfo['WIN32_RELEASE1_URL'];
        }
	else if (navigator.appVersion.indexOf("Mac")!=-1) { 
          OSName="Mac OS X"; 
          DLName = fileinfo['MAC_RELEASE_NAME'];
          downloadLink = fileinfo['MAC_RELEASE_URL']; 
        }
	else if (navigator.appVersion.indexOf("X11")!=-1) { 
          OSName="Linux"; 
          DLName = fileinfo['MAC_RELEASE_NAME'];
          downloadLink = "downloads.html#linux"; 
        }
	else if (navigator.appVersion.indexOf("Linux")!=-1) {
          OSName="Linux"; 
          DLName = fileinfo['MAC_RELEASE_NAME'];
          downloadLink = "downloads.html#linux"; 
        }

	$("#home-download a#download-link").attr("href",downloadLink);
	$("#home-download-link h4").text(DLName + " " + OSName);
	
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
