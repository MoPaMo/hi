//4inArow copyright (c) Moritz Mockenhaupt 2020
var running
$(function () {
  running=true
  audioEnabled = true;
  player = true;
  var numberOf = 0;
  function victory(who) {
    running=false
    won = new Audio("confirmation_001.ogg");
    won.play();
    $("#won").modal();
    $("#whoWon").html(who == "a" ? "Blau" : "Rot");
    $(".modal-header").addClass(who == "a" ? "bg-primary" : "bg-danger");
    $("#numberZüge").html(numberOf + 1);
  }
  function gBP(i, id) {
    //getElementByPosition
    return $(".row:nth-child(" + i + ") .col:nth-child(" + id + ")");
  }
  function e(row, col) {
    return gBP(row + 1, col).attr("data-clicked");
  }
  $(".restart").click(function () {
    open("./index.html", "_SELF");
  });
  $(".col").attr("data-clicked", "f");
  function checkVictory() {
    //loop over rows
    /*
 row|-----|----|
    |-----|----|
    |-----|----|
    
    */
    for (var row = 1; row <= 5; row++) {
      for (var col = 1; col <= 8; col++) {
        if (e(row, col) != "f") {
          //field is set yet
          //horizontal check
          if (
            col < 6 &&
            e(row, col) == e(row, col + 1) &&
            e(row, col + 1) == e(row, col + 2) &&
            e(row, col + 2) == e(row, col + 3)
          ) {
            console.log(e(row, col) + " won in " + col + "," + row);

            gBP(row + 1, col).css("backgroundColor", "red");
            gBP(row + 1, col + 1).css("backgroundColor", "red");
            gBP(row + 1, col + 2).css("backgroundColor", "red");
            gBP(row + 1, col + 3).css("backgroundColor", "red");
            victory(e(row, col));
          }
          //vertical check
          if (
            row > 3 &&
            e(row, col) == e(row - 1, col) &&
            e(row - 1, col) == e(row - 2, col) &&
            e(row - 2, col) == e(row - 3, col)
          ) {
            console.log(e(row, col) + "won in" + col + "," + row);

            gBP(row + 1, col).css("backgroundColor", "red");
            gBP(row, col).css("backgroundColor", "red");
            gBP(row - 1, col).css("backgroundColor", "red");
            gBP(row - 2, col).css("backgroundColor", "red");
            victory(e(row, col));
            break;
          }
          //diagonal check 
          //  \
          //    \
          if (
            row < 3 &&
            col < 6 &&
            e(row, col) == e(row + 1, col + 1) &&
            e(row, col) == e(row + 2, col + 2) &&
            e(row, col) == e(row + 3, col + 3)
          ) {
            console.log(e(row, col) + "won in" + col + "," + row);

            gBP(row + 1, col).css("backgroundColor", "red");
            gBP(row + 2, col + 1).css("backgroundColor", "red");
            gBP(row + 3, col + 2).css("backgroundColor", "red");
            gBP(row + 4, col + 3).css("backgroundColor", "red");
            victory(e(row, col));
          }
          //vertical check row>3 col<6
          //   /
          // /
          if (
            row > 3 &&
            col < 6 &&
            e(row, col) == e(row - 1, col + 1) &&
            e(row, col) == e(row - 2, col + 2) &&
            e(row, col) == e(row - 3, col + 3)
          ) {
            console.log(e(row, col) + "won in" + col + "," + row);

            gBP(row +1, col).css("backgroundColor", "red");
            gBP(row , col + 1).css("backgroundColor", "red");
            gBP(row - 1, col + 2).css("backgroundColor", "red");
            gBP(row - 2, col + 3).css("backgroundColor", "red");
            victory(e(row, col));
          }
        }
      }
    }
  }

  $("#selectBar .col").click(function () {
    if(running){
    id = $(this).index() + 1;
    notbroken = true;
    for (var i = 6; i > 1; i--) {
      elem = $(".row:nth-child(" + i + ") .col:nth-child(" + id + ")");
      if (elem.attr("data-clicked") == "f") {
        $(".row:nth-child(" + i + ") .col:nth-child(" + id + ") img")
          .hide()
          .attr("src", player ? "a.png" : "b.png")
          .fadeIn();
        elem.attr("data-clicked", player ? "a" : "b");
        notbroken = false;
        break;
      }
    }
    if (!notbroken) {
      if (audioEnabled) {
        audio = new Audio("drop_002.ogg");
        audio.play();
      }
      if (checkVictory()) {
      } else {
        numberOf++;
        player = !player;
      }
    } //
    else {
      if (audioEnabled) {
        audio = new Audio("error_008.ogg");
        audio.play();
      }
    }}
  });
});
