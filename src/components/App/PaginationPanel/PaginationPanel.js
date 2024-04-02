// react
import React from 'react'
// libs
import { Pagination } from 'antd'
// style
import './PaginationPanel.css'

// ---------------- go-go

export default class PagesPanel extends React.Component {
  static defaultProps = {
    changePage: () => {},
    totalResults: 0,
    activePage: 1,
  }
  static propTypes = {
    changePage: (props, propName, componentName) => {
      if (typeof props[propName] === 'function') return null
      return new TypeError(`${componentName}: ${propName} must be function`)
    },
    totalResults: (props, propName, componentName) => {
      if (typeof props[propName] === 'number') return null
      return new TypeError(`${componentName}: ${propName} must be number`)
    },
    activePage: (props, propName, componentName) => {
      if (typeof props[propName] === 'number') return null
      return new TypeError(`${componentName}: ${propName} must be number`)
    },
  }

  onChange = (e) => {
    this.props.changePage(e)
  }

  render() {
    return (
      <Pagination
        current={this.props.activePage}
        pageSize={20} // элементов на странице    (количество страниц = total/pageSize)
        total={this.props.totalResults} // всего элементов          (количество страниц = total/pageSize)
        onChange={this.onChange}
        showSizeChanger={false}
      />
    )
  }
}
