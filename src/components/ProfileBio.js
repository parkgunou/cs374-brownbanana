import { Avatar, Col, Layout, Row, Space, Typography } from 'antd';
import React from 'react';

import '../css/Bio.css'

const { Content } = Layout;
const { Paragraph, Text, Title } = Typography;

const dummyData = {
  name: "Peggy",
  image: "https://images.unsplash.com/photo-1481349518771-20055b2a7b24?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cmFuZG9tfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80",
  location: "KAIST Hair Salon",
  reviews: [
    "review1",
    "review2",
  ],
  follwerCount: 42,
  information: "Hi, my name is Peggy. I have more than 9 years of experience. If you want to look cool, come to me!"
};

export default class ProfileBio extends React.Component {
  constructor(props) {
    super(props);

    this.profile = {
      name: "",
      image: "", //URI
      location: "",
      reviews: [],
      follwerCount: 0,
      information: "",
    }
    this.profile = dummyData;
  }

  getRating() {
    return 4.58;
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
              <Avatar src={this.profile.image} size={150} />
            </div>
          </Col>
          <Col flex="auto">
            <Space className="container" direction="vertical" size={10} style={{ height: '100%' }}>
              <Title>{this.profile.name}</Title>
              <Text type="secondary">{this.profile.location}</Text>
              <div>
                <Text className="spannedline" >Reviews <b>{this.profile.reviews.length}</b></Text>
                <Text className="spannedline" >Followers <b>{this.profile.follwerCount}</b></Text>
                <Text className="spannedline" >Rating <b>{this.getRating()}</b></Text>
              </div>
              <Paragraph ellipsis={{ rows: 3, expandable: true }}>
                {this.profile.information}
              </Paragraph>
            </Space>
          </Col>
        </Row>
      </Content>
    );
  }
}