import React from 'react';
import ReactDom from 'react-dom';
import { Row, Col, Layout, Input, Typography, Divider, Button } from 'antd';

import { HeaderWithoutSearch } from '../components/Header';
import { ImageUploadButton } from '../components/ImageUploadButton';
import ProfileView from './ProfileView';
import { getFirebaseDB, uploadImageFile } from '../Firebase';

const { Content } = Layout;
const { TextArea } = Input;
const { Title } = Typography;

export default class NewMenuView extends React.Component {
  constructor(props) {
    super(props);
    this.stylistName = props.name;
    this.state = {
      name: '',
      price: 0,
      timeTaken: 0,
      description: '',
      filelist: [],
      saving: false,
    }

    this.handleFilelistChange = this.handleFilelistChange.bind(this);
    this.onUpdateName = this.onUpdateName.bind(this);
    this.onUpdatePrice = this.onUpdatePrice.bind(this);
    this.onUpdateTimeTaken = this.onUpdateTimeTaken.bind(this);
    this.onUpdateDescription = this.onUpdateDescription.bind(this);
    this.onClickSave = this.onClickSave.bind(this);
  }

  handleFilelistChange(filelist) {
    this.setState({ filelist: filelist });
  }

  onUpdateName(name) {
    this.setState({ name: name });
  }

  onUpdatePrice(price) {
    this.setState({ price: price });
  }

  onUpdateTimeTaken(timeTaken) {
    this.setState({ timeTaken: timeTaken });
  }

  onUpdateDescription(desc) {
    this.setState({ description: desc });
  }

  enterSaving = () => {
    this.setState({ saving: true });
  }

  onClickSave() {
    this.enterSaving();

    const stylistName = this.stylistName;

    const saveMenu = (menuInfo) => {
      const menuDb = getFirebaseDB('menus');
      const newMenuRef = menuDb.push();
      newMenuRef.set(menuInfo);

      return newMenuRef.key;
    };

    const filesToUrls = (filelist, urllist=[], callback) => {
      if (filelist.length > 0) {
        let file = filelist[0];
        uploadImageFile(file)
          .then(url => {
            urllist.push(url);
            filesToUrls(filelist.slice(1), urllist, callback);
          })
      }
      else {
        callback(urllist);
      }
    }

    const saveStyles = (menuKey, images) => {
      const styleDb = getFirebaseDB('styles');
      const styleKeys = images.map(url => {
        const newStyleRef = styleDb.push();
        newStyleRef.set({
          'image_url': url,
          'menu_key': menuKey,
        });
        return newStyleRef.key;
      });
      return styleKeys;
    };

    const updateStylistMenu = (menuKey, styleKeys) => {
      const stylistDb = getFirebaseDB('stylists');
      stylistDb.orderByChild('name').equalTo(stylistName)
        .limitToFirst(1)
        .once("child_added", (snapshot) => {
          if (!snapshot.exists()) {
            alert("No record in DB for profile");
            return;
          }
          
          const newMenuKeys = (snapshot.val()["menu_keys"] ?? []).concat([menuKey]);
          const newStyleKeys = (snapshot.val()["style_keys"] ?? []).concat(styleKeys);

          snapshot.ref.update({
            'menu_keys': newMenuKeys,
            'style_keys': newStyleKeys,
          });
        });
    }

    filesToUrls(this.state.filelist, [], (urllist) => {
      const newMenuKey = saveMenu({
        'name': this.state.name,
        'price': this.state.price,
        'description': this.state.description,
        'image_url': urllist[0],
        'time_comsumed_mins': this.state.timeTaken,
      });

      const newStyleKeys = saveStyles(newMenuKey, urllist);
      updateStylistMenu(newMenuKey, newStyleKeys);

      this.setState({ saving: false });
      this.onClickCancel(stylistName);
    });
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
    headerComp = <HeaderWithoutSearch name={this.stylistName} />;

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
                onChange={(evt) => {this.onUpdateName(evt.target.value)}}
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
                type='number'
                prefix="₩"
                placeholder="Price"
                onChange={(evt) => {this.onUpdatePrice(evt.target.valueAsNumber)}}
              />
            </Col>
          </Row>
          <Row>
            <Col flex="250px" >
              <Title level={4} >Time consumed</Title>
            </Col>
            <Col flex="auto" >
              <Input
                size='large'
                type='number'
                placeholder="Time consumed (minutes)"
                onChange={(evt) => {this.onUpdatePrice(evt.target.valueAsNumber)}}
              />
            </Col>
          </Row>
          <Row>
            <Col flex="250px" >
              <Title level={4} >Information</Title>
            </Col>
            <Col flex="auto" >
              <TextArea
                rows={3}
                onChange={(evt) => {this.onUpdateDescription(evt.target.value)}}
              />
            </Col>
          </Row>
          <Divider orientation='left' >Images</Divider>
          <ImageUploadButton
            max={4}
            filelist={this.state.filelist}
            onFilelistChange={this.handleFilelistChange}
          />
          <Row justify="end" >
            <Button
              type='primary'
              loading={this.state.saving}
              onClick={this.onClickSave}
            >
              Save
            </Button>
            <Button onClick={() => {this.onClickCancel(this.stylistName)}} >Cancel</Button>
          </Row>
        </Content>
      </Layout>
    );
  }
}