import React from 'react';
import { Typography, Divider, Space, Image, Row, Col } from 'antd';
import { MessageOutlined, StarOutlined, EyeOutlined } from '@ant-design/icons';

import '../css/SearchList.css';

const { Title, Text } = Typography;

const IconText = ({ icon, text }) => ( <
    Space > { React.createElement(icon) } { text } <
    /Space>
);

export default class SearchListItem extends React.Component {
    render() {
        return ( <
            Row className = 'search-list' >
            <
            Col span = { 18 } >
            <
            Space direction = 'vertical'
            className = 'search-results' >
            <
            Title level = { 4 }
            strong className = "stylist-name" > { this.props.name } < /Title>  <
            Space direction = 'horizontal'
            className = "profile-infos" >
            <
            IconText icon = { StarOutlined }
            text = { this.props.rating }
            />   <
            Divider type = 'vertical' / >
            <
            IconText icon = { MessageOutlined }
            text = { this.props.reviews }
            />  <
            Divider type = 'vertical' / >
            <
            IconText icon = { EyeOutlined }
            text = { this.props.followers }
            />< /
            Space > <
            Text type = 'primary'
            className = "profile-intro" > { this.props.intro } < /Text> <
            Text type = 'secondary'
            className = "profile-salon"
            strong > { this.props.salon } < /Text> < /
            Space > < /
            Col > <
            Col span = { 2 }
            /> <
            Col span = { 4 } >
            <
            Image className = 'profile-image'
            src = { this.props.image }
            /> < /
            Col > <
            /Row>
        );
    }
}