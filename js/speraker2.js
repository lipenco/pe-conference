var is_mobile = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|webOS)/);
var retina = window.devicePixelRatio > 1 ? true : false;

// Site Specific
$(document).ready(function(){

  $(this).scrollTop(0);

  $header = $('.header');
  $header_in = $('.header-image');
  $logo = $('.logo a');
  $logo_alt = $('.logo_alt a');
  
  header_in_margin_top = $('.content').css('margin-top').replace('px', '');
  
  if ($(".header-image").length)
    $(".header-image").backstretch($('.header-image').data('url'));
  
  // Delay Loading of Images
  $('img').each(function () {
    var src = $(this).attr('data-src');
    var retina_src = $(this).attr('data-src-retina');
    if (retina_src != undefined && retina) {
      $(this).attr('src', retina_src).show();
    }
    else if (src != null) {
      $(this).attr('src', src).show();
    }
  }); 
  
  $("#carousel").carouFredSel({
    items: 6,
    width:"100%",
    direction: "left",
    align: "center",
    padding: null,
    circular: true,
    infinite: true,
    responsive: false,
    items: {
      visible: 6
    },
    scroll: {
      items: 1
    },
    auto: {
      timeoutDuration: 15000, // 15 seconds
      delay: 15000 // 15 seconds
    }
  }, 
  {
    debug   : false,
    transition  : false,
    events    : {
      prefix      : "",
      namespace   : "cfs"
    },
    wrapper   : {
      element     : "div",
      classname   : "slides"
    },
    classnames  : {
      selected    : "selected",
      hidden      : "hidden",
      disabled    : "disabled",
      paused      : "paused",
      stopped     : "stopped"
    }
  });
  
  $(window).resize(function() {
    $('#carousel-wrapper').width($(window).width());
  }); 
  
  $(window).resize();
  
  // Calculate the tallest carousel item
  
  heights = [];
  
  $('#carousel').children('div').each(function() {
    h = $(this).height(); 
    heights.push(h);
  });
  
  tallest_carousel_item = Math.max.apply( Math, heights );
  
  $('.footer-wrapper').css('margin-top',tallest_carousel_item + 50);
  
  // Header Fade
  if(!is_mobile && !$('body').hasClass('speakers')) {
    $(window).scroll(function() { perform_wizardry(); });
  } else if (!is_mobile) {
    $(window).scroll(function() { perform_wizardry_speakers(); });
  }
  
  var $desc_div;
  var $current_desc_div_has_been_columnized = false;
  var $this_click_row;
  var $last_click_row;
  var $last_click_div;
  var $same_click = false;
  
  $('.speaker').live('click', function(){     
    
    // Check if a description div exists
    $desc_div = $('.speaker-description-container:visible').first();
    
    // What row is the current click in?
    $this_click_row = Math.floor($(this).index()/5);
    
    // Add classes for CSS
    $('.speaker').not(this).removeClass('selected');
    
    if ($(this).hasClass("selected")) {
      $(this).removeClass("selected");
      $desc_div.slideUp();
      resetPositions($this_click_row);
      $same_click = true;
    } else {
      $(this).addClass("selected"); 
    }
    
    // What is the description we will be using?
    $desc = $(this).children('.speaker-description').first().html();
    console.log($desc);
    
    // What is the speaker's id?
    $speaker_id = $(this).data('speaker-id');
    
    // We'll need the last item in the row
    if ($(this).hasClass('last')) {
      $last_item_in_row = this;
    } else {
      $last_item_in_row = $(this).nextAll('.last').first();   
    }
    
    // If it does, check if the new click is in the same row, if not, remove it and create a new one.
    
    // If it doesn't exist, create a new one.
    
    if ($($desc_div).length) {
      // Is it in the same row as the current click?
      if ($this_click_row == $last_click_row) {
        if ($same_click == false) {
          // Replace Content in existing div
          $desc_div.children('.speaker-description-inner').html($desc);
          calculatePositions($this_click_row);  
          $desc_div.find('.speaker-description-inner').columnize({doneFunc:function(){
            enlargeFirstLetter();
            calculatePositions($this_click_row);  
            console.log("CONTENT REPLACED");
          }});
          
        }       
      } else {
        // Remove this desc div, and create a new one.
        $desc_div.slideUp(function(){     
          $desc_div.find('.speaker-description-inner').css('opacity', 0);
          //calculatePositions($this_click_row);  
          resetPositions($this_click_row, function(){
            console.log("DONE RESETTING POSITIONS");
            $desc_div.find('.speaker-description-inner').html($desc); //($('<div class="speaker-description-container" id="speaker-description" style="display:none;"><div class="speaker-description-inner" id="speaker-description-inner-' + $speaker_id + '">' + $desc + '</div></div>'));
            
            $desc_div.insertAfter($last_item_in_row); 
            calculatePositions($this_click_row);            
            $desc_div.slideDown(function(){
              $desc_div.find('.speaker-description-inner').columnize({doneFunc:function(){
                calculatePositions($this_click_row);
              }});
              enlargeFirstLetter();
              $desc_div.find('.speaker-description-inner').css('opacity', 1);
            });
          });
          
          console.log("DIV IS IN A DIFFERENT ROW, REMOVING AND CREATING A NEW ONE");
        });
      }
    } else {
      // Create a new one
      $desc_div = $('<div class="speaker-description-container" id="speaker-description" style="display:none"><div class="speaker-description-inner" style="opacity:0" id="speaker-description-inner-' + $speaker_id + '">' + $desc + '</div></div>');
      $desc_div.insertAfter($last_item_in_row); 
      
      calculatePositions($this_click_row);
      $desc_div.slideDown(function(){       
        $desc_div.find('.speaker-description-inner').columnize({doneFunc:function(){
          calculatePositions($this_click_row);  
        }});
        enlargeFirstLetter();
        $desc_div.find('.speaker-description-inner').css('opacity', 1);
      });
      console.log("A DIV DOESN'T EXIST YET, CREATING ONE");
    }
    
    $last_click_row = $this_click_row;    
    $last_click_div = $desc_div;
  });  
 
  
  // Schedule Nav Links
  $('.schedule-nav-item-link').click(function(e){
    e.preventDefault();
    // Get Item   
    scroll_to_id = $($(this).attr('href'));
    
    $('html, body').animate({
         scrollTop: scroll_to_id.offset().top-375
     }, 1000);
    
    return false;
  })
  
  enlargeFirstLetterInContent();
  
});

