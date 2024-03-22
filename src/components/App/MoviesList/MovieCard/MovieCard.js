// react
import React from 'react'
import ReactDOM from 'react-dom/client'

// libs
import { Card, Flex, Image, Tag } from 'antd'
import { format, parseISO } from 'date-fns'

// style
import './MovieCard.css'

// store
// import {takeMeName} from '../../stores/takeMeName'

// components
import TagsList from './TagsList/TagsList'


// ---- go-go

export default class MovieCard extends React.Component {
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

    // сокращает описание до максимального количества символов
    // обрезка после пробелов с округлением вниз
    mutateDescription=(desc='There is no description',length=50)=>{
        if (desc.length<length+1)
            return desc
        let counter=length
        while (desc[counter]!==' '){
            if (counter===0)
                return desc.slice(0,length+1)
            counter--
        }
        return desc.slice(0,counter+1)+'...'
    }

    render() {
        return (
            <Flex
                // Целая карточка
                component={'li'}
                className={'movieCard'}
            >
                <Image
                    // Постер
                    rootClassName={'movieCard__poster'}
                    src={this.props.poster}
                    fallback={'https://www.yilmaztraktor.com/ortak/public/img/not-found.jpg'}
                    alt={'poster'}
                    style={{
                        objectFit:'cover',
                        width:'180px',
                        height:'100%',
                        flexShrink:'0',
                    }}
                ></Image>
                <Card
                    // Сраная карточка
                    className={'movieCard__article'}
                    title={this.props.title}
                    extra={'extra'}
                    actions={['action']}
                    bordered={false}
                >
                    <span className={'movieCard__time'}>{this.props.date?format(parseISO(this.props.date),'MMMM d, yyyy'):null}</span>
                    <TagsList tagsData={['tag_1','tag_2']}/>
                    <p className={'movieCard__description'}>
                        {this.mutateDescription(this.props.description)}
                    </p>
                </Card>
            </Flex>
        )
    }
}
