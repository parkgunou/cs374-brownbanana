import { Avatar, Button, Col, Layout, Row, Space, Typography } from 'antd';
import React from 'react';
import EditProfile from '../layouts/EditProfile'
import ReactDom from 'react-dom';

import '../css/Bio.css'

const { Content } = Layout;
const { Paragraph, Text, Title } = Typography;

export default class ProfileBio extends React.Component {
  constructor(props) {
    super(props);

    console.log(props.stylist.profile_img_url)

    this.state = {
      name: props.stylist.name,
      image: props.stylist.profile_img_url, //URI
      location: props.stylist.salon,
      reviews: props.stylist.review_keys,
      follwerCount: 42,
      information: props.stylist.intro,
    }
  }

  getRating() {
    return 4.58;
  }

  onClickEditProfile() {
    ReactDom.render(
      <React.StrictMode >
        <EditProfile name={this.state.name} />
      </React.StrictMode>,
      document.getElementById('root')
    );
  }

  render () {
    return (
      <Content style={{ 
          paddingLeft: '20%',
          paddingRight: '20%'
        }}>
        <Row wrap={false}>
          <Col flex="150px">
            <div className="container" >
              <Avatar src={this.state.image} size={150} />
            </div>
          </Col>
          <Col flex="auto">
            <Space className="container" direction="vertical" size={10} style={{ height: '100%' }}>
              <Title>{this.state.name}</Title>
              <Text type="secondary">{this.state.location}</Text>
              <div>
                <Text className="spannedline" >Reviews <b>{this.state.reviews.length}</b></Text>
                <Text className="spannedline" >Followers <b>{this.state.follwerCount}</b></Text>
                <Text className="spannedline" >Rating <b>{this.getRating()}</b></Text>
              </div>
              <Paragraph ellipsis={{ rows: 3, expandable: true }}>
                {this.state.information}
              </Paragraph>
              <Button onClick={() => {this.onClickEditProfile(this.name)}}>Edit Profile</Button>
            </Space>
          </Col>
        </Row>
      </Content>
    );
  }
}