function enlargeFirstLetter(){
  $('.speaker-description-inner').each(function(){      
    html = $(this).html().replace($(this).text().substr(0,1), '<span class="firstcharacter dontsplit">' + $(this).text().substr(0,1) + '</span>');
    $(this).html(html);
  }); 
}

function enlargeFirstLetterInContent(){
  $('.content').find('.double-border').each(function(){     
    
    first_p = $(this).nextAll('p').first();   
    
    if (first_p.length) {
      html = first_p.html().replace(first_p.text().substr(0,1), '<span class="firstcharacter dontsplit">' + first_p.text().substr(0,1) + '</span>');
      first_p.html(html);
    }
  }); 
}

function resetPositions($currentrow, callback) {
  var numDivs = $('.speaker').not('#speaker-description').length;
  $('.speaker').not('#speaker-description').animate({ marginTop: 0, paddingTop: 0, borderTopWidth: 0 }, 'fast', function(){   
    if( --numDivs > 0 ) return;
    console.log("callback called once");
    $('.footer-wrapper').animate({ marginTop: 0 });
    if (callback && typeof(callback) === "function") {
      callback();
    }
  });
  
  
}

function calculatePositions($currentrow) {
  //resetPositions($currentrow);
  // Get bottom position of tallest element
  $currentrowdivs = [];
  $nextrowdivs = [];
  $heights = [];
  
  $start = 0 + ($currentrow * 6);
  
  $end = 5 + ($currentrow * 6);
  
  for (i = $start; i <= $end; i++) {
    $currentrowdivs.push($($('.speaker').not('#speaker-description').get(i)));
  }
  
  $currentrowdivs.filter(function(e){return e});
  
  for (i = 0; i < $currentrowdivs.length; i++){
    $heights.push($($currentrowdivs[i]).height());
  }
  
  $heights = $heights.filter(function(e){return e});
  
  $tallest_item_height = Math.max.apply( Math, $heights );
  
  $tallest_item_div = $currentrowdivs[$heights.indexOf(Math.max.apply( Math, $heights ))];
  
  $oh = $tallest_item_div.offset();
  
  $('.speaker-description-container').css('top', $oh.top + $tallest_item_height + 50);
  
  $start_next = 0 + (($currentrow+1) * 5);
  
  $end_next = 5 + (($currentrow+1) * 5);
  
  for (i = $start_next; i <= $end_next; i++) {
    $nextrowdivs.push($($('.speaker').not('#speaker-description').get(i)));
  }
  
  var theDiv = $('#speaker-description');
  var totalHeight = theDiv.height();
  totalHeight += parseInt(theDiv.css("padding-top"), 10) + parseInt(theDiv.css("padding-bottom"), 10); //Total Padding Width
  totalHeight += parseInt(theDiv.css("margin-top"), 10) + parseInt(theDiv.css("margin-bottom"), 10); //Total Margin Width
  totalHeight += parseInt(theDiv.css("borderTopWidth"), 10) + parseInt(theDiv.css("borderBottomWidth"), 10); //Total Border Width
  
  for (i = 0; i < $nextrowdivs.length; i++){    
    $($nextrowdivs[i]).animate({ marginTop: totalHeight +90 }, 'fast');
  }
  
  $nextrowdivs = cleanArray($nextrowdivs);
  
  if ($nextrowdivs.length == 0) {
    // Last row, we need to adjust the footer
    console.log("RESIZED FOOTER");
    $('.footer-wrapper').animate({marginTop: totalHeight}); 
  }
  
}

