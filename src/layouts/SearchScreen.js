import { Layout, Form, Input, Button, List } from 'antd';
import React from 'react';

import { getFirebaseDB } from '../Firebase';
import { HeaderNoProfile } from '../components/Header';
import { Stylist } from '../models/Stylist';
import SearchListItem from '../components/SearchListItem';
import '../css/SearchScreen.css';

const formItemLayout = {
  labelCol: { span: 4 },
  wrappercol: { span: 8 }
};

const { Content } = Layout;

export default class SearchScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      "stylists": []
    }
  }

  componentDidMount() {
    getFirebaseDB('stylists')
      .orderByKey()
      .limitToFirst(4)
      .once('value')
      .then(snapshot => {
        if (!snapshot.exists()) {
          alert("No record in DB for profile");
          return
        }

        var self = this
        var stylists = [];
        snapshot.forEach(function(snap, index) {
          const data = snap.val();
          const stylist = new Stylist(snap.key, data);

          stylists.push(stylist);
        })
        self.setState({ "stylists": stylists });
      })
      .catch(error => console.log(error));
  }

  render() {
    return ( 
      <Layout className = 'layout' >
        <span id = "header-no-profile" >
          <HeaderNoProfile />
        </span> 
        <Content className = "background" >
          <div id = "searchFilter" > Filters </div> 
          <Form {...formItemLayout }
            name = "search_form"
            className = "search_forms" >
            <Form.Item name = "stylist-name"
              label = "Name"
              rules = {
                [{
                  message: "Enter stylist's name.."
                }]
              } >
              <Input placeholder = "Enter stylist's name.." />
            </Form.Item>
            <Form.Item name = "style"
              label = "Style"
              rules = {
                [{
                  message: "e.g.) volume magic perm"
                }]
              } >
              <Input placeholder = "e.g.) volume magic perm" />
            </Form.Item> 
            <Form.Item name = "salon"
              label = "Hairshop"
              rules = {
                [{
                  message: "e.g.) Hongdae Hairshop"
                }]
              } >
              <Input placeholder = "e.g.) Hongdae" />
            </Form.Item> 
            <Button type = "primary"
              htmlType = "submit"
              id = "searchagain" >
              Search Again ?
            </Button>  
            <style > @import url('https://fonts.googleapis.com/css2?family=Lato:wght@300&display=swap'); </style>
          </Form > 
        </Content >
        <Content className = "background" >
          <div id = "searchResult" > Search Results </div>  
          <List dataSource = { this.state.stylists }
            renderItem = {
              item => ( <
                SearchListItem name = { item.name }
                  salon = { item.salon }
                  intro = { item.intro }
                  image = { item.profile_img_url }
                  reviews = { item.review_keys.length }
                  followers = '42'
                  rating = '4.58' />
              )
            } /> 
        </Content > 
      </Layout >
    )
  }
}