// react
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Tag } from 'antd'

// libs
import {Flex} from 'antd'

// style
// import './takeMeName.css'

// store
// import {takeMeName} from '../../stores/takeMeName'

// components
// import takeMeName from '../takeMeName/takeMeName'


// ---- go-go

export default class Card extends React.Component {
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

    tagsElems=this.props.tagsData.map(val=>{
        return(
            <Tag
                key={val}
                component={'li'}
            >
                {val}
            </Tag>
        )
    })

    render() {return(
        <Flex
            component={'ul'}
        >
            {this.tagsElems}
        </Flex>
    )}
}
