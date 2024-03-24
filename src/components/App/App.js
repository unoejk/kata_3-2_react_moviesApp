
// react
import React from 'react'
import ReactDOM from 'react-dom/client'

// libs
import { Flex, Spin } from 'antd'

// style
import './App.css'

// store
import {getNewMoviesData} from '../../stores/fetch'
import {debounce} from '../../stores/other'

// components
import TabsPanel from './TabsPanel/TabsPanel'
import SearchPanel from './SearchPanel/SearchPanel'
import MoviesList from './MoviesList/MoviesList'
import PaginationPanel from './PaginationPanel/PaginationPanel'

// ---- go-go

// console.log(getMoviesData())
// const funcName=async ()=>{
//     const data=await getMoviesData()
//     console.log(data[0])
// }
// funcName()

export default class Card extends React.Component {
    state={
        moviesData:[],      // массив с фильмами
        activeQuery:'',     // текущий поиск
        activePage:1,       // текущая страница
        totalResults:0,     // всего результатов, чтобы было правильное количество страниц
        isError:false,
        isLoading:false,
    }

    async componentDidMount(){
        await this.updateMoviesData('',1)
    }

    // Закачка фильмов с проверкой на ошибки
    // проверка на ошибки после влияет на отображение MoviesList
    updateMoviesData=async (query,page)=>{

        // разрыв сети
        if (!navigator.onLine) {
            this.setState({
                isError:'u was disconnected',
            })
            return
        }

        try {
            this.setState({
                // флаг загрузки
                isLoading:true,
            })
            const newData=await getNewMoviesData(query,page)
            this.setState({
                // обновления для компонентов
                activeQuery:query,                  // текущий поиск
                moviesData:newData.moviesData,      // массив с фильмами
                totalResults:newData.totalResults,  // всего результатов, чтобы было правильное количество страниц
                activePage:newData.activePage,      // текущая страница
                // сброс загрузки и ошибки
                isError:false,
                isLoading:false,
            })
        }catch (e){
            this.setState({
                // ошибку выдать, загрузку убрать
                isError:'Some error, its our problem',
                isLoading:false,
            })
        }
    }

    // ---------------- forTabsPanel

    // ---------------- forSearchPanel

    // Новый input: поиск из SearchPanel, страницу на 1
    changeRequest=async (newRequest)=>{
        await this.updateMoviesData(newRequest,1)
    }

    // ---------------- forMoviesList

    // ---------------- forPaginationPanel

    // Новая страница: поиск из текущего, страница из PaginationPanel
    changePage=async (newPage)=>{
        await this.updateMoviesData(this.state.activeQuery,newPage)
    }

    render() {
        return (
            <Flex
                className={'mpWrap'}
                justify={'center'}
            >
                <Flex
                    className={'mpContentList'}
                    vertical={true}
                    justify={'space-between'}
                >
                    <Flex
                        component={'header'}
                        className={'mpContentList__header'}
                        justify={'center'}
                        align={'center'}
                    >

                        {/*********--------*/}
                        <TabsPanel/>
                        {/*--------*********/}

                    </Flex>
                    <Flex
                        component={'main'}
                        className={'mpContentList__main'}
                        vertical={true}
                        align={'center'}
                    >
                        {/*********--------*/}
                        <SearchPanel
                            changeRequest={this.changeRequest}  // хук для нового поиска
                        />
                        {/*--------*********/}

                        {/*********--------*/}
                        <MoviesList
                            moviesData={this.state.moviesData}  // массив с фильмами
                            isError={this.state.isError}        // флаг чтобы компонент показывал ошибку
                            isLoading={this.state.isLoading}    // флаг чтобы компонент показывал загрузку
                        />
                        {/*--------*********/}

                    </Flex>
                    <Flex
                        component={'footer'}
                        className={'mpContentList__footer'}
                        justify={'center'}
                        align={'center'}
                    >

                        {/*********--------*/}
                        <PaginationPanel
                            changePage={this.changePage}            // хук для новой страницы
                            totalResults={this.state.totalResults}  // всего результатов, чтобы было правильное количество страниц
                            activePage={this.state.activePage}      // текущая страница
                        />
                        {/*--------*********/}

                    </Flex>
                </Flex>
            </Flex>
        )
    }
}
