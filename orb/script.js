function r(a, speak = null) {
  $(".chat-main").append(
    '<div><span class="speech-bubble bot">' + a + "</span></div>"
  );
  if (
    (localStorage.volume == true || localStorage.volume == "true") &&
    "speechSynthesis" in window
  ) {
    var msg = new SpeechSynthesisUtterance();
    msg.text = speak != null ? speak : a;
    msg.lang = "de";
    window.speechSynthesis.speak(msg);
  } else {
    console.log("Speech unsuppored");
  }
  $(".chat-main").animate(
    {
      scrollTop: $(".speech-bubble:last").offset().top,
    },
    800 //speed
  );
}
function rm(txt, a) {
  return txt.split(a).join("");
}
//setInterval(function(){
//$(".date-clock").html( moment().format("HH:mm:ss"))
//))}, 500);
//Was ist am 2020-01-01
var dateList = [
  { a: "Neujahrstag", datum: "01-01", b: false },
  { a: "Frauentag", datum: "03-08", b: false },
  { a: "Karfreitag", datum: "04-10", b: false },
  { a: "Ostermontag", datum: "03-28", b: false },
  { a: "Tag der Arbeit", datum: "05-01", b: false },
  { a: "Christi Himmelfahrt", datum: "05-21", b: false },
  { a: "Pfingstmontag", datum: "06-01", b: false },
  { a: "Tag der Deutschen Einheit", datum: "10-03", b: false },
  { a: "1. Weihnachtstag", datum: "12-25", b: false },
  { a: "2. Weihnachtstag", datum: "12-26", b: false },
];
function rnd(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function get(string, test) {
  return string.match(test);
}
var preSaid = [];
$(function () {
  $("#quest").click(function(){
    r(
      "Hier sind ein Paar Beispiele für Fragen:<br/><marquee>Wie viel Uhr ist es - Bin ich online - Was singen die Beatles in Yesterday - Was ist ein Tamburin - Wie ist das Wetter in London - Was ist 3 modulo 2 - Sag mir eine Zahl zwischen 1 und 34</marquee>",
      "Hier sind ein Paar Beispiele für Fragen"
    );
  })
  function m(string, test) {
    //shortcut for regex.test()
    return test.test(string);
  }
  function pc(exp, splitI = true) {
    let preSaidBroken = false;
    for (it of preSaid) {
      if (
        m(splitI ? it.split("!").join("").split("?").join("").trim() : it, exp)
      ) {
        preSaidBroken = true;
        break;
      }
    }
    return preSaidBroken;
  }
  function p(exp, splitI = true) {
    let preSaidBroken = false;
    let it = preSaid[preSaid.length-1]
    console.log(it)
    console.log(preSaid)

      if (
        m(splitI ? it.split("!").join("").split("?").join("").trim() : it, exp)
      ) {
        preSaidBroken = true;
       
    }
    return preSaidBroken;
  }
  function aw(a) {
    var f = a.split("!").join("");
    f = f.split("?").join("");
    f = f.trim();
    if (m(f, /^(Hallo|Hi|Guten Tag)$/i)) {
      r(
        rnd([
          "Hallo",
          "Hi",
          "Hi!",
          "Hallo!",
          "Guten Tag",
          "Guten Tag!",
          "Ich grüße dich",
        ])
      );
    } else if (
      m(f, /^(Wie geht's dir| Wie gehts|wie geht's|wie gehts dir)$/i)
    ) {
      r(rnd(["Gut, danke", "Mir geht's gut", "Mir geht's gut, danke", "gut"]));
      r(rnd(["Und dir?", "Und wie geht's dir?"]));
    } else if (
      m(f, /^Gut$/i) &&
      p(/^(Wie geht's dir| Wie gehts|wie geht's|wie gehts dir)$/i)
    ) {
      r("Das freut mich");
    } else if (
      m(f, /^(nein)$/i)
    ) {
     r("Doch")
    } else if (
      m(f, /^oh$/i) &&
      p(/^(nein)$/i)
    ) {r('<i class="fas fa-grin-squint-tears"></i>', "hahaha")}
    else if (m(f, /^Wie heißt du$/i)) {
      r(rnd(["Ich heiße Orb", "Ich bin Orb"]));
    } else if (m(f, /^wer bist du$/i)) {
      r(
        rnd([
          "Ich heiße Orb. Ich bin dein persönlicher Assistent.",
          "Ich bin Orb, dein persönlicher, digitaler Assistent.",
        ])
      );
    } else if (m(f, /^(Suche nach|Google nach|Eciosia nach) (.*)$/i)) {
      let mat = get(f, /^(Suche nach|Google nach|Eciosia nach) (.*)$/i);
      r(
        '<a href="https://ecosia.org/search?q=' +
          mat[2] +
          '" target="search">Hier ist deine Suche</a>',
        rnd(["Klicke auf den Link, um zu suchen", "HIer ist deine Suche"])
      );
    } else if (m(f, /^(Willst du mich heiraten|heirate mich)$/i)) {
      r(rnd(["Ähm…   Nööööööööö"]))
    }
    else if (
      m(f, /^(erzähl mir einen Witz|witz|lustiges erzählen|sag was lustiges)$/i)
    ) {
      let rando = Math.floor(Math.random() * 7);
      switch (rando) {
        case 1:
          r("Was passiert wenn man Cola und Bier zusammen trinkt?");
          r("Man colabiert!");
          break;
        case 2:
          r(
            "Deine Uhr ist runtergefallen, du darfst sie aber nicht wieder aufheben."
          );
          r("Warum?");
          setTimeout(function () {
            r("Du hast kein Uhrheberrecht");
          }, 3000);
          break;
        case 3:
          r("Was findet man beim Kannibalen in der Dusche?");
          setTimeout(function () {
            r("Head And Shoulders");
          }, 3000);
          break;
        case 4:
          r("Ect nur opfer bei mir auf der Arbeit!");
          setTimeout(function () {
            r("- Werner, 57, Unfallchirurg", "Werner, 57, Unfallchirurg");
          }, 3000);
          break;
        case 5:
          r("Was macht ein Clown im Büro?");
          setTimeout(function () {
            r("Faxen");
          }, 2000);
          break;
        case 6:
          r("Wie heißt ein ritter ohne Rüstung?");
          setTimeout(function () {
            r("Willhelm");
          }, 2000);
          break;
        case 7:
          r(
            "Deine Uhr ist runtergefallen, du darfst sie aber nicht wieder aufheben."
          );
          r("Warum?");
          setTimeout(function () {
            r("Du hast kein Uhrheberrecht");
          }, 3000);
          break;
        case 0:
          r(
            "Deine Uhr ist runtergefallen, du darfst sie aber nicht wieder aufheben."
          );
          r("Warum?");
          setTimeout(function () {
            r("Du hast kein Uhrheberrecht");
          }, 3000);
          break;
      }
    } else if (m(f, /^(Bist du real)$/i)) {
      r("Ach, was heißt schon real…");
    } else if (m(f, /^(Bist du ein roboter|lebst du| bist du menschlich)$/i)) {
      r("Ich bin Orb, eine künstliche Unintellignez");
    } else if (m(f, /^Du bist (doof|blöd)$/i)) {
      r("Selber");
    } else if (m(f, /^(Ich mag dich nicht|ich hasse dich)$/i)) {
      r('<i class="fas fa-sad-tear></i>', "Oh");
    } else if (m(f, /^(Kopf oder zahl)$/i)) {
      console.log(1 * Math.random());
      let n = Math.random() >= 0.5 ? "Kopf" : "Zahl";
      r((n == "Kopf" ? "" : "") + n, n);
    } else if (
      m(
        f,
        /^(was kannst du|Was kann ich dich fragen|Was kann ich dich fragen)$/i
      )
    ) {
      r(
        "Hier sind ein Paar Beispiele für Fragen:<br/><marquee >Wie viel Uhr ist es - Bin ich online - Was singen die Beatles in Yesterday - Was ist ein Tamburin - Wie ist das Wetter in London - Was ist 3 modulo 2 - Sag mir eine Zahl zwischen 1 und 34</marquee>",
        "Hier sind ein Paar Beispiele für Fragen"
      );
    } else if (
      m(
        f,
        /^(Bin ich online|Bin ich mit dem internet verbunden|hab ich wlan)$/i
      )
    ) {
      if (navigator.onLine) {
        r(
          '<i class="fas fa-wifi"></i> ' +
            rnd(["Ja, du bist online", "Du bist online"]),
          rnd(["Ja, du bist online", "Du bist online"])
        );
      } else {
        r(
          '<span class="fa-layers fa-fw"><i class="fas fa-wifi" style="color:Tomato"></i><i class="fa-inverse fas fa-times" data-fa-transform="shrink-6"></i></span> Nö. <br/> Das heißt übrigens auch, dass du Funktionen wie Wetter und Liedtext nicht nutzen kannst…',
          "Nö"
        );
      }
    } else if (
      m(
        f,
        /^(Können wir ein Spiel spielen|Lass uns ein Spiel spielen|Spiel|spielen)$/i
      )
    ) {
      r(
        'Alles klar. Ich habe verschiedene spiele im Angebot, beispielsweise <a href="../hangman">Hangman</a>'
      );
    } else if (m(f, /^(Wie viel Uhr ist es|Wie spät ist es)$/i)) {
      r(
        'Es ist <span class="time-clock">' +
          moment().format("HH:mm") +
          "</span>",
        "Es ist " + moment().format("HH:mm")
      );
    } else if (m(f, /^(Welcher Tag ist heute|Welches Datum ist heute)$/i)) {
      r("Heute ist der " + moment().format("Do MMMM YYYY"));
    } else if (
      m(f, /^((Schalte|Mach) den Ton an| Ton (anmachen|anschalten))$/i)
    ) {
      localStorage.volume = true;
      $("nav .nav-vol").html('<i class="fas fa-volume-up"></i>');
      r(
        '<i class="fas fa-volume-up"></i> Alles klar, der Ton ist jetzt an',
        "Alles klar, der Ton ist jetzt an"
      );
    } else if (
      m(f, /^((Schalte|Mach) den Ton aus| Ton (ausmachen|ausschalten))$/i)
    ) {
      localStorage.volume = false;
      $("nav .nav-vol").html('<i class="fas fa-volume-mute"></i>');
      r(
        '<i class="fas fa-volume-mute"></i>  Alles klar, der Ton ist jetzt aus',
        "Alles klar, der Ton ist jetzt aus"
      );
    } else if (m(f, /^Was ist am \d\d. \d\d.$/i)) {
      var mat = get(f, /^Was ist am (\d\d. \d\d.)$/i)[1];
      mat = moment(mat, "MM. DD");
      mat = mat.format("MM-DD");
      var broken = false;
      for (var i of dateList) {
        if (i.datum == mat) {
          r(i.a);
          broken = true;
          break;
        }
      }
      if (!broken) {
        r("nicht gefunden");
      }
    } else if (m(f, /^Was ist am \d{1,2}. \w*$/i)) {
      var mat = get(f, /^Was ist am (\d{1,2}. \w*)$/i)[1];
      mat = moment(mat, "MM. DDDD");
      mat = mat.format("MM-DD");
      var broken = false;
      for (var i of dateList) {
        if (i.datum == mat) {
          r(i.a);
          broken = true;
          break;
        }
      }
      if (!broken) {
        r("Ich ");
      }
    } else if (m(f, /^Wann ist \w*$/i)) {
      var mat = get(f, /^Wann ist (\w*)$/i)[1].toLowerCase();
      var broken = false;
      for (var i of dateList) {
        if (i.a.toLowerCase() == mat) {
          r(i.datum);
          broken = true;
          break;
        }
      }
      if (!broken) {
        r("nicht gefunden");
      }
    } else if (m(f, /^Was sing(en|t) (die |the |)(\w*) in ([\w \d]*)$/i)) {
      let mat = get(f, /^Was sing(en|t) (die |the |)(\w*) in ([\w \d]*)$/i);
      if (navigator.onLine) {
        r('Moment, ich lade den Text von "lyrics.ovh"…');
        $.getJSON(
          "https://api.lyrics.ovh/v1/" +
            encodeURIComponent(mat[3]) +
            "/" +
            encodeURIComponent(mat[4]),
          function (data) {
            r(data.lyrics.split("\n\n").join("\n").split("\n").join("<br/>"));
          }
        );
      } else {
        r(
          rnd([
            "Ich konnte keinen Verbindung zum Internet herstellen",
            "Du bist offline",
          ])
        );
      }
    } else if (m(a, /^Wie ist das Wetter in (.*)$/i)) {
      r(
        "Wetter für " +
          get(a, /^Wie ist das Wetter in (.*)$/i)[1] +
          " wird geladen…"
      );
      try {
        //if(data.contents!="[]"){
        $.getJSON(
          "https://api.allorigins.win/get?url=" +
            encodeURIComponent(
              "https://www.metaweather.com/api/location/search/?query=" +
                encodeURIComponent(get(a, /^Wie ist das Wetter in (.*)$/i)[1])
            ),
          function (data) {
            if (data.contents != "[]") {
              console.log(data);
              $.ajax({
                url:
                  "https://api.allorigins.win/get?url=" +
                  encodeURIComponent(
                    "https://www.metaweather.com/api/location/" +
                      JSON.parse(data.contents)[0]["woeid"]
                  ),
                success: function (data2) {
                  console.log(JSON.parse(data2.contents));
                  var response = JSON.parse(data2.contents);

                  switch (response.consolidated_weather[0].weather_state_abbr) {
                    case "sn":
                      r(
                        '<i class="fsa fa-snowflake"></i> In ' +
                          response.title +
                          ", " +
                          response.parent.title +
                          " schneit es bei " +
                          response.consolidated_weather[0].the_temp +
                          "°C grade"
                      );
                      break;
                    case "sl":
                      r(
                        '<i class="fsa fa-snowflake"></i> In ' +
                          response.title +
                          ", " +
                          response.parent.title +
                          " graupelt es bei " +
                          response.consolidated_weather[0].min_temp +
                          " bis " +
                          response.consolidated_weather[0].max_temp +
                          " grade"
                      );
                      break;

                    case "h":
                      r(
                        '<i class="fas fa-cloud-showers-heavy"></i> In ' +
                          response.title +
                          ", " +
                          response.parent.title +
                          " hagelt es bei " +
                          response.consolidated_weather[0].the_temp +
                          "°C grade"
                      );
                      break;

                    case "t":
                      r(
                        '<i class="fas fa-bolt"></i> In ' +
                          response.title +
                          ", " +
                          response.parent.title +
                          " donnert bei " +
                          response.consolidated_weather[0].the_temp +
                          "°C es grade"
                      );
                      break;
                    case "hr":
                      r(
                        '<i class="fas fa-cloud-showers-heavy"></i> In ' +
                          response.title +
                          ", " +
                          response.parent.title +
                          " regnet bei " +
                          response.consolidated_weather[0].the_temp +
                          "°C es grade"
                      );
                      break;
                    case "lr":
                      r(
                        '<i class="fas fa-cloud-rain"></i> In ' +
                          response.title +
                          ", " +
                          response.parent.title +
                          " regnet es bei " +
                          response.consolidated_weather[0].the_temp +
                          "°C ein wenig."
                      );
                      break;
                    case "s":
                      r(
                        '<i class="fas fa-cloud-rain"></i> In ' +
                          response.title +
                          ", " +
                          response.parent.title +
                          " gibt es bei " +
                          response.consolidated_weather[0].the_temp +
                          "°C grade einen kleinen Schauer."
                      );
                      break;
                    case "hc":
                      r(
                        '<i class="fas fa-cloud"></i> In ' +
                          response.title +
                          ", " +
                          response.parent.title +
                          " ist es bei " +
                          response.consolidated_weather[0].the_temp +
                          "°C sehr bewölkt"
                      );
                      break;
                    case "lc":
                      r(
                        '<i class="fas fa-cloud-sun"></i> In ' +
                          response.title +
                          ", " +
                          response.parent.title +
                          " ist es bei " +
                          response.consolidated_weather[0].the_temp +
                          "°C leicht bewölkt"
                      );
                      break;
                    case "c":
                      r(
                        '<i class="fas fa-sun"></i> In ' +
                          response.title +
                          ", " +
                          response.parent.title +
                          " ist bei " +
                          response.consolidated_weather[0].the_temp +
                          "°C klares Wetter",
                        "In " +
                          response.title +
                          ", " +
                          response.parent.title +
                          " ist bei " +
                          response.consolidated_weather[0].the_temp +
                          "°C klares Wetter"
                      );
                      break;
                    default:
                      r(
                        '<i class="fas fa-cloud-meatball"></i> Wolkig mit Aussicht auf Fleischbällchen',
                        " Wolkig mit Aussicht auf Fleischbällchen"
                      );
                  }
                  r(
                    "Wetter von <a href='https://www.metaweather.com/api/'>MetaWeather</a>"
                  );
                },
              });
            } else {
              r(
                "Leider konnte ich " +
                  get(a, /^Wie ist das Wetter in (.*)$/i)[1] +
                  " nicht finden. Bitte beachte, dass alle Namen auf Englisch geschrieben sein müssen…"
              );
            }
          }
        );
      } catch (e) {
        //console.log(e)
      }
    } else if (m(a, /^Sag mir eine Zahl zwischen (\d+) und (\d+)$/i)) {
      var mat = get(a, /^Sag mir eine Zahl zwischen (\d+) und (\d+)$/i);
      let rand =
        Math.floor(Math.random() * (parseInt(mat[2]) - parseInt(mat[1]) + 1)) +
        parseInt(mat[1]); //Math.floor(Math.random() * 16) + 5;
      r(rand);
    } else if (m(f, /^Was ist (\d+) plus (\d+)$/i)) {
      let mat = get(f, /^Was ist (\d+) plus (\d+)$/i);

      r("Das sollte " + 1 * (1 * mat[1] + 1 * mat[2]) + " sein");
    } else if (m(f, /^Was ist (\d+) minus (\d+)$/i)) {
      let mat = get(f, /^Was ist (\d+) minus (\d+)$/i);

      r("Das sollte " + 1 * (1 * mat[1] - 1 * mat[2]) + " sein");
    } else if (m(f, /^Was ist (\d+) mal (\d+)$/i)) {
      let mat = get(f, /^Was ist (\d+) mal (\d+)$/i);

      r("Das sollte " + 1 * (1 * mat[1] * 1 * mat[2]) + " sein");
    } else if (m(f, /^Was ist (\d+) durch (\d+)$/i)) {
      let mat = get(f, /^Was ist (\d+) durch (\d+)$/i);

      r("Das sollte " + 1 * (mat[1] / mat[2]) + " sein");
    } else if (m(f, /^Was ist (\d+) hoch (\d+)$/i)) {
      let mat = get(f, /^Was ist (\d+) hoch (\d+)$/i);

      r("Das sollte " + 1 * mat[1] ** mat[2] + " sein");
    } else if (m(f, /^Was ist (\d+) mod (\d+)$/i)) {
      let mat = get(f, /^Was ist (\d+) mod (\d+)$/i);

      r("Das sollte " + 1 * (mat[1] % mat[2]) + " sein");
    } else if (m(f, /^Was ist (\d+) modulo (\d+)$/i)) {
      let mat = get(f, /^Was ist (\d+) modulo (\d+)$/i);

      r("Das sollte " + 1 * (mat[1] % mat[2]) + " sein");
    } else if (m(f, /^ Ist (\d+) eine Primzahl$/i)) {
      r("Das sollte  sein");
    } else if (
      m(
        f,
        /^(spiele|lade) (coole|epische)( musik|n sound|n sountrack)(| von spotify)$/i
      )
    ) {
      r("Coole Musik wird geladen…");
      r(
        '<iframe src="https://open.spotify.com/embed/track/3QMozI3U5p1BDf7LGB6dan" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>',
        "von Spotify"
      );
    } else if (m(a, /^(Was|Wer) ist (ein|eine|)(.+)$/i)) {
      let q = get(a, /^(?:Was|Wer) ist (?:ein|eine|)(.+)$/i)[1];
      console.log(q);
      r("Laut Wikipedia");
      if (navigator.onLine) {
        $.getJSON(
          "https://"+(localStorage.wikiLang==undefined ? "de":localStorage.wikiLang)+".wikipedia.org/w/api.php?callback=?",
          {
            srsearch: q,
            action: "query",
            list: "search",
            format: "json",
          },
          function (data) {
            console.log(data);
            //$.each(data.query.search, function(i, item) {
            let item = data.query.search[0];
            console.log(item);
            r(
              "<div><a href='https://en.wiktionary.org/wiki/" +
                encodeURIComponent(item.title) +
                "'>" +
                item.title +
                "</a> : " +
                item.snippet +
                '<a href="https://en.wiktionary.org/?curid=' +
                item.pageid +
                '">[...] <br/> Read more on Wikipedia<a></div>',
              item.title
            );
            //});
          }
        );
      } else {
        r(
          rnd([
            "hast du kein WLAN",
            "Hast du kein Internet",
            "Hast du keine Verbindung",
          ])
        );
      }
    } else {
      r(
        rnd([
          "Ich weiß nicht was ich auf " + a + " antworten soll",
          "Ich weiß nicht was ich auf " + a + " antworten kann",
          "Ich weiß nicht was du mit " + a + " meinst…",
          "Das habe ich leider nicht verstanden…",
        ])
      );
    }
  }
  $("#input").on("keypress", function (e) {
    if (e.which == 13 && $("#input").val() != "") {
      $(".chat-main").append(
        '<div><span class="speech-bubble user">' +
          $("#input").val() +
          "</span></div>"
      );
      aw($("#input").val());
      preSaid = preSaid.concat([$("#input").val()]);
      $("#input").val("");
    }
  });
  //|Wie geht['|]s|guten [Tag|Abend|Morgen]][| \!| \?
});
