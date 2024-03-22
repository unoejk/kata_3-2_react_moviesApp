// react
import React from 'react'
import ReactDOM from 'react-dom/client'

// libs
import {Tabs} from 'antd'

// style
import './TabsPanel.css'

// store
// import {takeMeName} from '../../stores/takeMeName'

// components
// import takeMeName from '../takeMeName/takeMeName'


// ---- go-go

export default class TabsPanel extends React.Component {
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
            <Tabs
                items={[
                    {key:'Search',label:'Search'},
                    {key:'Rated',label:'Rated'}
                ]}
                defaultActiveKey={'Search'}
                onChange={this.onChange}
            />
        )
    }
}
