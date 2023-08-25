let source = "techcrunch";
let apiKey = "14c2621687a749118feb1fe15d51ed8a";

let newsAccordion = document.getElementById("newsAccordion");

// creating an ajax get request
const xhr = new XMLHttpRequest();
xhr.open(
  "GET",
  `https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${apiKey}`,
  true
);

// What to do when response is ready
xhr.onload = function () {
  if (this.status === 200) {
    let json = JSON.parse(this.responseText);
    let articles = json.articles;
    let newsHTML = "";
    articles.forEach(function (element, index) {
      let news = `<div class="card">
  <div class="card-header" id="heading${index}">
    <h2 class="mb-0">
      <button
        class="btn btn-link"
        type="button"
        data-toggle="collapse"
        data-target="#collapse${index}"
        aria-expanded="true"
        aria-controls="collapse${index}"
      >
      ${element["title"]}
      </button>
    </h2>
  </div>

  <div
    id="collapse${index}"
    class="collapse show"
    aria-labelledby="heading${index}"
    data-parent="#newsAccordion"
  >
    <div class="card-body">
        ${element["content"]}. <a href="${element["url"]}" target = "_blank"> Read More Here</a>
    </div>
  </div>
</div>`;
      newsHTML += news;
    });
    newsAccordion.innerHTML = newsHTML;
  } else {
    console.log("Some error occured");
  }
};

xhr.send();

// xhr.getResponseHeader("Content-type", "application/json");
