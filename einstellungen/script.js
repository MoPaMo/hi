$(function(){
    $("#slider2").change(function(){
        localStorage.volume= $(this).val()
    })
    $("#slider2").val(localStorage.volume=="true"||localStorage.volume==true? "true":"false")
    $("#bg").change(function(){
        localStorage.homeBgImage= $(this).val()
    })
    $("#bg").val(localStorage.homeBgImage==undefined? "beach.jpg":localStorage.homeBgImage)
    $("#wiki-lang").change(function(){
        localStorage.wikiLang= $(this).val()
    })
    $("#wiki-lang").val(localStorage.wikiLang==undefined? "de":localStorage.wikiLang)

})