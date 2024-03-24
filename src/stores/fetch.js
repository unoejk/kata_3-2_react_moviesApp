
const home='https://api.themoviedb.org/3'
const imgHome='https://image.tmdb.org/t/p/w500'
const key='api_key=99d097a5332ccca046ab2e1ba2590b62'
const token='eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OWQwOTdhNTMzMmNjY2EwNDZhYjJlMWJhMjU5MGI2MiIsInN1YiI6IjY1Zjc3YTJmZDhmNDRlMDE3YzUwZjg3ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T-0K7k-3QnhSB_2SJge0unXIOu9y51Zveui2OXPa06A'

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

const getNewMoviesData=async (query='',page=1)=>{
    // console.log(query, page)
    // console.log(query)
    // console.log(page)
    let res
    if (query===''){
        // res=await fetch(home+'/discover/movie?page='+99999999+'&sort_by=popularity.desc&'+key)
        res=await fetch(home+'/discover/movie?page='+page+'&sort_by=popularity.desc&'+key)
    }else {
        res=await fetch(home+'/search/movie?query='+query+'&page='+page+'&sort_by=popularity.desc&'+key)
    }
    // console.log(res)
    res=await res.json()
    // console.log(res)
    // console.log(res.results[0])
    return {
        moviesData:res.results.map(val=>{
            return {
                id:val.id,
                title:val.original_title,
                poster:imgHome+val.poster_path,
                description:val.overview,
                rating:val.vote_averag,
                date:val.release_date,
            }
        }),
        activePage:res.page,
        totalResults:res.total_pages>500
            ?500*20
            :res.total_results,
    }
}

export {getNewMoviesData}
