const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const fetch = require("node-fetch");
const cheerio = require("cheerio");
const app = express();

const baseUrl = "https://hardverapro.hu";

app.use(cors());

app.use(morgan("tiny"));

app.get("/", (request, response) => {
  response.json({
    message: "hello world",
  });
});

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

function getResults(body) {
  const $ = cheerio.load(body);
  const listings = $("li").filter("[class='media'],[class='media featured']");
  const results = [];
  listings.each((index, element) => {
    const result = $(element);
    const rawTitle = result
      .children("div.media-body")
      .children("div.uad-title")
      .children("h1")
      .text()
      .split(/(\s–\s)/); //title - time regex
    const title = rawTitle[rawTitle.length - 3]; //maybe more than one /(\s–\s)/ ....
    let time = rawTitle[rawTitle.length - 1];
    if (time === "Előresorolt hirdetés") {
      time = "";
    }

    const price = result
      .children("div.media-body")
      .children("div.uad-info")
      .children("div.uad-price")
      .text();
    let location = result
      .children("div.media-body")
      .children("div.uad-info")
      .children("div.uad-light");
    if (location.children().length > 0) {
      location = location.children("span").attr("title");
    } else {
      location = location.text();
    }
    const img =
      baseUrl +
      result.children("a.uad-image").children("img.d-block").attr("src");
    const link = result
      .children("div.media-body")
      .children("div.uad-title")
      .children("h1")
      .children("a")
      .attr("href");
    if (time === "") {
      results.push({ title, time, price, location, img, link });
    } else {
      results.unshift({ title, time, price, location, img, link });
    }
  });

  return results;
}

app.get("/search/:search_term", (request, response) => {
  const url = `${baseUrl}/aprok/keres.php?stext=${request.params.search_term}`;
  fetch(url)
    .then(handleErrors)
    .then((response) => response.text())
    .then((body) => {
      const results = getResults(body);
      response.json({
        results,
      });
    })
    .catch((error) => console.log(error));
});

app.use((request, response, next) => {
  const error = new Error("not found");
  response.status(404);
  next(error);
});

app.use((error, request, response, next) => {
  response.status(response.statusCode || 500);
  response.json({
    message: error.message,
  });
});
app.listen(5000, () => {
  console.log("listening on port 5000");
  console.log("http://localhost:5000");
});
