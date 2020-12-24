var converter = new showdown.Converter();
console.log(showdown.getDefaultOptions())
$(function() 
  {
  function fallbackCopyTextToClipboard(text) {
  var textArea = document.createElement("textarea");
  textArea.value = text;
  
  // Avoid scrolling to bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Fallback: Copying text command was ' + msg);
  } catch (err) {
    console.error('Fallback: Oops, unable to copy', err);
  }

  document.body.removeChild(textArea);
}
function copyTextToClipboard(text) {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }
  navigator.clipboard.writeText(text).then(function() {
    console.log('Async: Copying to clipboard was successful!');
  }, function(err) {
    console.error('Async: Could not copy text: ', err);
  });
}
  function evAdd() {
    
    $("aside a:not(#new)").click(function() {
      let a = JSON.parse(localStorage.cryptdata)[$(this).attr("data-id")];
      document.title="Notizen | Notiz vom "+a.date
      $("#main-c").html(
        `<span class="rounded p-1 float-right dark:bg-gray-600 bg-gray-50">${a.date}</span>`+
        converter.makeHtml(a.content) +
          `<br/><br/><div class=" p-2 text-center rounded dark:bg-gray-600 bg-gray-50 grid grid-cols-4" data-num="${$(
            this
          ).attr("data-id")}">
        <div class="text-center" id="copy"><i class="fas fa-clipboard"></i></div>
        <div class="text-center" id="remove"><i class="fas fa-trash" ></i></div>
        <div class="text-center" id="print"><i class="fas fa-print"></i></div>
        <div class="text-center" id="share"><i class="fas fa-share"></i></div>
      </div>`
      );
      $("#remove").click(function() {
        console.log("remove");
        let did = $(this)
          .parent()
          .attr("data-num");
        console.log(did);

        let array = JSON.parse(localStorage.cryptdata);
        array.splice(did, 1);
        localStorage.cryptdata = JSON.stringify(array);

        $('aside a[data-id="' + did + '"]').remove();
        $("#main-c").fadeOut(function() {
          $("#main-c").empty();
          $("#main-c").fadeIn();
        });
      });
      $("#print").click(function() {
        window.print();
      });
      $("#share").click(function() {
        console.log("share");
        let did = $(this)
          .parent()
          .attr("data-num");
        let array = JSON.parse(localStorage.cryptdata);

        console.log(did);
        if (navigator.share) {
          navigator
            .share({
              title: "Notiz vom " + array[did].date,
              text: array[did].content
            })
            .then(() => console.log("Successful share"))
            .catch(error =>
              open(
                "mailto:?to=&subject=" +
                  encodeURI("Notiz vom" + array[did].content) +
                  "&body=" +
                  encodeURI(array[did].date)
              )
            );
        } else {
          open(
            "mailto:?to=&subject=" +
              encodeURI("Notiz vom " + array[did].date) +
              "&body=" +
              encodeURI(array[did].content)
          );
        }
      });
      $("#copy").click(function() {
        console.log("share");
        let did = $(this)
          .parent()
          .attr("data-num");
        let array = JSON.parse(localStorage.cryptdata);
copyTextToClipboard(array[did].content)
      });
      //
    });
  }
  function localUp(data) {
    localStorage.cryptdata = JSON.stringify(
      [].concat(JSON.parse(localStorage.cryptdata), data)
    );
  }
  if (localStorage.cryptdata == undefined || localStorage.cryptdata == null) {
    localStorage.cryptdata = JSON.stringify([
      { date:  moment().format('Do MMMM YYYY, hh:mm:ss'), content: "# Anleitung\n 1. Um eine neue Notiz zu schreiben, klicke links auf *neue Notiz*. \n 2. Daraufhin wird ein Fenster erscheinen, in dem du deine Notiz eintragen kannst.  \n 3. Dabei kannst du die [Markdown](https://de.wikipedia.org/wiki/Markdown) Syntax benutzen, d. h. Beispielsweise steht ein Hashtag für eine Überschrift, mehrere Bindestriche nacheinander für eine horizontale linien uvm.  Die genaue Syntax kannst du z. B. [hier](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) nachlesen.\n -----\n\n\n ### weitere Funktionen \n\n - Klicke auf das Mülleimer-Symbol, um eine Notiz zu löschen\n - Klicke auf das Teilen-Symbol, um deinen Notiz zu verschicken\n - Klicke auf das Kopie-Symbol, um deine Notiz in die Zwischenablage zu kopieren." }
    ]);
    console.log("nothin' found");
  }
  var a = JSON.parse(localStorage.cryptdata);
  console.log(a);
  for (let i = 0; i < a.length; i++) {
    item = a[i];
    if (
      !(item.content == undefined || item.content == null || item.content == "")
    ) {
      $("aside").append(
        '<a href="#" data-id="' +
          i +
          '" class="rounded block px-4 py-2 text-sm dark:text-white text-gray-900 hover:bg-gray-200 dark:hover:bg-gray-600 duration-700 hover:text-gray-900 dark:hover:text-white" role="menuitem" >' +
          (sanitizeHtml(item.content.length, { allowedTags: [] }) > 5
            ? sanitizeHtml(item.content.substr(0, 14), { allowedTags: [] }) +
              "…"
            : sanitizeHtml(item.content, { allowedTags: [] })) +
          "</a>"
      );
      console.log(item.date);
    }
  }

  $("#new").click(function() {
    $("#main-c").html(
      '<div><textarea class="rounded border-blue-200 w-full border p-2 sm:p-4 mb-4 dark:bg-gray-400 dark:text-white dark:placeholder-white" placeholder="Neue Notiz"></textarea><button class="focus:outline-none focus:ring-blue-400 hover:ring-blue-100 duration-700 w-32 py-2 rounded-md font-semibold text-white bg-blue-500 ring-4 ring-blue-500 ring-opacity-50 mb-4 float-left" id="writenote"><i class="fas fa-pen"></i> Fertig</button></div>'
    );

    $("#writenote").click(function() {
      console.log($("#main-c div textarea").val());
      if (
        $("#main-c div textarea")
          .val()
          .trim() != ""
      ) {
        $("#main-c div").fadeOut();
        let val2set = $("#main-c div textarea").val();
        let pos = JSON.parse(localStorage.cryptdata).length;
        console.log(pos);
        localStorage.cryptdata = JSON.stringify(
          [].concat(JSON.parse(localStorage.cryptdata), [
            { content: val2set, date: moment().format('Do MMMM YYYY, h:mm:ss') }
          ])
        );
        console.log(JSON.parse(localStorage.cryptdata));

        $("aside").append(
          '<a href="#" data-id="' +
            pos +
            '" class="rounded block px-4 py-2 text-sm dark:text-white text-gray-900 hover:bg-gray-200 dark:hover:bg-gray-600 duration-700 hover:text-gray-900 dark:hover:text-white" role="menuitem">' +
            (sanitizeHtml(val2set.length, { allowedTags: [] }) > 14
              ? sanitizeHtml(val2set.substr(0, 14), { allowedTags: [] }) + "…"
              : sanitizeHtml(val2set, { allowedTags: [] })) +
            "</a>"
        );
        evAdd();
      }
    });
  });
  evAdd();
  /*console.log(localStorage.cryptdata)
  localStorage.cryptdata=JSON.stringify([])
console.log(localStorage.cryptdata==undefined||localStorage.cryptdata==null)
*/
});
