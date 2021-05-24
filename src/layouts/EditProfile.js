import React from 'react';
import ReactDom from 'react-dom';
import { Button, Col, Input, Layout, Row, Space, Typography } from 'antd';
import { HeaderWithoutSearch } from '../components/Header';
import ProfileView from './ProfileView';
import { getFirebaseDB, uploadImageFile } from '../Firebase';
import { Stylist } from '../models/Stylist';
import { ImageUploadButton } from '../components/ImageUploadButton';
import '../css/CreateProfile.css';

const { Text } = Typography;
const { Content } = Layout;
const { TextArea } = Input;

export default class EditProfile extends React.Component {

  constructor(props) {
    super(props);
    this.stylist = props.stylist;
    this.imageList = this.stylist.profile_img_url !== "" ? [{
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: this.stylist.profile_img_url,
    }] : []
    this.state = {
      intro: this.stylist.intro,
      name: this.stylist.name,
      salon: this.stylist.salon,
      profile_img_urls: this.imageList,
      img_changed: false
    }

    this.handleFilelistChange = this.handleFilelistChange.bind(this);
    this.onUpdateName = this.onUpdateName.bind(this);
    this.onUpdatesalon = this.onUpdatesalon.bind(this);
    this.onUpdateintro = this.onUpdateintro.bind(this);
    this.clickSave = this.clickSave.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  handleFilelistChange(filelist) {
    this.setState({ 
      profile_img_urls: filelist,
      img_changed: true
    });
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
    if (this.state.img_changed) {
      uploadImageFile(this.state.profile_img_urls[0])
        .then(url => {
          getFirebaseDB('stylists/'+this.stylist.key).set({
            name:this.state.name,
            salon:this.state.salon,
            intro:this.state.intro,
            profile_img_url:url,
            created_at:this.stylist.created_at,
            menu_keys:this.stylist.menu_keys,
            review_keys:this.stylist.review_keys,
            style_keys:this.stylist.style_keys
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
    } else {
      getFirebaseDB('stylists/'+this.stylist.key).set({
        name:this.state.name,
        salon:this.state.salon,
        intro:this.state.intro,
        profile_img_url:this.stylist.profile_img_url,
        created_at:this.stylist.created_at,
        menu_keys:this.stylist.menu_keys,
        review_keys:this.stylist.review_keys,
        style_keys:this.stylist.style_keys
      })
      .then(result => {
        ReactDom.render(
          <React.StrictMode>
            <ProfileView name={this.state.name} />
          </React.StrictMode>,
          document.getElementById('root')
        );
      })
    }
  }
    

  componentDidMount() {
    getFirebaseDB('stylists')
      .orderByChild('name').equalTo(this.stylist.name)
      .limitToFirst(1)
      .once('value')
      .then(snapshot => {
        if (!snapshot.exists()) {
          alert("No record in DB for profile");
          return
        }

        var self = this;
        snapshot.forEach( function(snap, index) {
          const data = snap.val();
          const stylist = new Stylist(snap.key, data);
          
          self.setState({ "stylist": stylist });
        })
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <Layout className = "layout" >
        <HeaderWithoutSearch/>
        <Content style={{ paddingLeft: '20%', paddingRight: '20%' }} >
          <Row className='createprofile-box'>
            <Col span={3} />
            <Col span={5}>
                <Text strong>Profile Image</Text>
              <ImageUploadButton
                max={1}
                filelist={this.state.profile_img_urls}
                onFilelistChange={this.handleFilelistChange}
              />
            </Col>
            <Col span={3} />
            <Col span={12}>
              <Space direction='vertical' className='createprofile-contents'>
                <Text strong>Name</Text>
                <Input
                  size='large'
                  value={this.state.name}
                  onChange={(evt) => {
                    this.onUpdateName(evt.target.value)
                  }}  
                />
                <Text strong>Current Workplace</Text>
                  <Input
                    size='large'                     
                    value={this.state.salon}
                    onChange={(evt) => {
                      this.onUpdatesalon(evt.target.value)}}  
                  />
                <Text strong>About me</Text>
                  <TextArea
                    size='large'
                    value={this.state.intro}
                    showCount maxLength={500}
                    onChange={(evt) => {
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
