jQuery(document).ready(function () {
  
  var access_token = '183820786.467ede5.771880a32c584187b2e5dc16253a2139';
  var userId       = '183820786'; 
  var url          = 'https://api.instagram.com/v1/users/'+userId+'/media/recent/?access_token='+access_token+'&count=14&callback=?';
  var url2         = '';
  
  jQuery.ajax({
    url      : url,
    dataType : 'jsonp',
    success:function(instagram_data){
      console.log(instagram_data);
      var instagram_feed = _.map(instagram_data.data,function(data_instagram){  
        var data_obj = {
          'link'      : data_instagram.link,
          'image'     : data_instagram.images.low_resolution.url,
          'imageHigh' : data_instagram.images.standard_resolution.url
        };
        return data_obj;
      });
      url2 = instagram_data.pagination.next_url;
      var imgsCounter = 2;
      _.forEach(instagram_feed,function(img_feed){
        if(instagram_feed.indexOf(img_feed) === imgsCounter){
          jQuery('.box').append('<div class="item"><img src='+img_feed.imageHigh+' style="width:255.6px; height:255.6px; display:block; float:left;"></div>');
          imgsCounter = imgsCounter + 6;
        }else{
          jQuery('.box').append('<div class="item"><img src='+img_feed.image+' style="width:127.8px; height:127.8px; display:block; float:left;"></div>');
        }
      });
     },
     error:function(){
        alert("Error");
     },
  }); 

  jQuery('.loadMore').click(function(){
    jQuery.ajax({
    url      : url2,
    dataType : 'jsonp',
    success:function(instagram_data){
      console.log(instagram_data);
      var instagram_feed = _.map(instagram_data.data,function(data_instagram){  
        var data_obj = {
          'link'      : data_instagram.link,
          'image'     : data_instagram.images.low_resolution.url,
          'imageHigh' : data_instagram.images.standard_resolution.url
        };
        return data_obj;
      });
      url2 = instagram_data.pagination.next_url;
      var imgsCounter = 2;
      _.forEach(instagram_feed,function(img_feed){
        if(instagram_feed.indexOf(img_feed) === imgsCounter){
          jQuery('.box').append('<div class="item"><img src='+img_feed.imageHigh+' style="width:255.6px; height:255.6px; display:block; float:left;"></div>');
          imgsCounter = imgsCounter + 6;
        }else{
          jQuery('.box').append('<div class="item"><img src='+img_feed.image+' style="width:127.8px; height:127.8px; display:block; float:left;"></div>');
        }
      });
     },
     error:function(){
        alert("Error");
     },
    }); 
    setTimeout(function(){
      var $container = jQuery('.box');
      console.log('masonry');
      $container.masonry('reloadItems');
      $container.masonry();
    },1000)
  }); 

  setTimeout(function(){
      var $container = jQuery('.box');
      $container.masonry({
          itemSelector: '.item'
        });
    },2000)
});