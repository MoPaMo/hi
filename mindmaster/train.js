var day,
  trainToday,
  s,
  text,
  audioPlayed = false;
var gong = new Audio("gong.mp3");

$(function () {
  function countDown(time, cback) {
    let i = 0;

    let timecircle = $("#timetaste");
    timecircle.attr({
      opacity: 0.75,
      fill: "#afb56b",
    });
    timecircle.animate({ r: 38 }, time * 1000);
    text = s.text(50, 50, "…");
    let inter = setInterval(function () {
      $("#icon text").html(time - Math.floor(i));
      i++;
      if (i > time) {
        clearInterval(inter);
        timecircle.animate({ r: 0 }, 1000);
        setTimeout(function () {
          text.remove();

          if (localStorage.volume == true || localStorage.volume == "true")
            gong.play();
          cback();
        }, 1000);
      }
    }, 1000);
  }

  function training(iter) {
    loadTrain(trainToday[iter], function () {});
  }
  $("h1").click(function () {
    open("./", "_SELF");
  });
  function trainIter(iterator) {
    var transformer = Snap.selectAll(
      "svg#icon g *:not(.notremove), svg#icon path:not(.notremove)"
    );
    console.log(transformer);
    transformer.animate({ fill: "#000" }, 100);
    setTimeout(function () {
      transformer.animate({ opacity: 0 }, 100);

      setTimeout(function () {
        transformer.remove();
      }, 100);
    }, 100);
    if (iterator < trainToday.excersises.length) {
      let excs = gti(trainToday.excersises[iterator]);
      $("#trainname").html(excs.name);
      $("#traininfo").html(excs.info);
      let schnappp = Snap.parse(excs.svg);
      s.append(schnappp);
      if(!(excs.time != "confirm" && Number.isFinite(excs.time)))
      $("#clicktostart").html("Zum Beenden klicken")
      else
      $("#clicktostart").html("Zum Starten klicken")
      $("#clicktostart").animate({ bottom: "2vh" }, 100);
      $("body,html").click(function () {
        if (
          (localStorage.volume == true || localStorage.volume == "true") &&
          !audioPlayed
        ) {
          let audio = new Audio(
            Math.floor(Math.random() * 2) == 1 ? "audio.mp3" : "audio2.mp3"
          );
          audio.play();
          audioPlayed = true;
          console.log(audio);
        }
        $("body,html").off("click");
        $("#clicktostart").animate({ bottom: "-5rem" }, 100);

        if (excs.time != "confirm" && Number.isFinite(excs.time)) {
          //is time
          console.log(excs.name + " dauert " + excs.time);
          countDown(excs.time, function () {
            trainIter(iterator + 1);
          });
        } else {
          setTimeout(function () {
            trainIter(iterator + 1);
          }, 100);

          console.log(excs.name + " ist confirm");
        }
      });
    } else {
      $("body, html").fadeOut(function(){
      open("./index.html", "_SELF")})
    }
  }
  s = Snap("#icon");

  var bg = Snap.select("#bg-circ");
  bg.animate({ fill: "#B3876F" }, 1000);

  if (localStorage.mindStart == null) {
    localStorage.mindStart = moment().format("MM-DD-YYYY");
    day = Math.abs(
      moment(localStorage.mindStart, "MM-DD-YYYY").diff(moment(), "days")
    );
  } else {
    day = Math.abs(
      moment(localStorage.mindStart, "MM-DD-YYYY").diff(moment(), "days")
    );
  }

  console.log(
    "Tag: " + (1 * day + 1) + " von " + (1 * x.traindates.length)
  );
  trainToday = x.traindates[day];
  console.log(trainToday.name);
  trainIter(0);
});
