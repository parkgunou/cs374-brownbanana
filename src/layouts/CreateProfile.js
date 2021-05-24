import React from 'react';
import { Typography, Space, Row, Col } from 'antd';
import { Input } from 'antd';
import { Button } from 'antd';
import { HeaderNoProfile } from '../components/Header';
import ReactDom from 'react-dom';
import ProfileView from './ProfileView';
import '../css/CreateProfile.css';
import Layout, { Content } from 'antd/lib/layout/layout';
import { getFirebaseDB, uploadImageFile } from '../Firebase';
import { ImageUploadButton } from '../components/ImageUploadButton';


const { Text } = Typography;
const { TextArea } = Input;

export default class CreateProfile extends React.Component {

  constructor(props) {
    super(props);
    this.stylistName = props.name;
    this.state = {
      intro: '',
      name: '',
      salon: '',
      profile_img_urls:[],
      menu_keys:[],
      style_keys:[],
      review_keys:[]
    }

    this.handleFilelistChange = this.handleFilelistChange.bind(this);
    this.onUpdateName = this.onUpdateName.bind(this);
    this.onUpdatesalon = this.onUpdatesalon.bind(this);
    this.onUpdateintro = this.onUpdateintro.bind(this);
    this.clickSave = this.clickSave.bind(this);
  }

  handleFilelistChange(filelist) {
    this.setState({ profile_img_urls: filelist });
  }

  onUpdateName(name) {
    this.setState({ name: name });
  }

  onUpdatesalon(name) {
    this.setState({ salon: name });
  }

  onUpdateintro(name) {
    this.setState({ intro: name });
  }

  clickSave() {
    var newStylistRef = getFirebaseDB('stylists').push()
    if (this.state.profile_img_urls.length === 0) {
      newStylistRef.set({
        name:this.state.name,
        salon:this.state.salon,
        intro:this.state.intro,
        profile_img_url:""
      })
      .then(result => {
        ReactDom.render(
          <React.StrictMode>
            <ProfileView name={this.state.name} />
          </React.StrictMode>,
          document.getElementById('root')
        );
      })
    } else {
      uploadImageFile(this.state.profile_img_urls[0])
        .then(url => {
          newStylistRef.set({
            name:this.state.name,
            salon:this.state.salon,
            intro:this.state.intro,
            profile_img_url:url           
          })
          .then(result => {
            ReactDom.render(
              <React.StrictMode>
                <ProfileView name={this.state.name} />
              </React.StrictMode>,
              document.getElementById('root')
            );
          })
        })
    }
    
  }

  render() {
    
    return (
      <Layout className = "layout" >
        <HeaderNoProfile/>
        <Content style={{ paddingLeft: '20%', paddingRight: '20%' }} >
          <Row className='createprofile-box'>
            <Col span={3} />
            <Col span={5}>
              <Space direction='vertical' className='createprofile-contents'>
                <Text strong>Profile Image</Text>
                <ImageUploadButton
                  filelist={this.state.profile_img_urls}
                  onFilelistChange={this.handleFilelistChange}
                  />
              </Space>
            </Col>
            <Col span={3} />
            <Col span={12}>
              <Space direction='vertical' className='createprofile-contents'>
                <Text strong>Name</Text>
                <Input
                  size='large'
                  placeholder="Your name"
                  onChange={(evt) => {
                    console.log(evt)
                    this.onUpdateName(evt.target.value)
                  }}  
                />
                <Text strong>Current Workplace</Text>
                  <Input
                    size='large'                     
                    placeholder="e.g) KAIST Hairshop"
                    onChange={(evt) => {
                      console.log(evt)
                      this.onUpdatesalon(evt.target.value)}}  
                  />
                <Text strong>About me</Text>
                  <TextArea
                    size='large'
                    showCount maxLength={500}
                    onChange={(evt) => {
                      console.log(evt)
                      this.onUpdateintro(evt.target.value)}}  
                  />
                <Button type="primary" onClick={() => this.clickSave()}>
                  Save
                </Button>
              </Space>
            </Col>
          </Row>
        </Content>
      </Layout>
    );
  }
}
