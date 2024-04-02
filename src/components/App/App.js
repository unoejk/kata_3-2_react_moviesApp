// react
import React from 'react'
// libs
import { Flex } from 'antd'

// style
import './App.css'
// store
import { getNewMoviesData, getGenres, updateGuestSession, setMovieRate, getRatedMoviesData } from '../../stores/fetch'
import { GenresProvider } from '../../stores/context'

// components
import TabsPanel from './TabsPanel/TabsPanel'
import SearchPanel from './SearchPanel/SearchPanel'
import MoviesList from './MoviesList/MoviesList'
import PaginationPanel from './PaginationPanel/PaginationPanel'

// ---------------- go-go

export default class Card extends React.Component {
  state = {
    isRatedTabActive: false,

    allActiveQuery: '',
    allMoviesData: [],
    allActivePage: 1,
    allTotalResults: 0, // всего результатов, чтобы считать правильное количество страниц
    isAllError: false,
    isAllLoading: false,

    ratedMoviesData: [],
    ratedActivePage: 1,
    ratedTotalResults: 0, // всего результатов, чтобы считать правильное количество страниц
    // isRatedError:false,
    isRatedLoading: false,

    genresData: [],
    // isGenresError:false,
  }

  async componentDidMount() {
    // разрыв сети
    if (!navigator.onLine) {
      await this.setState({
        isAllError: 'Disconnected',
        isRatedError: 'Disconnected',
      })
      return
    }

    updateGuestSession()

    this.updateGenresData()

    this.updateMoviesData('', 1).catch(() => {
      this.setState({
        // ошибку выдать, загрузку убрать
        isAllError: 'Some error, its our problem',
        isAllLoading: false,
      })
    })

    this.updateRatedMoviesData().catch(() => {
      this.setState({
        // ошибку выдать, загрузку убрать
        isRatedError: 'Some error, its our problem',
        isRatedLoading: false,
      })
    })
  }

  // список всех фильмов
  updateMoviesData = async (query, page) => {
    this.setState({
      // флаг загрузки
      isAllLoading: true,
    })
    const newData = await getNewMoviesData(query, page)
    // console.log(newData.moviesData[0])
    this.setState({
      // обновления для компонентов
      allActiveQuery: query, // текущий поиск
      allMoviesData: newData.moviesData, // массив с фильмами
      allTotalResults: newData.totalResults, // всего результатов, чтобы было правильное количество страниц
      allActivePage: newData.activePage, // текущая страница
      // сброс загрузки и ошибки
      isAllError: false,
      isAllLoading: false,
    })
  }

  // список тегов
  updateGenresData = async () => {
    const genresData = await getGenres()
    this.setState({
      genresData: genresData,
    })
  }
  // список отмеченных фильмов
  updateRatedMoviesData = async (page) => {
    this.setState({
      // флаг загрузки
      isRatedLoading: true,
    })
    const newData = await getRatedMoviesData(page)
    // console.log(newData)
    this.setState({
      // обновления для компонентов
      ratedMoviesData: newData.moviesData, // массив с фильмами
      ratedTotalResults: newData.totalResults, // всего результатов, чтобы было правильное количество страниц
      ratedActivePage: newData.activePage, // текущая страница
      // сброс загрузки и ошибки
      // isRatedError:false,
      isRatedLoading: false,
    })
  }

  // ---------------- forTabsPanel
  changeTab = (tabName) => {
    if (tabName === 'search') {
      this.setState({
        isRatedTabActive: false,
      })
    }
    if (tabName === 'rated') {
      this.setState({
        isRatedTabActive: true,
      })
    }
  }

  // ---------------- forSearchPanel

  // Новый input: поиск из SearchPanel, страницу на 1
  changeRequest = async (newRequest) => {
    await this.updateMoviesData(newRequest, 1)
  }

  // ---------------- forMoviesList

  setMovieRate = async (id, e) => {
    await setMovieRate(id, e)
    this.updateRatedMoviesData().catch(() => {
      this.setState({
        // ошибку выдать, загрузку убрать
        isRatedError: 'Some error, its our problem',
        isRatedLoading: false,
      })
    })
  }

  // ---------------- forPaginationPanel

  // Новая страница: поиск из текущего, страница из PaginationPanel
  changePage = async (newPage) => {
    await this.updateMoviesData(this.state.allActiveQuery, newPage)
  }

  render() {
    // setTimeout(()=>{
    //     console.log(this.props.ratedMoviesData)
    // },1000)

    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
        navigator.userAgent
      )

    return (
      <Flex className={isMobile ? 'mpWrap mobile' : 'mpWrap'} justify={'center'}>
        <Flex className={'mpContentList'} vertical={true} justify={'space-between'}>
          <Flex component={'header'} className={'mpContentList__header'} justify={'center'} align={'center'}>
            {/*********--------*/}
            <TabsPanel changeTab={this.changeTab} />
            {/*--------*********/}
          </Flex>
          <Flex component={'main'} className={'mpContentList__main'} vertical={true} align={'center'}>
            {/*********--------*/}
            {this.state.isRatedTabActive ? null : <SearchPanel changeRequest={this.changeRequest} />}
            {/*--------*********/}

            {/*********--------*/}
            <GenresProvider value={this.state.genresData}>
              <MoviesList
                moviesData={
                  this.state.isRatedTabActive // массив с фильмами
                    ? this.state.ratedMoviesData
                    : this.state.allMoviesData
                }
                isError={this.state.isAllError} // флаг чтобы компонент показывал ошибку
                isLoading={
                  this.state.isRatedTabActive // флаг чтобы компонент показывал загрузку
                    ? this.state.isRatedLoading
                    : this.state.isAllLoading
                }
                setMovieRate={this.setMovieRate}
              />
            </GenresProvider>
            {/*--------*********/}
          </Flex>
          <Flex component={'footer'} className={'mpContentList__footer'} justify={'center'} align={'center'}>
            {/*********--------*/}
            <PaginationPanel
              changePage={this.changePage} // хук для новой страницы
              totalResults={
                this.state.isRatedTabActive // всего результатов, чтобы было правильное количество страниц
                  ? this.state.ratedTotalResults
                  : this.state.allTotalResults
              }
              activePage={
                this.state.isRatedTabActive // текущая страница
                  ? this.state.ratedActivePage
                  : this.state.allActivePage
              }
            />
            {/*--------*********/}
          </Flex>
        </Flex>
      </Flex>
    )
  }
}
