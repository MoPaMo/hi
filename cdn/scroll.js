 $(function(){
   
	 var lastScrollTop = 0, delta = 5;
	 $(window).scroll(function(){
		 var nowScrollTop = $(this).scrollTop();
		 if(Math.abs(lastScrollTop - nowScrollTop) >= delta){
		 	if (nowScrollTop > lastScrollTop){
		 		$("nav").css("opacity",0.2)
 
		 	} else {
		 		$("nav").css("opacity",1)

			}
		 lastScrollTop = nowScrollTop;
		 }
	 });
   setInterval(function(){ $("span.time-clock").html(moment().format("HH:mm")); }, 2000);
   if(localStorage.volume==true||localStorage.volume=="true"){
     $("nav .nav-vol").html('<i class="fas fa-volume-up"></i>')
   }else{
     console.log(localStorage.volume)
   }
 });