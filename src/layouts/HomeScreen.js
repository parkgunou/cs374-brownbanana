import React from 'react'
import ReactDom from 'react-dom';
import { Divider, Space, Layout, Button } from 'antd';

import { getFirebaseDB } from '../Firebase';
import { Stylist } from '../models/Stylist';
import { HeaderNoProfile } from '../components/Header';
import ProfileView from './ProfileView';

import '../css/HomeScreen.css';

const { Content } = Layout;

export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = { "stylists": []};
  }

  componentDidMount() {
    getFirebaseDB('stylists')
      .orderByChild('name')
      .limitToFirst(5)
      .once('value')
      .then(snapshot => {
        if (!snapshot.exists()) {
          alert("No record in DB for profile");
          return;
        }

        let stylistNames = [];
        snapshot.forEach((snap, index) => {
          const stylist = new Stylist(snap.val());
          stylistNames.push(stylist.name);
        });
        this.setState({ "stylists": stylistNames });
      })
      .catch(error => console.log(error));
  }

  onClickExistingProfile(name) {
    ReactDom.render(
      <React.StrictMode>
        <ProfileView name={name} />
      </React.StrictMode>,
      document.getElementById('root')
    );
  }

  render() {
    return (
      <Layout className="layout">
        <HeaderNoProfile className="background" />
        <Content className="background" style={{ paddingTop: '10%', paddingBottom: '10%' }} >
          <Space direction="vertical" align="center" size={20} style={{ width: '100%' }}>
            <Button className="navbutton" type="primary" block>Search for stylist</Button>
            <Divider />
            <Button className="navbutton" type="default" block>Create new profile</Button>
            <Divider />
            {
              this.state.stylists.map(x => {
                return(
                  <Button
                    className="navbutton"
                    key={x}
                    block
                    onClick={() => { this.onClickExistingProfile(x); }} >
                    Log in as existing stylist {x}
                  </Button>
                );
              })
            }
          </Space>
        </Content>
      </Layout>
    );
  }
}
