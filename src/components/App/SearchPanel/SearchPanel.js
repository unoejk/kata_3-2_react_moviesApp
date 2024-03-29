// react
import React from 'react'
import ReactDOM from 'react-dom/client'

// libs
import {Mentions} from 'antd'

// style
import './SearchPanel.css'

// store
// import {debounce} from '../../../stores/other'
import _ from 'lodash'

// components
// import takeMeName from '../takeMeName/takeMeName'

// function debounce(fn,debounceTime){
//     return function(e){
//         this.counter=this.counter===undefined?1:this.counter+1
//         setTimeout(()=>{
//             this.counter--
//             if (!this.counter){
//                 fn.apply(this,arguments)
//             }
//         },debounceTime)
//     }
// }


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
    //     query:'',
    // }

    // takeMeName=(takeMeName)=>{
    //     this.setState({
    //         takeMeName:takeMeName,
    //     })
    // }

    // apply чтобы запрос моментально не отправлялся
    debounceUpdateMoviesData=_.debounce(this.props.changeRequest,500)
    // debounceUpdateMoviesData=debounce(this.props.changeRequest,500)
    onChange=(e)=>{
        this.debounceUpdateMoviesData(e.trim())
    }

    render() {
        return (
            <Mentions
                className={'searchPanel'}
                onChange={this.onChange}
                placeholder={'Type to search...'}
                autoFocus
            />
        )
    }
}
