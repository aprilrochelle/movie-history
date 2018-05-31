/* eslint camelcase: 0 */

const dom = require('./dom');

let tmdbKey = '';
let imageConfig = {};

const setKey = (key) => {
  tmdbKey = key;
  getConfig();
};

const getImageConfig = () => {
  return imageConfig;
};

const getConfig = () => {
  tmdbConfiguration()
    .then((result) => {
      imageConfig = result.images;
    })
    .catch((err) => {
      console.error('error with tmdb config: ', err);
    });
};

const tmdbConfiguration = () => {
  // promise here
  return new Promise((resolve, reject) => {
    $.ajax(`https://api.themoviedb.org/3/configuration?api_key=${tmdbKey}`)
      .done((data) => {
        resolve(data);
      })
      .fail((err) => {
        console.error(err);
      });
  });
};

const searchTMDB = (txt) => {
  return new Promise((resolve, reject) => {
    $.ajax(`https://api.themoviedb.org/3/search/movie?api_key=${tmdbKey}&language=en-US&query=${txt}&page=1&include_adult=false`)
      .done((result) => {
        resolve(result.results);
      })
      .fail((err) => {
        reject(err);
      });
  });
};

const showResults = (searchText) => {
  searchTMDB(searchText)
    .then((result) => {
      dom.domString(result, imageConfig, 'movies-list');
    })
    .catch((err) => {
      console.error('search error: ', err);
    });
};

module.exports = {
  showResults,
  setKey,
  getImageConfig,
};
