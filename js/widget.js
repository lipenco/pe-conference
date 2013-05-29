


jQuery(function(){

  jQuery("#menu li").each(function() {
    if (jQuery(this).hasClass("current-menu-item")){
      elWidth=jQuery(this,"a").width();
      rnd=Math.round(elWidth/3);
      jQuery(this).addClass("size_"+rnd);
    }

  });

  jQuery(".banners .banner img").each(function() {

    h=jQuery(this).height();

    if (h<80) {
      p=(80-h)/2;
      jQuery(this).css('padding-top',p);
    }
    
  

  });




  jQuery('<li class="separator">\\</li>').insertAfter("#menu-footer-column-3>li:not(:last)");
  jQuery('<span> | </span>').insertAfter("#header_menu li:not(:last)");
  jQuery('<span> | </span>').insertAfter("#colophon .middle  li:not(:last)");
  

  jQuery(".footer .menu li:last-child").addClass('last');
  jQuery(".main-navigation li:first-child").addClass('first');

  jQuery("#front_slides").frontslideshow(5000);
  jQuery("#sidebar_slides").frontslideshow(3000); 



  jQuery(".scrollable").makeItScroll();
  
  
  jQuery(".main-navigation ul").centerAlign();
  
  
  
if (jQuery('a.video_link').length>0) {

jQuery("a.video_link").fancybox({
      'showNavArrows'  : 'false',
      'autoDimensions'  : 'false',
  
                  'padding'             : 15,
                  'autoScale'   : false,
      'titlePosition'        : 'inside',
 'titleFormat'       : function(title, currentArray, currentIndex, currentOpts) {
lastc='';
if (currentIndex+1==currentArray.length) {
lastc="last"; } 
return '<div id="fb_text"><span class="fancybox-title-inside">'+ jQuery(this).attr('title') +'</span><br><span id="fb-desc">'+currentArray[currentIndex].name+'</span></div><span id="fb-nav"><a class="fb_prev item_'+currentIndex +'" href="javascript:;" onclick="jQuery.fancybox.prev();" >Previous </a>&nbsp;&nbsp;|&nbsp;&nbsp;<a class="fb_next '+lastc+'" href="javascript:;" onclick="jQuery.fancybox.next();"> Next</a>'; }
                  , 'width'               : 640,
                  'height'              : 333,
                  'href'                : this.href,
                  'type'                : 'swf',    // <--add a comma here
                  'swf'                 : {'allowfullscreen':'true'} // <-- flashvars here
                

            }); 
}

  jQuery(".sponsors_box").pic_swap();
  jQuery("img[src$='purchase.png']").each(function(){
    
    var img = jQuery(this);
    var src = img.attr("src");
    var hover = src.split(".png")[0] + "_hover.png";
    var tmp = new Image();
    tmp.src = hover;
    
    img.hover(function(){
        
      jQuery(this).attr("src", hover);
    
    }, function(){
    
      jQuery(this).attr("src", src);
    
    });
    
    
  });


  
      jQuery(".show_all").toggle(function(){
        jQuery(".active_item .href .more").slideDown();
        jQuery(".active_item .href .toggle_1").css("display","block");
        jQuery(".active_item .href .toggle").show();
        jQuery(".active_item .href").addClass("active");
         jQuery("#program-controls .show_all").html('Hide all details');
      
    
      }, function() {
      jQuery(".active_item .href .more").slideUp();
      jQuery(".active_item .href .toggle_1").css("display","block");
      jQuery(".active_item .active").removeClass("active");
      jQuery(".active_item .href .toggle").hide();
      jQuery("#program-controls .show_all").html('Show all details');
      resize();

      
      });
  
      
  


jQuery('#register_box a').hover(
  function () {
      jQuery('#register_box span').css("color", "#007EC4");
  }, 
  function () {
    jQuery('#register_box span').css("color", "#666"); 
  }
);

jQuery('.sponsors .heading').prev().css('border-bottom', 'none');
jQuery("#menu-footer-column-3").find("li:last").addClass("last");
items2=jQuery("#menu-footer-column-3").find("li:not('.last')") ;

  items2.each(function(){
//jQuery(this).append(' |');
  });

  //jQuery("#menu-navigation").menu();
  
  jQuery("[flash]").each(function(){
    var obj = jQuery(this);
    
    obj.flash({
      swf : obj.attr("flash"),
      height : obj.height(),
      width : obj.width()     
    });
    
  });
  
  jQuery(".slideshow").slideshow();
  
  jQuery(".entry").accordion();
  
  jQuery("[href='#top']").click(function(ev){

    ev.preventDefault();
    
    jQuery('html, body').animate({scrollTop:0}, 'slow');
    
  });
});


