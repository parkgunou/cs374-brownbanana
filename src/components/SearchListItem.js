import React from 'react';
import ReactDom from 'react-dom'; 
import { Typography, Divider, Space, Image, Row, Col, Button } from 'antd';
import { MessageOutlined, StarOutlined, EyeOutlined } from '@ant-design/icons';
import ProfileViewOnly from '../layouts/ProfileViewOnly';

import '../css/SearchList.css';

const { Paragraph, Title, Text } = Typography;

const IconText = ({ icon, text }) => ( 
  <Space > 
    { React.createElement(icon) } 
    { text } 
  </Space>
);

export default class SearchListItem extends React.Component {
  onClickShowProfile(name) {
    ReactDom.render(
      <React.StrictMode>
        <ProfileViewOnly name={name} />
      </React.StrictMode>,
      document.getElementById('root')
    );
  }

  render() {
    return ( 
      <Row className = 'search-list' >
        <Col span = { 18 } >
          <Space direction = 'vertical'
            className = 'search-results' >
            <Button type= "text"
              onClick= {() => { this.onClickShowProfile(this.props.name); }}>
              <Title level = { 4 }
                strong
                className = "stylist-name" > 
                { this.props.name } 
              </Title>
            </Button>
            <Space direction = 'horizontal'
              className = "profile-infos" >
              <IconText icon = { StarOutlined }
                text = { this.props.rating } />   
              <Divider type = 'vertical' />
              <IconText icon = { MessageOutlined }
                text = { this.props.reviews } />  
              <Divider type = 'vertical' />
              <IconText icon = { EyeOutlined }
                text = { this.props.followers } />
            </Space > 
            <Paragraph ellipsis= {{ rows: 3, expandable: true }} className = "profile-intro" > 
              { this.props.intro } 
            </Paragraph>
            <Text type = 'secondary'
              className = "profile-salon"
              strong > 
              { this.props.salon } 
            </Text> 
          </Space > 
        </Col > 
        <Col span = { 2 } /> 
        <Col span = { 4 } >
          <Image className = 'profile-image'
            src = { this.props.image } /> 
        </Col > 
      </Row>
    );
  }
}