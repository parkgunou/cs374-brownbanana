import React from 'react';
import ReactDom from 'react-dom';
import { Row, Col, Layout, Input, Typography, Divider, Button } from 'antd';

import { HeaderWithoutSearch } from '../components/Header';
import { ImageUploadButton } from '../components/ImageUploadButton';
import ProfileView from './ProfileView';
//import { getFirebaseDB } from '../Firebase';
//import { Stylist } from '../models/Stylist';

const { Content } = Layout;
const { TextArea } = Input;
const { Title } = Typography;

export default class NewMenuView extends React.Component {
  constructor(props) {
    super(props)
    this.name = props.name;
    this.state = {}
  }

  onClickCancel(name) {
    ReactDom.render(
      <React.StrictMode>
        <ProfileView name={name} />
      </React.StrictMode>,
      document.getElementById('root')
    );
  }
  render() {
    let headerComp;
    headerComp = <HeaderWithoutSearch name={this.name} />;
    
    return (
      <Layout className = "layout" >
        {headerComp}
        <Content style={{ paddingLeft: '20%', paddingRight: '20%', paddingTop: '20px', paddingBottom: '20px' }} >
          <Title level={1} >Enter a new menu</Title>
          <Divider orientation='left' >Details</Divider>
          <Row>
            <Col flex="250px" >
              <Title level={4} >Style Name</Title>
            </Col>
            <Col flex="auto" >
              <Input
                size='large'
                placeholder="Style name"
              />
            </Col>
          </Row>
          <Row>
            <Col flex="250px" >
              <Title level={4} >Price</Title>
            </Col>
            <Col flex="auto" >
              <Input
                size='large'
                prefix="₩"
                placeholder="Price"
              />
            </Col>
          </Row>
          <Row>
            <Col flex="250px" >
              <Title level={4} >Information</Title>
            </Col>
            <Col flex="auto" >
              <TextArea rows={3} />
            </Col>
          </Row>
          <Divider orientation='left' >Images</Divider>
          <ImageUploadButton max={4} />
          <Row justify="end" >
            <Button type='primary '>Save</Button>
            <Button onClick={() => {this.onClickCancel(this.name)}}>Cancel</Button>
          </Row>
        </Content>
      </Layout>
    );
  }
}