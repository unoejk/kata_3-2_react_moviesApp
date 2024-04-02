// react
import React from 'react'
// libs
import { Flex, Spin, Alert } from 'antd'

// style
import './MoviesList.css'
// components
import MovieCard from './MovieCard/MovieCard'

// ---------------- go-go

const MoviesList = (props) => {
  // render если ошибка
  if (props.isError) return <Alert message={'Error: ' + props.isError} type={'error'} />
  // render если загрузка
  if (props.isLoading)
    return (
      <Flex className={'spin'}>
        <Spin size="large" />
      </Flex>
    )

  // render если пусто
  if (props.moviesData[0] === undefined) return <Alert message={'Nothing found'} type={'info'} />
  // render если всё ок
  const moviesElems = props.moviesData.map((val) => {
    // const {id,...valWithoutId}=val
    return <MovieCard key={val.id} {...val} setMovieRate={props.setMovieRate} />
  })
  return (
    <Flex component={'ul'} className={'moviesList'} gap={'32px 0'} justify={'space-between'}>
      {moviesElems}
    </Flex>
  )
}

MoviesList.defaultProps = {
  moviesData: [],
  isError: false,
  isLoading: false,
  setMovieRate: () => {},
}
MoviesList.propTypes = {
  moviesData: (props, propName, componentName) => {
    if (!Array.isArray(propName)) return null
    return new TypeError(`${componentName}: ${propName} must be array`)
  },
  isError: (props, propName, componentName) => {
    if (typeof props[propName] === 'boolean') return null
    return new TypeError(`${componentName}: ${propName} must be boolean`)
  },
  isLoading: (props, propName, componentName) => {
    if (typeof props[propName] === 'boolean') return null
    return new TypeError(`${componentName}: ${propName} must be boolean`)
  },
  setMovieRate: (props, propName, componentName) => {
    if (typeof props[propName] === 'function') return null
    return new TypeError(`${componentName}: ${propName} must be function`)
  },
}

export default MoviesList
