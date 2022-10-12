const API_TOKEN = ""

// Get data from the API

// Movies

export function getFilmsFromApiWithSearchedText(text, page) {
  const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + '&language=en&query=' + text + '&page=' + page;
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.log(error))
}

export function getBestFilmsFromApi (page) {
  const url = 'https://api.themoviedb.org/3/discover/movie?api_key=' + API_TOKEN + '&vote_count.gte=1000&sort_by=release_date.desc&language=en&page=' + page;
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.log(error))
}

export function getNowPlaying (page) {
  const url = 'https://api.themoviedb.org/3/movie/now_playing?api_key=' + API_TOKEN + '&language=en&page=' + page;
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.log(error))
}

export function getImageFromApi(name) {
  return 'https://image.tmdb.org/t/p/w300' + name
}

export function  getFilmDetailFromApi(id) {
  const url = 'https://api.themoviedb.org/3/movie/' + id + '?api_key=' + API_TOKEN + '&language=en';
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.log(error))
}

export function getFilmVideosFromApi(id) {
  const url = 'https://api.themoviedb.org/3/movie/'+ id +'/videos?api_key=' + API_TOKEN;
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.log(error))
}

export function getCreditsFromApi(movie_id) {
  const url = 'https://api.themoviedb.org/3/movie/'+ movie_id +'/credits?api_key=' + API_TOKEN;
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.log(error))
}

export function getPeopleDetails(people_id) {
  const url = 'https://api.themoviedb.org/3/person/'+ people_id +'?api_key=' + API_TOKEN;
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.log(error))
}

export function getPeopleCredits(people_id) {
  const url = 'https://api.themoviedb.org/3/person/'+ people_id +'/movie_credits?api_key=' + API_TOKEN + '&language=en';
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.log(error))
}

// Peoples

export function getPeoplesFromApiWithSearchedText(text, page) {
  const url = 'https://api.themoviedb.org/3/search/person?api_key=' + API_TOKEN + '&language=en&query=' + text + '&page=' + page;
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.log(error))
}

// Connexion to an account

export function createRequestTokenFromApi() {
  const url = 'https://api.themoviedb.org/3/authentication/token/new?api_key=' + API_TOKEN;
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.log(error))
}

export function createSessionFromApi(request_token) {
  const url = 'https://api.themoviedb.org/3/authentication/session/new?api_key=' + API_TOKEN;
  return fetch(url,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "request_token": request_token,
      }),
    })
    .then((response) => response.json())
    .catch((error) => console.log(error))
}

export function deleteSessionFromApi(session_id) {
  const url = 'https://api.themoviedb.org/3/authentication/session?api_key=' + API_TOKEN;
  return fetch(url,
    {
      method: 'DELETE',
      body: JSON.stringify({
        "session_id": session_id,
      }),
    })
    .then((response) => response.json())
    .catch((error) => console.log(error))
}

// Interaction with an account

export function getAccountDetailFromApi(session_id) {
  const url = 'https://api.themoviedb.org/3/account?api_key=' + API_TOKEN + '&session_id=' + session_id;
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.log(error))
}

export function addToWatchListFromApi(account_id, session_id, media_type, media_id, watchlist) {
  const url = 'https://api.themoviedb.org/3/account/' + account_id + '/watchlist?api_key=' + API_TOKEN + '&session_id=' + session_id;
  return fetch(url,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        "media_type": media_type,
        "media_id": media_id,
        "watchlist": watchlist,
      }),
    })
    .then((response) => response.json())
    .catch((error) => console.log(error))
}

export function addToFavoriteFromApi(account_id, session_id, media_type, media_id, favorite) {
  const url = 'https://api.themoviedb.org/3/account/' + account_id + '/favorite?api_key=' + API_TOKEN + '&session_id=' + session_id;
  return fetch(url,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        "media_type": media_type,
        "media_id": media_id,
        "favorite": favorite,
      }),
    })
    .then((response) => response.json())
    .catch((error) => console.log(error))
}

export function getWatchListFromApi(account_id, session_id, page) {
  const url = 'https://api.themoviedb.org/3/account/' + account_id + '/watchlist/movies?api_key=' + API_TOKEN + '&session_id=' + session_id + '&language=en&page=' + page;
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.log(error))
}

export function getFavoriteMoviesFromApi(account_id, session_id, page) {
  const url = 'https://api.themoviedb.org/3/account/' + account_id + '/favorite/movies?api_key=' + API_TOKEN + '&session_id=' + session_id + '&language=en&page=' + page;
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.log(error))
}