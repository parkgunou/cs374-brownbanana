import React from 'react';
import ReactDom from 'react-dom';
import { Button, Col, Input, Layout, Row, Space, Typography } from 'antd';
import { message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { HeaderWithoutSearch } from '../components/Header';
import ProfileView from './ProfileView';
import { getFirebaseDB, uploadImageFile } from '../Firebase';
import { Stylist } from '../models/Stylist';
import { ImageUploadButton } from '../components/ImageUploadButton';
import '../css/CreateProfile.css';


const { Text } = Typography;
const { Content } = Layout;
const { TextArea } = Input;

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

export default class EditProfile extends React.Component {

  constructor(props) {
    super(props);
    this.stylist = props.stylist;
    this.state = {
      intro: this.stylist.intro,
      name: this.stylist.name,
      salon: this.stylist.salon,
      profile_img_urls:[this.stylist.profile_img_url]
    }

    console.log(this.state.profile_img_urls)

    this.handleFilelistChange = this.handleFilelistChange.bind(this);
    this.onUpdateName = this.onUpdateName.bind(this);
    this.onUpdatesalon = this.onUpdatesalon.bind(this);
    this.onUpdateintro = this.onUpdateintro.bind(this);
    this.clickSave = this.clickSave.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  /*
   * TODO:
   * 0. 해당 컴포넌트 로딩 될 때 props로 stylist 이름 받아오기 (ProfileBio.js에서 제대로 넣어주는지 확인하기)
   * 1. componentDidMount 함수에서 스타일리스트 정보 가져와서 this.state에 채우기 (ProfileView.js 참조)
   * 2. 로딩 후에 input 값을 기존 값으로 채워넣기 (ProfileView.js 부분 참조) (placeholder 말고 value로 넣기)
   * 3. Save 시 db.push() 함수가 아닌 쿼리 후 업데이트 활용 (NewMenuView.js의 updateStylistMenu 함수 참조)
   * header profile 있는걸로
   * placeholder 말고 기존 value로
   */

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
    const { loading, imageUrl } = this.state;
    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    
    const { loadings } = this.state;

    return (
      <Layout className = "layout" >
        <HeaderWithoutSearch/>
        <Content style={{ paddingLeft: '20%', paddingRight: '20%' }} >
          <Row className='createprofile-box'>
            <Col span={10}>
                <Text strong>Profile Image</Text>
              <ImageUploadButton
                max={1}
                filelist={this.state.profile_img_urls}
                onFilelistChange={this.handleFilelistChange}
              />
            </Col>
            <Col span={2} />
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
