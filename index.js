const NewsModel = require('./newsModel');
const NewsApi = require('./newsApi');
const NewsView = require('./newsView');

const newsModel = new NewsModel;
const newsApi = new NewsApi;
const newsView = new NewsView(newsModel, newsApi);

console.log('The news app is running');

newsApi.getNews('', (headlines) => {
  console.log(headlines);
  newsModel.addInfo(headlines);
  newsView.displayNews();
});