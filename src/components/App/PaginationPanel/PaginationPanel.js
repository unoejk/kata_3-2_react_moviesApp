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
    //     totalResults:this.props.totalResults,
    //     activePage:this.props.activePage,
    // }

    // takeMeName=(takeMeName)=>{
    //     this.setState({
    //         takeMeName:takeMeName,
    //     })
    // }

    onChange=(e)=>{
        this.props.changePage(e)
    }

    render() {
        return (
            <Pagination
                current={this.props.activePage}
                pageSize={20}                       // элементов на странице    (количество страниц = total/pageSize)
                total={this.props.totalResults}     // всего элементов          (количество страниц = total/pageSize)
                onChange={this.onChange}
                showSizeChanger={false}
            />
        )
    }
}
