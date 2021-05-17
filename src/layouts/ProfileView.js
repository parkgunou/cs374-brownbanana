import { Layout, Skeleton, Tabs } from 'antd';
import React from 'react';

import MenuList from '../components/MenuList';
import ProfileBio from '../components/ProfileBio';
import ReviewList from '../components/ReviewList';
import ImageList from '../components/ImageList';
import { HeaderNoProfile, HeaderWithSearch } from '../components/Header';
import { getFirebaseDB } from '../Firebase';

const { Content } = Layout;
const { TabPane } = Tabs;

export default class ProfileView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      "stylist": {}
    }
  }

  componentDidMount() {
    getFirebaseDB('stylists')
      .orderByChild('name').equalTo('Peggy')
      .once('value')
      .then(snapshot => {
        const data = snapshot.val();

        if (data.length < 1) {
          alert("No record in DB for profile");
        }
        else if (data.length > 1) {
          alert("More than 1 record in DB for profile (same name)")
        }
        else {
          this.setState({ "stylist": data[0] });
        }
      });
  }

  render() {
    const isLoaded = this.state.stylist.name ? true : false;
    let headerComp, profileBioComp, stylesComp, reviewsComp, menusComp;
    if (isLoaded) {
      headerComp = <HeaderWithSearch name={this.state.stylist.name} />;
      profileBioComp = <ProfileBio stylist={this.state.stylist} />;
      stylesComp = <ImageList stylekeys={this.state.stylist.style_keys} />;
      reviewsComp = <ReviewList reviewkeys={this.state.stylist.review_keys} />;
      menusComp = <MenuList menukeys={this.state.stylist.menu_keys} />;
    }
    else {
      headerComp = <HeaderNoProfile />;
      profileBioComp = <Skeleton avatar paragraph={{ rows: 4 }} active />;
      stylesComp = <ImageList stylekeys={[]} />;
      reviewsComp = <ReviewList reviewkeys={[]} />;
      menusComp = <MenuList menukeys={[]} />;
    }

    return (
      <Layout className = "layout" >
        {headerComp}
        {profileBioComp}
        <Content style={{ paddingLeft: '20%', paddingRight: '20%' }} >
          <Tabs defaultActiveKey = "1" >
            <TabPane tab = "Styles" key = "1" >
              {stylesComp}
            </TabPane>
            <TabPane tab = "Reviews" key = "2" >
              {reviewsComp}
            </TabPane>
            <TabPane tab = "Menu" key = "3" >
              {menusComp}
            </TabPane>
          </Tabs>
        </Content>
      </Layout>
    );
  }
}