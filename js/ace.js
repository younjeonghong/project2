$(function(){
	//ismobile
	if(!isMobile){
		$("body").addClass("fixed");   
	}

	//header
	let winW;
	let deviceStatus="";

	$("#menu > ul").hover(
		function(){
			if(deviceStatus == "pc") $("#header").addClass("active");
		},
		function(){
			if(deviceStatus == "pc") $("#header").removeClass("active");
		}
	);
	$("#menu > ul > li > a").focusin(function(){
		if(deviceStatus == "pc") $("#header").addClass("active");
	});
	$("#menu li:last-child li:last-child a").focusout(function(){
		if(deviceStatus == "pc") $("#header").removeClass("active");
	});

	$("#menu > ul > li > a").click(function(e){
		console.log("click");
		e.preventDefault();
		if(deviceStatus == "mobile") {
			if($(this).next("ul").is(":visible") == false){
				$("#menu > ul > li > a").next("ul").slideUp(300);
         		$(this).next("ul").slideDown(300);
			}
			else{
				$(this).next("ul").slideUp(300);
			}
			if($(this).parent().hasClass("active") == false){
				$("#menu > ul > li").removeClass("active");
				$(this).parent().addClass("active");
			}
			else{
				$(this).parent().removeClass("active");
			}
		}
	});

	//mobile tab

	$("#header .utils a.tab").click(function(e){
		e.preventDefault();
		$(this).toggleClass("active");
		$("#menu").toggleClass("active");
		$("#header").toggleClass("active2");
		$(".dim").toggleClass("active");
	});

	//mainslider
	var video1=document.getElementById("video1");
	var video2=document.getElementById("video2");
	var video3=document.getElementById("video3");

	video1.muted=true;
	video2.muted=true;
	video3.muted=true;
	video1.play();
	
	video1.addEventListener("ended", function(){
		video1.play();
	});
	video2.addEventListener("ended", function(){
		video2.play();
	});
	video3.addEventListener("ended", function(){
		video3.play();
	});

	var activeNum=0;

	var mainswiper = new Swiper(".mainSwiper", {
		speed: 1000,
		loop: true,
		pagination: {
			el: ".mainSwiper .swiper-pagination",
			clickable: true
		},
		on: {
			transitionEnd: function(){
				activeNum=this.activeIndex;
				
				if(activeNum == 0){
					video1.play();
					// video2.pause();
					// video3.pause();
				}
				else if(activeNum == 1) {
					video2.play();
					// video1.pause();
					// video3.pause();
				}
				else{
					video3.play();
					// video1.pause();
					// video2.pause();
				}
			}
		},
	});


	//edge_swiper
	var edgeswiper = new Swiper(".edgeSwiper", {
		direction: 'vertical',
		speed: 700,
		loop: true,
		autoplay: {
			disableOnInteraction: false,
			delay: 4000
		},
		on: {
			slideChange: function(){
				$("#bar").stop()
						.removeAttr("style")
						.css({width: 0})
						.animate({width: 120}, 4700);
			}
		},
	});
	$("#pause_play").click(function(e){
		e.preventDefault();
		if($(this).hasClass("play")){
			$(this).removeAttr("class");
			$(this).addClass("pause");
			$(this).text("pause");
			edgeswiper.autoplay.start();
		}
		else{
			$(this).removeAttr("class");
			$(this).addClass("play");
			$(this).text("play");
			edgeswiper.autoplay.stop();
		}
	});


	// page1_slider
	var swiper = new Swiper(".page1_Swiper", {
        slidesPerView: 4,
        spaceBetween: 0,
		loop : true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      });


	 //page2 subslider1
	 var swiper = new Swiper(".mySwiper2", {
		autoHeight : true,
		spaceBetween : 30,
		// loop : true,

        scrollbar: {
          el: ".swiper-scrollbar",
          hide: false,
        },
      });

	//mousewheel event
	var n=0; 
	var h; 
	var pos=0; 
	var timer=0; 
	var total=6;

	$(".wrap").mousewheel(function(e, delta){
		if($("html").is(":animated")) return;
		console.log(delta);

		if(delta > 0){
			if(n > 0){
				n-=1
			}

			if($("#header").hasClass("fixed") == false){
				$("#header").addClass("fixed");
				$("#header").css({top: -136})
						.delay(500)
						.animate({top: 0}, 300);
			}
		}
		else{
			if(n < total){
				n+=1;
			}

			if($("#header .top").hasClass("fixed") == true){
				$("#header .top").removeClass("fixed");
				$("#header .top").removeAttr("style");
			}
		}

		if(n != total){
			pos=n*h;		
		}
		else {
			pos=$(document).height()-$(window).height();
		}

		pos=n*h;
		
		$("html").animate({scrollTop: pos}, 800, function(){
			if(n == 0){
				$("#index").addClass("active");
			}
			else if(n == total){
			}
			else{
				$("#page"+n).addClass("active");
			}
		});
	});


	$(window).resize(function(){
		clearTimeout(timer);
		
		/*가로 리사이즈 플래그*/
		winW=window.innerWidth;
		if(winW > 1280){
			deviceStatus="pc";
		}
		else{
			deviceStatus="mobile";
		}

		/*모바일메뉴 리사이즈 ???*/
		if(deviceStatus == "pc"){
			$("#header .utils a.tab").removeClass("active");
			$("#menu").removeClass("active");
			$("#header").removeClass("active2");
			$("#menu ul ul").slideDown(300);
		}
		else{
			$("#menu ul ul").slideUp(300);
			$("#menu > ul > li").removeClass("active");
		}

		if(isMobile) return;

		timer=setTimeout(function(){
			h=$(window).height();
			pos=n*h;
			$("html").animate({scrollTop: pos}, 800);
		}, 100);
	});

	$(window).trigger("resize")
});