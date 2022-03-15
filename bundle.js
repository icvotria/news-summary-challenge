(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // apiKey.js
  var require_apiKey = __commonJS({
    "apiKey.js"(exports, module) {
      var apiKey2 = `f9aa2f1d-3dc8-4b90-9652-db8eea680ff9`;
      module.exports = apiKey2;
    }
  });

  // newsModel.js
  var NewsModel = class {
    constructor() {
      this.headlines = [];
      this.links = [];
      this.images = [];
    }
    getHeadlines() {
      return this.headlines;
    }
    getLinks() {
      return this.links;
    }
    getImages() {
      return this.images;
    }
    addInfo(stories) {
      this.#addHeadlines(stories);
      this.#addLinks(stories);
      this.#addImages(stories);
    }
    #addHeadlines(stories) {
      stories.forEach((story) => {
        this.headlines.push(story.webTitle);
      });
    }
    #addLinks(stories) {
      stories.forEach((story) => {
        this.links.push(story.webUrl);
      });
    }
    #addImages(stories) {
      stories.forEach((story) => {
        this.images.push(story.fields.thumbnail);
      });
    }
    reset() {
      this.headlines = [];
      this.links = [];
      this.images = [];
    }
  };
  var newsModel_default = NewsModel;

  // newsApi.js
  var apiKey = require_apiKey();
  var NewsApi = class {
    getNews(searchTerm, callback) {
      fetch(`https://content.guardianapis.com/search?q=${searchTerm}&query-fields=headline&show-fields=thumbnail,headline,byline&order-by=newest&api-key=${apiKey}`).then((response) => response.json()).then((data) => {
        callback(data.response.results);
      });
    }
  };
  var newsApi_default = NewsApi;

  // newsView.js
  var NewsView = class {
    constructor(newsModel2, newsApi2) {
      this.newsModel = newsModel2;
      this.mainContainerEl = document.querySelector("#main-container");
      this.buttonEl = document.querySelector("#search-button");
      this.inputEl = document.querySelector("#search-input");
      this.inputEl.value = "";
      this.buttonEl.addEventListener("click", () => {
        const searchTerm = document.querySelector("#search-input").value;
        newsApi2.getNews(searchTerm, (headlines) => {
          newsModel2.reset();
          newsModel2.addInfo(headlines);
          this.displayNews();
        });
      });
    }
    displayNews() {
      const headlines = this.newsModel.getHeadlines();
      const links = this.newsModel.getLinks();
      const images = this.newsModel.getImages();
      const articlesArray = [];
      headlines.forEach((headline) => {
        const newsEl = document.createElement("div");
        const index = headlines.indexOf(headline);
        const a = document.createElement("a");
        const linkText = document.createTextNode(headline);
        const img = document.createElement("img");
        const lineBreak = document.createElement("br");
        newsEl.className = "headline";
        a.appendChild(linkText);
        a.title = headline;
        a.href = links[index];
        img.src = images[index];
        img.className = "image";
        newsEl.appendChild(a);
        newsEl.append(lineBreak);
        newsEl.appendChild(img);
        articlesArray.push(newsEl);
      });
      this.mainContainerEl.replaceChildren(...articlesArray);
    }
  };
  var newsView_default = NewsView;

  // index.js
  var newsModel = new newsModel_default();
  var newsApi = new newsApi_default();
  var newsView = new newsView_default(newsModel, newsApi);
  console.log("The news app is running");
  newsApi.getNews("", (headlines) => {
    newsModel.addInfo(headlines);
    newsView.displayNews();
  });
})();
