// react
import React from 'react'
import ReactDOM from 'react-dom/client'

// libs
import {Mentions} from 'antd'

// style
import './SearchPanel.css'

// store
// import {takeMeName} from '../../stores/takeMeName'

// components
// import takeMeName from '../takeMeName/takeMeName'


// ---- go-go

export default class SearchPanel extends React.Component {
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

    onChange(){
        console.log('onChange')
    }

    render() {
        return (
            <Mentions
                className={'searchPanel'}
                onChange={this.onChange}
                placeholder={'Type to search...'}
            />
        )
    }
}
