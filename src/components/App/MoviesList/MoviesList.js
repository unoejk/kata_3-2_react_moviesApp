
// react
import React from 'react'
import ReactDOM from 'react-dom/client'

// libs
import { Flex } from 'antd'

// style
import './MoviesList.css'

// store
// import {takeMeName} from '../../stores/takeMeName'

// components
import MovieCard from './MovieCard/MovieCard'


// ---- go-go

const MoviesList=(props)=>{
    const moviesElems=props.moviesData.map(val=>{
        // const {id,...valWithoutId}=val
        return (
            <MovieCard
                key={val.id}
                {...val}
            />
        )
    })
    return(
        <Flex
            component={'ul'}
            className={'moviesList'}
            gap={'32px 0'}
            justify={'space-between'}
        >
            {moviesElems}
        </Flex>
    )
}

MoviesList.defaultProps={
    moviesData:[],
}
MoviesList.propTypes={
    moviesData:(props, propName, componentName)=>{
        if (!Array.isArray(propName))
            return null
        return new TypeError(`${componentName}: ${propName} must be array`)
    },
}

export default MoviesList
