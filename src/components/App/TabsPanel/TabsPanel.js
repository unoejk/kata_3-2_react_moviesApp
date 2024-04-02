// react
import React from 'react'
// libs
import { Tabs } from 'antd'
// style
import './TabsPanel.css'

// ---------------- go-go

export default class TabsPanel extends React.Component {
  static defaultProps = {
    changeTab: () => {},
  }
  static propTypes = {
    changeTab: (props, propName, componentName) => {
      if (typeof props[propName] === 'function') return null
      return new TypeError(`${componentName}: ${propName} must be function`)
    },
  }

  onChange = (e) => {
    this.props.changeTab(e)
  }

  render() {
    return (
      <Tabs
        items={[
          { key: 'search', label: 'Search' },
          { key: 'rated', label: 'Rated' },
        ]}
        defaultActiveKey={'Search'}
        onChange={this.onChange}
      />
    )
  }
}
