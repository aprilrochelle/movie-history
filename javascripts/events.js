const tmdb = require('./tmdb');

const myLinks = (e) => {
  $(document).click((e) => {
    if (e.target.id === 'auth') {
      $('#myMovies').addClass('hide');
      $('#search').addClass('hide');
      $('#authScreen').removeClass('hide');
    } else if (e.target.id === 'movies') {
      $('#myMovies').removeClass('hide');
      $('#search').addClass('hide');
      $('#authScreen').addClass('hide');
    } else if (e.target.id === 'nav-search') {
      $('#myMovies').addClass('hide');
      $('#search').removeClass('hide');
      $('#authScreen').addClass('hide');
    }
  });
};

const pressEnter = () => {
  $(document).keypress((e) => {
    if (e.key === 'Enter') {
      tmdb.showResults('cow');
    }
  });
};

const initializer = () => {
  myLinks();
  pressEnter();
};

module.exports = {
  initializer,
};
