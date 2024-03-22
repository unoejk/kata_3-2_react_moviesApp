
// react
import React from 'react'
import ReactDOM from 'react-dom/client'

// libs
import {Flex} from 'antd'

// style
import './App.css'

// store
import {getMoviesData} from '../../stores/fetch'

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
        moviesData:[],
    }

    async updateMoviesData(){
        const moviesData=await getMoviesData()
        this.setState({
            moviesData:moviesData
        })
    }

    async componentDidMount(){
        await this.updateMoviesData()
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
                        <TabsPanel/>
                    </Flex>
                    <Flex
                        component={'main'}
                        className={'mpContentList__main'}
                        vertical={true}
                        align={'center'}
                    >
                        <SearchPanel/>
                        <MoviesList
                            moviesData={this.state.moviesData.slice(0,6)}
                        />
                    </Flex>
                    <Flex
                        component={'footer'}
                        className={'mpContentList__footer'}
                        justify={'center'}
                        align={'center'}
                    >
                        <PaginationPanel/>
                    </Flex>
                </Flex>
            </Flex>
        )
    }
}
