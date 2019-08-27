import React, { Component } from 'react';
import 'whatwg-fetch';

class NewsContent extends Component {

    componentDidMount() {

        const apiKey = "cd2cfbd660bf4734891abdd1af5a4e09";
        const defaultSource = 'the-times-of-india';
        const sourceSelector = document.querySelector('#sources');
        const newsArticles = document.querySelector('main');
        
        if ('serviceWorker' in navigator) {
          window.addEventListener('load', () =>
            navigator.serviceWorker.register('sw.js')
              .then(registration => console.log('Service Worker registered'))
              .catch(err => 'SW registration failed'));
        }
        
        window.addEventListener('load', e => {
          sourceSelector.addEventListener('change', evt => updateNews(evt.target.value));
          updateNewsSources().then(() => {
            sourceSelector.value = defaultSource;
            updateNews();
          });
        });
        
        window.addEventListener('online', () => updateNews(sourceSelector.value));
        
        async function updateNewsSources() {
          const response = await fetch(`https://newsapi.org/v2/sources?apiKey=${apiKey}`);
          const json = await response.json();
          sourceSelector.innerHTML =
            json.sources
              .map(source => `<option value="${source.id}">${source.name}</option>`)
              .join('\n');
        }
        
        async function updateNews(source = defaultSource) {
            console.log(source);
          newsArticles.innerHTML = '';
          const response = await fetch(`https://newsapi.org/v2/top-headlines?sources=${source}&sortBy=top&apiKey=${apiKey}`);
          const json = await response.json();
          newsArticles.innerHTML =
            json.articles.map(createArticle).join('\n');
        }
        
        function createArticle(article) {
          return `
            <card class="article">
              <div class="img-wrapper">
                <img src="${article.urlToImage}" alt="${article.title}">
              </div>
              <div class="content-wrapper">
                <a href="${article.url}">
                  <span class="title">${article.title}:</span><br>
                  <span class="description">${article.description}</span>
                </a>
              </div>
            </card>
          `;
        }
    }

    render() {
        return (
            <main></main>
        )
    }
}

export default NewsContent;