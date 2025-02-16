class NewsModel {
  constructor() {
    this.news = [];
  };

  getNews() {
    return this.news;
  };

  addNews(stories) {
    stories.forEach(story => {
      let newsObj = { 
        headline: story.webTitle, 
        link: story.webUrl, 
        image: story.fields.thumbnail
      }
      this.news.push(newsObj);
    });
  };
  
  reset() {
    this.news = [];
  };
 };

 module.exports = NewsModel;