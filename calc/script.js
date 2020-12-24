$("#pad div").click(function () {
  $("#out").append($(this).attr("data-a"));
});
$("#calc").click(function () {
  $("#out").html(eval($("#out").html()));
});
$("#AC").click(function () {
  $("#out").html("0");
});
