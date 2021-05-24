import { Avatar, Button, Col, Layout, Row, Space, Typography } from 'antd';
import React from 'react';
import EditProfile from '../layouts/EditProfile'
import ReactDom from 'react-dom';

import '../css/Bio.css'
import { NotificationButton } from './NotificationButton';

const { Content } = Layout;
const { Paragraph, Text, Title } = Typography;

export default class ProfileBio extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.stylist.name,
      image: props.stylist.profile_img_url, //URI
      location: props.stylist.salon,
      reviews: props.stylist.review_keys,
      followerCount: 42,
      information: props.stylist.intro,
    }
    this.onClickEditProfile = this.onClickEditProfile.bind(this);
  }

  getRating() {
    return 4.58;
  }

  onClickEditProfile() {
    ReactDom.render(
      <React.StrictMode >
        <EditProfile 
          stylist={this.props.stylist}
        />
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
                <Text className="spannedline" >Followers <b>{this.state.followerCount}</b></Text>
                <Text className="spannedline" >Rating <b>{this.getRating()}</b></Text>
              </div>
              <Paragraph ellipsis={{ rows: 3, expandable: true }}>
                {this.state.information}
              </Paragraph>
              <Space direction="horizontal">
                <Button onClick={() => {this.onClickEditProfile(this.name)}}>Edit Profile</Button>
                <NotificationButton followerCount={this.state.followerCount} />
              </Space>
            </Space>
          </Col>
        </Row>
      </Content>
    );
  }
}