function resize()  {
  var heightall = 1200;
  var sum=0;
  var object = jQuery(".day.active_item");
  heightall += object.height();
/*jQuery(".content").height(1200).delay(1000);
if (jQuery(".content").height()>=1200 )
{jQuery(".content").height("auto");
}*/
};


function tabs(){
  var o ={};
  o.main = jQuery(".sub_menu");
  o.menu = jQuery("#eventlist");
  o.mainTabs = jQuery(".sub_menu");
  o.pad = o.menu.find(".day");
  o.padactive = o.menu.find(".active_item");
  

  
  o.obj = o.main.find("a");

  classes();
  
  function classes(){
    o.mainTabs.find("a:first").addClass("first");
    o.mainTabs.find("a:last").addClass("last");
    o.mainTabs.find(".active_item").prev("a").addClass("pre_active");
    o.mainTabs.find("li:first").addClass("first");
    o.mainTabs.find("li:last").addClass("last");

  }
  
  if(!location.hash){location.hash = o.menu.find(".day:first").attr("url");o.pad.hide();o.padactive.show();}
  var $state = jQuery('#state'), $custom = jQuery('#custom'), $overloading = jQuery('#overloading');  
  jQuery.History.bind(function(state){
    $state.text(state);
    open_tab(state);
  });
  
  function open_tab( obj ){
    o.aTag = jQuery("a[href='#"+obj+"']");
    o.obj.removeClass();
    o.obj.parent().removeClass("active_item");
    o.aTag.addClass("active_item");
    o.aTag.parent().addClass("active_item");
    classes();
    o.pad.hide().removeClass("active_item");
    o.menu.find(".day[url='"+obj+"']").show().addClass("active_item");
    jQuery('#day').html(o.aTag.html());
    height2=o.menu.find(".day[url='"+obj+"']").height();
    //jQuery("#menus").css("height", 500);
  }
  
  
}

