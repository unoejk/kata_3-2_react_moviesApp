// react
import React from 'react'
// libs
import { Flex, Tag } from 'antd'

// style
import './GenresList.css'
// store
import { GenresConsumer } from '../../../../../stores/context'

// ---- go-go

export default class GenresList extends React.Component {
  static defaultProps = {
    genreIds: [],
  }
  static propTypes = {
    genreIds: (props, propName, componentName) => {
      if (!Array.isArray(propName)) return null
      return new TypeError(`${componentName}: ${propName} must be array`)
    },
  }

  getGenreName = (genresData, genId) => {
    let res = genresData.find((item) => item.id === genId)
    if (res === undefined || res.name === undefined) return genId
    else return res.name
  }

  genresElems = this.props.genreIds.map((genId) => {
    return (
      <GenresConsumer key={genId}>
        {(genresData) => {
          return (
            <Tag key={genId} component={'li'} className={'genresList__item'}>
              {this.getGenreName(genresData, genId)}
            </Tag>
          )
        }}
      </GenresConsumer>
    )
  })

  render() {
    return (
      <Flex component={'ul'} className={'genresList'} gap={'4px'} wrap={'wrap'}>
        {this.genresElems}
      </Flex>
    )
  }
}
