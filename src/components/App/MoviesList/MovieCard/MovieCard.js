// react
import React from 'react'
// libs
import { Flex, Image, Rate } from 'antd'
import { format, parseISO } from 'date-fns'

// style
import './MovieCard.css'
// components
import GenresList from './GenresList/GenresList'

// ---------------- go-go

export default class MovieCard extends React.Component {
  static defaultProps = {
    date: '',
    description: '',
    genreIds: [],
    id: 0,
    myRate: null,
    poster: '',
    rating: 0,
    setMovieRate: () => {},
    title: '',
  }
  static propTypes = {
    date: (props, propName, componentName) => {
      if (typeof props[propName] === 'string') return null
      return new TypeError(`${componentName}: ${propName} must be string`)
    },
    description: (props, propName, componentName) => {
      if (typeof props[propName] === 'string') return null
      return new TypeError(`${componentName}: ${propName} must be string`)
    },
    genreIds: (props, propName, componentName) => {
      if (!Array.isArray(propName)) return null
      return new TypeError(`${componentName}: ${propName} must be array`)
    },
    id: (props, propName, componentName) => {
      if (typeof props[propName] === 'number') return null
      return new TypeError(`${componentName}: ${propName} must be number`)
    },
    myRate: (props, propName, componentName) => {
      if (typeof props[propName] === 'number' || props[propName] === null) return null
      return new TypeError(`${componentName}: ${propName} must be number or null`)
    },
    poster: (props, propName, componentName) => {
      if (typeof props[propName] === 'string') return null
      return new TypeError(`${componentName}: ${propName} must be string`)
    },
    rating: (props, propName, componentName) => {
      if (typeof props[propName] === 'number') return null
      return new TypeError(`${componentName}: ${propName} must be number`)
    },
    setMovieRate: (props, propName, componentName) => {
      if (typeof props[propName] === 'function') return null
      return new TypeError(`${componentName}: ${propName} must be function`)
    },
    title: (props, propName, componentName) => {
      if (typeof props[propName] === 'string') return null
      return new TypeError(`${componentName}: ${propName} must be string`)
    },
  }

  state = {
    rate: 0,
  }

  async componentDidMount() {
    if (this.props.myRate !== null) {
      this.setState({
        rate: this.props.myRate,
      })
    }
  }

  mutateDescription = (desc = 'There is no description', length = 100) => {
    if (desc.length < length + 1) return desc
    let counter = length
    while (desc[counter] !== ' ') {
      if (counter === 0) return desc.slice(0, length + 1)
      counter--
    }
    return desc.slice(0, counter + 1) + '...'
  }

  getRatingStyle = () => {
    let res = 'movieCard__rating'
    const rating = this.props.rating.toFixed(1)
    if (rating <= 3) return (res += ' movieCard__rating--zero')
    if (rating > 3 && rating <= 5) return (res += ' movieCard__rating--three')
    if (rating > 5 && rating <= 7) return (res += ' movieCard__rating--five')
    if (rating > 7) return (res += ' movieCard__rating--seven')
    return res
  }

  onChangeRate = (e) => {
    this.setState({
      rate: e,
    })
    this.props.setMovieRate(this.props.id, e)
  }

  render() {
    return (
      <Flex component={'li'} className={'movieCard'}>
        <Image
          rootClassName={'movieCard__poster movieCard__posterDesktop'}
          src={this.props.poster}
          fallback={'https://www.yilmaztraktor.com/ortak/public/img/not-found.jpg'}
          alt={this.props.title}
        ></Image>
        <div className={'movieCard__article'}>
          <div className={'movieCard__topBlock'}>
            <Image
              rootClassName={'movieCard__poster movieCard__posterMobile'}
              src={this.props.poster}
              fallback={'https://www.yilmaztraktor.com/ortak/public/img/not-found.jpg'}
              alt={this.props.title}
            ></Image>
            <div className={'movieCard__topContent'}>
              <div className={'movieCard__header'}>
                <h2 className={'movieCard__name'}>{this.mutateDescription(this.props.title, 40)}</h2>
                <div className={this.getRatingStyle()}>{this.props.rating.toFixed(1)}</div>
              </div>
              <span className={'movieCard__time'}>
                {this.props.date ? format(parseISO(this.props.date), 'MMMM d, yyyy') : null}
              </span>
              <div className={'movieCard__genres'}>
                <GenresList genreIds={this.props.genreIds} />
              </div>
            </div>
          </div>
          <p className={'movieCard__description'}>{this.mutateDescription(this.props.description)}</p>
          <div className={'movieCard__rate'}>
            <Rate count={10} allowHalf value={this.state.rate} onChange={this.onChangeRate} />
          </div>
        </div>
      </Flex>
    )
  }
}
