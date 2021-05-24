import { Layout, Skeleton, Tabs } from 'antd';
import React from 'react';

import MenuList from '../components/MenuList';
import ProfileBioNoEdit from '../components/ProfileBioNoEdit';
import ReviewList from '../components/ReviewList';
import ImageList from '../components/ImageList';
import { HeaderNoProfile, HeaderWithoutSearch } from '../components/Header';
import { getFirebaseDB } from '../Firebase';
import { Stylist } from '../models/Stylist';

const { Content } = Layout;
const { TabPane } = Tabs;

export default class ProfileViewOnly extends React.Component {
  constructor(props) {
    super(props)
    this.name = props.name;
    this.state = {}
  }

  componentDidMount() {
    getFirebaseDB('stylists')
      .orderByChild('name').equalTo(this.name)
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
          const stylist = new Stylist(data);
          
          self.setState({ "stylist": stylist });
        })
      })
      .catch(error => console.log(error));
  }

  render() {
    const isLoaded = this.state.stylist?.name ? true : false;
    let headerComp, profileBioComp, stylesComp, reviewsComp, menusComp;
    if (isLoaded) {
      headerComp = <HeaderWithoutSearch name={this.state.stylist.name} />;
      profileBioComp = <ProfileBioNoEdit stylist={this.state.stylist} />;
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
          <Tabs
            defaultActiveKey = "1"
          >
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