function cleanArray(actual){
  var newArray = new Array();
  for(var i = 0; i<actual.length; i++){
      if ($(actual[i]).length){
        newArray.push(actual[i]);
    }
  }
  return newArray;
}

function getCurrentRow(div) {
  $currentrow = Math.ceil($(this).index()/5);
  if ($currentrow == 0) {
    $currentrow = 1;
  }
  
  return $currentrow;
}

function perform_wizardry() {

    window_scroll = $(this).scrollTop();

    var margin_top = parseInt((window_scroll/5)) + parseInt(header_in_margin_top);
    
    $header_in.css({
      'opacity' : 1-(window_scroll/300),
      'margin-top' : -window_scroll
    });
    
    $logo.css({
      'opacity' : 1-(window_scroll/300)
    });
    
    $logo_alt.css({
      'opacity' : 0+(window_scroll/300)
    });
    
    if (window_scroll > 40)
    {
      $('.navigation-wrapper').css('position','fixed');
      $('.navigation-wrapper').css('top',0);
    } else {
      $('.navigation-wrapper').css('position','absolute');
      $('.navigation-wrapper').css('top',40);
    }
    
    if (window_scroll > 300)
    {
      $('.navigation-wrapper').css('background-color','#F7F5E2');
      $('.navigation-wrapper').css('box-shadow', '0 4px 2px -2px #999');
      
      if($.browser.msie){
        if(parseFloat($.browser.version) < 9){
          //Versions of IE less than 8
          $('.navigation-wrapper').css('border-bottom', '1px solid black');
        }
      }     
    } else {
      $('.navigation-wrapper').css('border-top', '0');
      $('.navigation-wrapper').css('background-color','transparent');
      $('.navigation-wrapper').css('box-shadow', 'none');
      $('.navigation-wrapper').css('border', 'none');
    }
}

function perform_wizardry_speakers() {

    window_scroll = $(this).scrollTop();

    var margin_top = parseInt((window_scroll/6)) + parseInt(header_in_margin_top);
    
    if (window_scroll > 40)
    {
      $('.navigation-wrapper').css('position','fixed');
      $('.navigation-wrapper').css('top',0);
    } else {
      $('.navigation-wrapper').css('position','absolute');
      $('.navigation-wrapper').css('top',40);
    }
    
    if (window_scroll > 150)
    {
      $('.navigation-wrapper').css('background-color','#F7F5E2');
      $('.navigation-wrapper').css('box-shadow', '0 4px 2px -2px #999');
      
      if($.browser.msie){
        if(parseFloat($.browser.version) < 9){
          //Versions of IE less than 8
          $('.navigation-wrapper').css('border-bottom', '1px solid black');
        }
      }
      
    } else {
      $('.navigation-wrapper').css('border-top', '0');
      $('.navigation-wrapper').css('background-color','transparent');
      $('.navigation-wrapper').css('box-shadow', 'none');
      $('.navigation-wrapper').css('border', 'none');
    }
}