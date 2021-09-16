$(document).ready(function() {
  
  /*initialize */
  var id, title, url, image, image_thumb, image_preview, creator_name, creator_url;

  // static gallery coming from JSONP call already stored in page data
  var cnt = 0;
  for (var entry in _gallery) {
    cnt++;
    if (cnt > 32) break;
    e = _gallery[entry];
    $("#gallery").append(
      "<div id='static-" + e.id + "' class='gallery-links'>" +
      "<div class='img-container'>" +
      "<a href='" + e.public_url + "' target='_blank'>" +
      "<img src='" + e.thumbnail + "'/>" +
      "<h4>"+e.name+"</h4>" +
      "</a>" +
      "<h5>by <a href='" + e.creator.public_url + "' target='_blank'>" + e.creator.name + "</a></h5>" +
      "</div></a></div>");
  }

  /*retrieve data from openscad tag*/
  $.when($.getJSON('inc/thingiverse-gallery.json'), $.getJSON('inc/thingiverse-recent.json')).done(function(r1, r2) {
    var things = r1[0].concat(r2[0]);
    $.each(things, function(key, val) {
      id = val.id;
      title = val.name;
      url = val.public_url;
      creator_name = val.creator.name;
      creator_url = val.creator.public_url;
      image = val.thumbnail;
      image_thumb = image.replace("thumb_medium", "preview_large");
      image_preview = image.replace("thumb_medium", "preview_featured");

      if(key<32){

	$("#gallery").append("<div id='"+id+"' class='gallery-links'><div class='img-container'><a href='"+url+"' target='_blank'><img src='"+image_preview+"'/><h4>"+title+"</h4></a><h5>by <a href='"+creator_url+"' target='_blank'>"+creator_name+"</a></h5></div></a></div>");

      }
      
    });
  });
  
});
