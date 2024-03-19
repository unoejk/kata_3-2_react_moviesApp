// react
import React from 'react'
import ReactDOM from 'react-dom/client'

// libs
// import {takeMeName} from 'takeMeName'

// style
// import './takeMeName.css'

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
            <div
                style={{
                    backgroundColor:'tomato',
                    width:'40px',
                    height:'40px',
                }}
            ></div>
        )
    }
}
