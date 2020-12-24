$(function () {
  for (item of x.traindates) {
    let copytrain = item.excersises;
    for (exc of copytrain) {
      copytrain[
        copytrain.indexOf(exc)
      ] = `<svg version="1.1" viewBox="0 0 75 50" xmlns="http://www.w3.org/2000/svg"
            xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/"
            xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" class="inline-block w-6 rounded-full" alt="${
              gti(exc).name
            }">${gti(exc).svg}</svg>`;
    }
    $("#tables").append(
      `<div class="p-1 sm:p-2  rounded tableitem" ><h3 class="">${
        item.name
      }</h3><div class="text-sm">${
        item.add
      }</div><div class="sm:h-8 h-6 flex flex-row overflow-x-auto p-1">${copytrain.join(
        ""
      )}</div></div>`
    );
    $("#tables")
      .children()
      .last()
      .css({
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" height=\"50px\" width=\"120px\"><text x=\"100\" y=\"15\" fill=\"blue\" font-family=\"ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Roboto, Arial, sans-serif\" font-size=\"20\">${
          x.traindates.indexOf(item) + 1
        }</text ><text x=\"101\" y=\"16\" fill=\"skyblue\" font-family=\"ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Roboto, Arial, sans-serif\" font-size=\"20\">${
          x.traindates.indexOf(item) + 1
        }</text ></svg >')`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top right",
      });
  }
  var day
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
  $(`.tableitem:nth-child(${day+1})`).css({border:"1px dotted lime"})
});
