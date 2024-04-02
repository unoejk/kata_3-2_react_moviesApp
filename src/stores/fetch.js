const home = 'https://api.themoviedb.org/3'
const imgHome = 'https://image.tmdb.org/t/p/w500'
const key = 'api_key=99d097a5332ccca046ab2e1ba2590b62'
// const token =
//   'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OWQwOTdhNTMzMmNjY2EwNDZhYjJlMWJhMjU5MGI2MiIsInN1YiI6IjY1Zjc3YTJmZDhmNDRlMDE3YzUwZjg3ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T-0K7k-3QnhSB_2SJge0unXIOu9y51Zveui2OXPa06A'

// const logV1=()=>{
//     fetch(home+'/movie/changes?page=1&'+key)
//         .then((res)=>{
//             return res.json()
//         })
//         .then((data)=>{
//             console.log(data)
//         })
// }
// const logV2=async ()=>{
//     const res=await fetch(home+'/movie/changes?page=1&'+key)
//     const data=await res.json()
//     console.log(data)
// }
// const getV1=()=>{
//     return fetch(home+'/movie/changes?page=1&'+key)
//         .then((res)=>{
//             return res.json()
//         })
// }
// const getV2=async ()=>{
//     const res=await fetch(home+'/movie/changes?page=1&'+key)
//     return await res.json()
// }

// ?? 100ShortList: https://developer.themoviedb.org/reference/changes-movie-list
// ?? movieById: https://developer.themoviedb.org/reference/discover-movie

// guestSession: https://developer.themoviedb.org/docs/authentication-guest-sessions
//

// discoverMoviesList: https://developer.themoviedb.org/reference/discover-movie
// home+'/discover/movie?page=1&sort_by=popularity.desc&'+key

// ?? searchMoviesList: https://developer.themoviedb.org/reference/search-movie
// home+'/search/movie?query=test&page=1&sort_by=popularity.desc&'+key

// const createGuestSessionTTT=()=>{
//     return fetch(this.baseURL + '/authentication/guest_session/new?api_key=' + this.api_key, {
//         headers: {
//             accept: 'application/json',
//         },
//     }).then((res) => res.json())
// }

// ---------------- простые запросы

// постраничный поиск фильмов
const getNewMoviesData = async (query = '', page = 1) => {
  let res
  if (query === '') {
    // res=await fetch(home+'/discover/movie?page='+99999999+'&sort_by=popularity.desc&'+key)
    res = await fetch(home + '/discover/movie?page=' + page + '&sort_by=popularity.desc&' + key)
  } else {
    res = await fetch(home + '/search/movie?query=' + query + '&page=' + page + '&sort_by=popularity.desc&' + key)
  }
  res = await res.json()
  // console.log(res.results[4])
  return {
    moviesData: res.results.map((val) => {
      // в этом запросе гостевой рейтинг не выдаётся, поэтому его ещё и в localStorage копирую при добавлении
      const myRate = JSON.parse(localStorage.getItem('' + val.id))
      return {
        id: val.id,
        title: val.original_title,
        poster: imgHome + val.poster_path,
        description: val.overview,
        rating: val.vote_average,
        date: val.release_date,
        genreIds: val.genre_ids,
        myRate: myRate,
      }
    }),
    activePage: res.page,
    totalResults: res.total_pages > 500 ? 500 * 20 : res.total_results,
  }
}

// общий список жанров
const getGenres = async () => {
  let res = await fetch(home + '/genre/movie/list?' + key)
  res = await res.json()
  // console.log(res.genres)
  return res.genres
}

// ---------------- сессионные запросы

// id для голосования
const updateGuestSession = async (isForced = false) => {
  const sessionId = await JSON.parse(localStorage.getItem('sessionId'))

  if (isForced || sessionId === null) {
    localStorage.clear()
    let res = await fetch(home + '/authentication/guest_session/new?' + key)
    res = await res.json()
    localStorage.setItem('sessionId', JSON.stringify(res.guest_session_id))
  }
}

// поставить рейтинг
const setMovieRate = async (movieId, rate) => {
  const sessionId = await JSON.parse(localStorage.getItem('sessionId'))

  await fetch(home + '/movie/' + movieId + '/rating?' + key + '&guest_session_id=' + sessionId, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({ value: rate }),
  })
  // .then(response => response.json())
  // .then(response => console.log(response))
  // .catch(err => console.error(err));
  // в запросе на весь список фильмов гостевой рейтинг не выдаётся, поэтому его ещё и в localStorage копирую при добавлении
  localStorage.setItem('' + movieId, JSON.stringify(rate))
}

// список отмеченных фильмов
const getRatedMoviesData = async (page = 1, isForcedTry = false) => {
  const sessionId = await JSON.parse(localStorage.getItem('sessionId'))

  let res = await fetch(home + '/guest_session/' + sessionId + '/rated/movies?page=' + page + '&' + key)
  res = await res.json()

  // status_code===3 вылетает когда гостевая сессия окончена
  if (res.status_code === 3 && !isForcedTry) {
    await updateGuestSession(true)
    return await getRatedMoviesData(page, true)
  }

  return {
    moviesData: res.results.map((val) => {
      return {
        id: val.id,
        title: val.original_title,
        poster: imgHome + val.poster_path,
        description: val.overview,
        rating: val.vote_average,
        date: val.release_date,
        genreIds: val.genre_ids,
        myRate: val.rating,
      }
    }),
    activePage: res.page,
    totalResults: res.total_pages > 500 ? 500 * 20 : res.total_results,
  }
}

export { getNewMoviesData, getGenres, updateGuestSession, setMovieRate, getRatedMoviesData }
