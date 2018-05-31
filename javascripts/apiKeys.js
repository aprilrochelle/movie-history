const tmdb = require('./tmdb');
const firebaseApi = require('./firebaseApi');

const apiKeys = () => {
  return new Promise((resolve, reject) => {
    $.ajax('./db/apiKeys.json')
      .done((data) => {
        resolve(data.apiKeys);
      })
      .fail((err) => {
        reject(err);
      });
  });
};

const retrieveKeys = () => {
  apiKeys()
    .then((results) => {
      tmdb.setKey(results.tmdb.apiKey);
      firebaseApi.setConfig(results.firebase);
      firebase.initializeApp(results.firebase);
    })
    .catch((err) => {
      console.error('no keys: ', err);
    });
};

module.exports = {
  retrieveKeys,
};
