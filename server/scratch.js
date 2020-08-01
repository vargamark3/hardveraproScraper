var results = $("li").filter("[class='media'],[class='media featured']"); //hardverapro sorting
//https://hardverapro.hu/aprok/notebook/index.html
results.each((index, element) => {
  const result = $(element);
  const title = result
    .children("div.media-body")
    .children("div.uad-title")
    .children("h1")
    .text();

  console.log(title);
});

var results = $("li").filter("[class='media'],[class='media featured']"); //hardverapro sorting
//https://hardverapro.hu/aprok/notebook/index.html
results.each((index, element) => {
  const result = $(element);
  const price = result
    .children("div.media-body")
    .children("div.uad-info")
    .children("div.uad-price");

  console.log(price);
});
var results = $("li").filter("[class='media'],[class='media featured']"); //hardverapro sorting
//https://hardverapro.hu/aprok/notebook/index.html
results.each((index, element) => {
  const result = $(element);
  let location = result
    .children("div.media-body")
    .children("div.uad-info")
    .children("div.uad-light");
  if (location.children().length > 0) {
    location = location.children("span").attr("data-original-title");
  } else {
    location = location.text();
  }

  console.log(location);
});
var results = $("li").filter("[class='media'],[class='media featured']"); //hardverapro sorting
//https://hardverapro.hu/aprok/notebook/index.html
results.each((index, element) => {
  const result = $(element);
  const title = result
    .children("div.media-body")
    .children("div.uad-title")
    .children("h1").children("a").attr("href")

  console.log(title);
});