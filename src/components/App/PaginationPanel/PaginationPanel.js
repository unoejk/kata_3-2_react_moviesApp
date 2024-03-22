// react
import React from 'react'
import ReactDOM from 'react-dom/client'

// libs
import {Pagination} from 'antd'

// style
import './PaginationPanel.css'

// store
// import {takeMeName} from '../../stores/takeMeName'

// components
// import takeMeName from '../takeMeName/takeMeName'


// ---- go-go

export default class PagesPanel extends React.Component {
    // static defaultProps={
    //     takeMeName:'',
    // }
    // static propTypes={
    //     takeMeName:(props, propName, componentName)=>{
    //         if (typeof props[propName]==='string')
    //             return null
    //         return new TypeError(`${componentName}: ${propName} must be string`)
    //     },
    // }

    // state={
    //     takeMeName:'takeMeName',
    // }

    // takeMeName=(takeMeName)=>{
    //     this.setState({
    //         takeMeName:takeMeName,
    //     })
    // }

    render() {
        return (
            <Pagination
                defaultCurrent={1}
                defaultPageSize={5}
                total={20}
            />
        )
    }
}
