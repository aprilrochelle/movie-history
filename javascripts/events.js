/* eslint camelcase: 0 */

const tmdb = require('./tmdb');
const firebaseApi = require('./firebaseApi');
const dom = require('./dom');

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
      // call the getMoviesEvent
      getAllMoviesEvent();
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
      const searchWords = $('#searchBar').val().replace(' ', '%20');
      tmdb.showResults(searchWords);
    }
  });
};

const saveMovieToWishlistEvent = () => {
  $(document).on('click', '.addMovieToWishlist', (e) => {
    const movieToAddCard = $(e.target).closest('.movie');
    const movieToAdd = {
      title: movieToAddCard.find('.movie-title').text(),
      overview: movieToAddCard.find('.movie-overview').text(),
      poster_path: movieToAddCard.find('img').data('poster'),
      rating: 0,
      isWatched: false,
    };
    firebaseApi.saveMovieToWishlist(movieToAdd)
      .then(() => {
        movieToAddCard.remove();
      })
      .catch((error) => {
        console.error('error in saving movie', error);
      });
  });
};

const getAllMoviesEvent = () => {
  firebaseApi.getAllMovies()
    .then((moviesArray) => {
      dom.domString(moviesArray, tmdb.getImageConfig(), 'savedMovies', true);
    })
    .catch((error) => {
      console.error('error in get all movies', error);
    });
};

const getWatchedMovies = () => {
  firebaseApi.getWatchedMovies()
    .then((moviesArray) => {
      dom.domString(moviesArray, tmdb.getImageConfig(), 'savedMovies', true);
    })
    .catch((error) => {
      console.error('error in get watched movies', error);
    });
};

const getWishlistMovies = () => {
  firebaseApi.getWishlistMovies()
    .then((moviesArray) => {
      dom.domString(moviesArray, tmdb.getImageConfig(), 'savedMovies', true);
    })
    .catch((error) => {
      console.error('error in get watched movies', error);
    });
};

const deleteMovieFromFirebase = () => {
  $(document).on('click', '.deleteMovieFromCollectionEvent', (e) => {
    const movieToDeleteId = $(e.target).closest('.movie').data('firebaseId');
    firebaseApi.deleteMovieFromDb(movieToDeleteId)
      .then(() => {
        getAllMoviesEvent();
      })
      .catch((error) => {
        console.error(error);
      });
  });
};

const updateMovieEvent = () => {
  $(document).on('click', '.updateMovieToWatched', (e) => {
    const movieToUpdateId = $(e.target).closest('.movie').data('firebaseId');
    const movieToUpdateCard = $(e.target).closest('.movie');
    const updatedMovie = {
      title: movieToUpdateCard.find('.movie-title').text(),
      overview: movieToUpdateCard.find('.movie-overview').text(),
      poster_path: movieToUpdateCard.find('img').data('poster'),
      rating: 0,
      isWatched: true,
    };
    firebaseApi.updateMovieToWatched(updatedMovie, movieToUpdateId)
      .then(() => {
        getAllMoviesEvent();
      })
      .catch((error) => {
        console.error('error in updating movie', error);
      });
  });
};

const filterEvents = () => {
  $('#filterButtons').on('click', (e) => {
    const classList = e.target.classList;
    if (classList.contains('wishlist')) {
      // show only isWatched: false'
      getWishlistMovies();
    } else if (classList.contains('watched')) {
      // show only isWatched: true
      getWatchedMovies();
    } else {
      // show all of them
      getAllMoviesEvent();
    }
  });
};

const initializer = () => {
  myLinks();
  pressEnter();
  saveMovieToWishlistEvent();
  deleteMovieFromFirebase();
  updateMovieEvent();
  filterEvents();
};

module.exports = {
  initializer,
};
