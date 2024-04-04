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
    allTotalResults: 0,
    isAllError: false,
    isAllLoading: false,

    ratedMoviesData: [],
    ratedActivePage: 1,
    ratedTotalResults: 0,
    isRatedError: false,
    isRatedLoading: false,

    genresData: [],
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

    this.updateAllMoviesData('', 1).catch(() => {
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

  updateAllMoviesData = async (query, page) => {
    this.setState({
      isAllLoading: true,
    })
    const newData = await getNewMoviesData(query, page)
    this.setState({
      allActiveQuery: query,
      allMoviesData: newData.moviesData,
      allTotalResults: newData.totalResults,
      allActivePage: newData.activePage,
      isAllError: false,
      isAllLoading: false,
    })
  }

  updateGenresData = async () => {
    const genresData = await getGenres()
    this.setState({
      genresData: genresData,
    })
  }

  updateRatedMoviesData = async (page) => {
    this.setState({
      isRatedLoading: true,
    })
    const newData = await getRatedMoviesData(page)
    this.setState({
      ratedMoviesData: newData.moviesData,
      ratedTotalResults: newData.totalResults,
      ratedActivePage: newData.activePage,
      isRatedError: false,
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

  changeRequest = async (newRequest) => {
    await this.updateAllMoviesData(newRequest, 1)
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

  changePage = async (newPage) => {
    if (this.state.isRatedTabActive) {
      await this.updateRatedMoviesData(newPage)
    } else {
      await this.updateAllMoviesData(this.state.allActiveQuery, newPage)
    }
  }

  render() {
    return (
      <Flex className={'mpWrap'} justify={'center'}>
        <Flex className={'mpContentList'} vertical={true} justify={'space-between'}>
          <Flex component={'header'} className={'mpContentList__header'} justify={'center'} align={'center'}>
            <TabsPanel changeTab={this.changeTab} />
          </Flex>
          <Flex component={'main'} className={'mpContentList__main'} vertical={true} align={'center'}>
            {this.state.isRatedTabActive ? null : <SearchPanel changeRequest={this.changeRequest} />}
            <GenresProvider value={this.state.genresData}>
              <MoviesList
                moviesData={this.state.isRatedTabActive ? this.state.ratedMoviesData : this.state.allMoviesData}
                isError={this.state.isRatedTabActive ? this.state.isRatedError : this.state.isAllError}
                isLoading={this.state.isRatedTabActive ? this.state.isRatedLoading : this.state.isAllLoading}
                setMovieRate={this.setMovieRate}
              />
            </GenresProvider>
          </Flex>
          <Flex component={'footer'} className={'mpContentList__footer'} justify={'center'} align={'center'}>
            <PaginationPanel
              changePage={this.changePage}
              totalResults={this.state.isRatedTabActive ? this.state.ratedTotalResults : this.state.allTotalResults}
              activePage={this.state.isRatedTabActive ? this.state.ratedActivePage : this.state.allActivePage}
            />
          </Flex>
        </Flex>
      </Flex>
    )
  }
}
