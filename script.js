$(function () {
  $("body, html").css("backgroundImage",(
    localStorage.homeBgImage == undefined ||
    localStorage.homeBgImage == null ||
    localStorage.homeBgImage == ""
      ? "url(app/image/isle.jpg)"
      : "url("+localStorage.homeBgImage+")"));
      //localStorage.homeBgImage="app/image/beach.jpg"

      $(".app").click(function(){
          open("./"+$(this).attr("href"), "_SELF")
      })
});
