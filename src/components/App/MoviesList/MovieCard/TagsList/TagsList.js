// react
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Tag } from 'antd'

// libs
import {Flex} from 'antd'

// style
import './TagsList.css'

// store
// import {takeMeName} from '../../stores/takeMeName'

// components
// import takeMeName from '../takeMeName/takeMeName'


// ---- go-go

export default class TagsList extends React.Component {
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
                className={'tagsList__tag'}
            >
                {val}
            </Tag>
        )
    })

    render() {return(
        <Flex
            component={'ul'}
            className={'tagsList'}
        >
            {this.tagsElems}
        </Flex>
    )}
}