jQuery.fn.centerAlign = function(){
  
  var main = jQuery(this);
  var width = main.width();
  var marginleft = (1025-width)/2;
  
  main.css({
    
    marginLeft: marginleft
                
  }); 
  
};
  
  
jQuery.fn.pic_swap = function(){
  
  var main = jQuery(this);
  var box = main.find(".box");
  var img = box.find("a");
  var counter = 0;
  var speed = parseFloat(main.attr("speed"))*1000;
  
  loader();
  
  function loader(){
    box = main.find(".box").not("[rel='one_img']");
    box.not("[rel='one_img']").each(function(){
      
      var obj = jQuery(this);
      
      if( obj.attr("rel") == "one_img") {
        return;
      };
      
      var total_img = obj.find("a").size();
      var next = obj.find("a.active").next();
      
      if( next.size() == 0 ){
        
        next = obj.find("a:first");
        
      };
      
      var img = next.find("img");
      var src = img.attr("src");
      var tmp = new Image();
      var new_width, new_height;
      tmp.onload = function(){
        
        
        if( tmp.width >= next.width() || tmp.height >= next.height() ){
          
          var scale = tmp.width / (next.width() -10);
          new_width = tmp.width / scale;
          new_height = tmp.height / scale;
          
          next.find("span").text( new_width );
          
          if( new_height > next.height() ){
            
            scale = tmp.height / next.height() ;
            new_width = tmp.width / scale;
            new_height = tmp.height / scale;  
                      
          };
                    
          img.css({
            
            width: new_width,
            height: new_height
                        
          }); 
          
          
        };
        
        if( !new_width && !new_height ){
          
          new_width = tmp.width;
          new_height = tmp.height;
          
        };
        
        var left = (next.width() - new_width ) /2;
        var top = (next.height() - new_height ) /2;
        
        img.css({
            
            left: left,
            top: top
                        
          }); 
        
        obj.find(".active").fadeOut()
        obj.find(".active").removeClass("active");
              
        next.addClass("active");
        
        counter++;
        
        if( counter == box.size() ){
          counter = 0;
          box.find(".active").fadeIn();
          setTimeout(loader, speed);
          
        };
        
      };
      tmp.src = src;
      
      if( total_img == 1){
        
        obj.attr("rel", "one_img");
      };
      
    });
    
  };
  
};
jQuery.fn.accordion = function(){
  
  var all_more = jQuery(this).find(".more");
  var all_entry = jQuery(this);
  
  jQuery(this).hover(function(){
    var obj = jQuery(this);
    
    if(obj.is(".no_href")){ return false;}
    var title = obj.find(".title");
    
    if( obj.is(".logo") ){ return false; }
    obj.addClass("hover");
    
  }, function(){
    
    var obj = jQuery(this);
    if(obj.is(".no_href")){ return false;}
    var title = obj.find(".title");
    obj.removeClass("hover");
    
  });
  
  jQuery(this).each(function(){
    
    var obj = jQuery(this);
    if( obj.find(".more").html() ){
      obj.addClass("href");
    }
    else{
      obj.addClass("no_href");
    };
    
    var more = obj.find(".more");
    var toggle = obj.find(".toggle");
    var trigger = obj.find(".title");
     trigger.css("cursor", "pointer");

    
    trigger.click(function(){
      
      if( obj.is(".no_href") ){ return false; }
      
      if( obj.is(".active") ){
        if( toggle.html() ){
        
          obj.find(".title .toggle").hide().end().find("a").not(".toggle").show();
        
        };
        all_more.slideUp();
        jQuery(".toggle").hide();
        jQuery(".toggle_1").css("display","block");
        all_entry.removeClass("active");
        more.slideUp();
        obj.removeClass("active");
      resize();
      }
      else{
        if (obj.find(".title .toggle").is(":visible") )   {
        obj.addClass("active");
        more.slideUp();
        jQuery(".active .toggle_1").css("display","block");
        jQuery(".active .toggle").hide();

        } else {
      
        
        if( toggle.html() ){
        
          obj.find(".title a").hide().end().find(".toggle").show();
        
        };
        all_more.slideUp();
        jQuery(".toggle").hide();
        jQuery(".toggle_1").css("display","block");
        all_entry.removeClass("active");
        more.slideDown();
        obj.addClass("active");
        jQuery(".active .toggle_1").hide();
        jQuery(".active .toggle").css("display","block");
        
        } 
        resize();
      }
      
    }
    
    );
    
  });
  
};

jQuery.fn.makeItScroll = function(){
  var main = jQuery(this);
  var outer = main.find(".scroll");
  var timeout;
  var delay = 1500;
  var direction = 1;
  var next = main.parents(".widget_speakers:first").find(".next.browse");
  var prev = main.parents(".widget_speakers:first").find(".prev.browse");
  var flag = 0;
  var sidebar = jQuery(".widget_speakers:first");
  var again = 1;
  
  sidebar.bind("mouseenter", function(){
    clearTimeout( timeout );
    again = 0;
  });
  
  sidebar.bind("mouseleave", function(){
    again = 1;
    setTimer();
  });
  
  next.bind("click", function(){
    clearTimeout( timeout );
    if( flag == 1 ){ return false; }
    direction = 1;
    navigate();
  });
  
  prev.bind("click", function(){
    clearTimeout( timeout );
    if( flag == 1 ){ return false; }
    direction = -1;
    navigate();
  });
  
  
  function navigate(){
    flag = 1;
    if( direction == 1 ){
      var obj = outer.children("div:first");
      var clone = obj.clone();
      obj.wrap('<div class="personWrapper">');
      var parent = obj.parent();
      parent.animate({height: 0}, {queue:false, duration:500, easing:"linear", complete:function(){
        parent.remove();  
        flag = 0;
        if( again == 1 ){
          setTimer();
        };
      }});
      outer.append( clone );
    }else{
      var obj = outer.children("div:last");
      obj.wrap("<div class='personWrapper'>");
      
      var parent = obj.parent();
      parent.css("height", 0);
      var clone = parent.clone();
      
      parent.remove();
      
      
      outer.prepend( clone );
      
      var newObj= outer.children(".personWrapper").first();
      
      newObj.animate({height: 77}, {queue:false, duration:500, easing:"linear", complete:function(){
        newObj.children(".personScroll").unwrap();
        flag = 0;
        if( again == 1 ){
          setTimer();
        };
      }});
      
    };
    
  };
  
  function setTimer(){
    
    timeout = setTimeout(function(){
      if( direction == 1 ){
        next.trigger("click");
      }else{
        prev.trigger("click");
      };
    }, delay);
  };
  setTimer();
};

