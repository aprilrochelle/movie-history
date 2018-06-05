const {getAllMoviesEvent,} = require('./events');

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in.
      $('#myMovies').removeClass('hide');
      $('#search').addClass('hide');
      $('#authScreen').addClass('hide');
      $('#movies, #nav-search, #logout').removeClass('hide');
      $('#auth').addClass('hide');
      // call the getMoviesEvent
      getAllMoviesEvent();
    } else {
      // No user is signed in.
      $('#myMovies').addClass('hide');
      $('#search').addClass('hide');
      $('#authScreen').removeClass('hide');
      $('#movies, #nav-search, #logout').addClass('hide');
      $('#auth').removeClass('hide');
    }
  });
};

module.exports = {
  checkLoginStatus,
};
