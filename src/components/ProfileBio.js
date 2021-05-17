import { Avatar, Col, Layout, Row, Space, Typography } from 'antd';
import React from 'react';

import '../css/Bio.css'

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
      follwerCount: 42,
      information: props.stylist.intro,
    }
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
            </Space>
          </Col>
        </Row>
      </Content>
    );
  }
}