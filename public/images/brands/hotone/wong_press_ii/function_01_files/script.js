$(function(){
	$('a[href^="#"]').click(function(){
		var speed = 500;
        var href= $(this).attr("href");
        var target = $(href == "#" || href == "" ? 'html' : href);
        var position = target.offset().top - 180;
        $("html, body").animate({scrollTop:position}, speed, "swing");
        return false;
    });
});

$(function() {
  $(".inview_up").on("inview", function(event, isInView) {
    if (isInView) {
    //表示領域に入った時
      $(this).addClass("fadeInUp");
    } else {
    //表示領域から出た時
    }
  });
});

$(function() {
  $(".inview_down").on("inview", function(event, isInView) {
    if (isInView) {
    //表示領域に入った時
      $(this).addClass("fadeInDown");
    } else {
    //表示領域から出た時
    }
  });
});

$(function() {
  $(".inview_left").on("inview", function(event, isInView) {
    if (isInView) {
    //表示領域に入った時
      $(this).addClass("fadeInLeft");
    } else {
    //表示領域から出た時
    }
  });
});

$(function() {
  $(".inview_right").on("inview", function(event, isInView) {
    if (isInView) {
    //表示領域に入った時
      $(this).addClass("fadeInRight");
    } else {
    //表示領域から出た時
    }
  });
});

$(function() {
  $(".inview_fade").on("inview", function(event, isInView) {
    if (isInView) {
    //表示領域に入った時
      $(this).addClass("fadeInFade");
    } else {
    //表示領域から出た時
    }
  });
});

$(function() {
  $(".inview_wide").on("inview", function(event, isInView) {
    if (isInView) {
    //表示領域に入った時
      $(this).addClass("fadeInWide");
    } else {
    //表示領域から出た時
    }
  });
});

// global menu
$(function() {
    $("#global_menu a").click(function(){ 
    $("#nav_btn").removeClass("active");
	$("#nav_btn_menu").removeClass("active");
	$("body").removeClass("active");
    });
});

$(function(){
    $(".btn_brand").click(function(){
	$(".global_menu_brand").fadeToggle("fast");
	$(".global_menu_dealer").fadeOut("fast");
	$(".global_menu_support").fadeOut("fast");
	$(".global_menu_aboutus").fadeOut("fast");
    });
});

$(function(){
    $(".btn_dealer").click(function(){
	$(".global_menu_dealer").fadeToggle("fast");
	$(".global_menu_brand").fadeOut("fast");
	$(".global_menu_support").fadeOut("fast");
	$(".global_menu_aboutus").fadeOut("fast");
    });
});

$(function(){
    $(".btn_support").click(function(){
	$(".global_menu_support").fadeToggle("fast");
	$(".global_menu_brand").fadeOut("fast");
	$(".global_menu_dealer").fadeOut("fast");
	$(".global_menu_aboutus").fadeOut("fast");
    });
});

$(function(){
    $(".btn_aboutus").click(function(){
	$(".global_menu_aboutus").fadeToggle("fast");
	$(".global_menu_brand").fadeOut("fast");
	$(".global_menu_dealer").fadeOut("fast");
	$(".global_menu_support").fadeOut("fast");
    });
});

$(function(){
    $(".btn_store").click(function(){
	$(".global_menu_brand").fadeOut("fast");
	$(".global_menu_dealer").fadeOut("fast");
	$(".global_menu_support").fadeOut("fast");
	$(".global_menu_aboutus").fadeOut("fast");
    });
});

$(function(){
    $(".btn_scroll").click(function(){
	$(".global_menu_brand").fadeOut("fast");
	$(".global_menu_dealer").fadeOut("fast");
	$(".global_menu_support").fadeOut("fast");
	$(".global_menu_aboutus").fadeOut("fast");
    });
});


// nav btn
$(function() {
    $("#nav_btn").click(function(){ 
    $("#nav_btn").toggleClass("active");
	$("body").toggleClass("active");
	$("#nav_btn_menu").toggleClass("active");
	$(".global_menu_brand").fadeOut("slow");
	$(".global_menu_dealer").fadeOut("slow");
	$(".global_menu_support").fadeOut("slow");
	$(".global_menu_aboutus").fadeOut("slow");
    });
});

// nav btn menu
$(function(){
   $(".nav_btn_accordion > dt").on("click",function(){
   $(this).next("dd").slideToggle();
   $(this).toggleClass("active");
   });
});

// News list
$(function(){
    $("#news1").click(function(){
	$("#news1").addClass("active");
	$("#news2, #news3, #news4").removeClass("active");
	$("#newsbox2, #newsbox3, #newsbox4").fadeOut("fast");
	$("#newsbox1").fadeIn("slow");
    });
});

$(function(){
    $("#news2").click(function(){
	$("#news2").addClass("active");
	$("#news1, #news3, #news4").removeClass("active");
	$("#newsbox1, #newsbox3, #newsbox4").fadeOut("fast");
	$("#newsbox2").fadeIn("slow");
    });
});

$(function(){
    $("#news3").click(function(){
	$("#news3").addClass("active");
	$("#news1, #news2, #news4").removeClass("active");
	$("#newsbox1, #newsbox2, #newsbox4").fadeOut("fast");
	$("#newsbox3").fadeIn("slow");
    });
});

$(function(){
    $("#news4").click(function(){
	$("#news4").addClass("active");
	$("#news1, #news3, #news2").removeClass("active");
	$("#newsbox1, #newsbox3, #newsbox2").fadeOut("fast");
	$("#newsbox4").fadeIn("slow");
    });
});


// Product Page
$(function(){
   $(".faq_accordion > dt").on("click",function(){
   $(this).next("dd").slideToggle();
   $(this).toggleClass("active");
   });
});

// Product Page
$(function(){
   $(".shop_accordion > dt").on("click",function(){
   $(this).next("dd").slideToggle();
   $(this).toggleClass("active");
   });
});