jQuery.fn.slideshow = function(){
  



  var obj = jQuery(this);
  var state = 0;
  var items = jQuery(".item");
  var total = items.size();
  
  var counter = 0;
  items.each(function(){
    counter++;
    jQuery(this).attr("count", counter);
  });
  
  obj.find("[href='next'], [href='prev']").click(function(e){
    
    e.preventDefault();
    if( jQuery(this).attr("href") == "prev"){
      state--;  
    }
    else{
      state++;
    };
    if(state > total){state = 1;}
    if(state < 1 ){ state = total;}
    navigate();
  });
  
  function navigate(){
    obj.find(".active_person").hide().removeClass("active_person");
    obj.find("[count='"+state+"']").fadeIn().addClass("active_person");
  };
  
  obj.find("[href='next']").trigger("click");
  
show=setInterval(function(){
      
    state++;
    if(state > total){state = 1;}
    if(state < 1 ){ state = total;}
    navigate();}, 
      4000);
  
jQuery('.slideshow').hover(
  function () {
      clearInterval(show);
  }, 
  function () {
    show=setInterval(function(){
      
    state++;
    if(state > total){state = 1;}
    if(state < 1 ){ state = total;}
    navigate();}, 
      4000);
  

}
  
);
}

jQuery.fn.frontslideshow = function(speed){
  



  var obj = jQuery(this);
  var state = 0;
  var items = obj.find('.slide');
  var total = items.size();
  
  var counter = 0;
  items.each(function(){
    counter++;
    jQuery(this).attr("count", counter);
  });
  

  
  function navigate(){
    obj.find(".active_slide").hide().removeClass("active_slide");
    obj.find("[count='"+state+"']").fadeIn().addClass("active_slide");
  };
  
  state++;
    if(state > total){state = 1;}
    if(state < 1 ){ state = total;}
    navigate();
  
show=setInterval(function(){
      
    state++;
    if(state > total){state = 1;}
    if(state < 1 ){ state = total;}
    navigate();}, 
     speed);
  

}


jQuery.fn.menu = function(){
  
  var menu = jQuery(this);
  var items = menu.find("a");
  var total = items.size();
  var width = 0;
  var max_width = 630-20;
  
  items.each(function(){
    
    width+= jQuery(this).outerWidth();
    
  });
  
  var divided = (max_width - width) / total;
  
  var counter = 0;
  
  items.each(function(){
    counter++;
    var obj = jQuery(this);
    width = obj.outerWidth();
    width+= divided;
    width = Math.floor(width);
    obj.css("width", width);
    
    if( counter == total ){
      
      width = 0;
      items.each(function(){
        width+= jQuery(this).outerWidth();        
      });
      
      var left_over = max_width - width;
      
      width = menu.find("a:last").width() + left_over;
      
       menu.find("a:last").css("width", width);
      
    };
    
    var output = '<span class="left">&nbsp;</span> <span class="right">&nbsp;</span>';
    obj.append( output );
  });
  
  menu.find("a:first .left").addClass("odd");
  //menu.find("a:last .right").remove();
    
};