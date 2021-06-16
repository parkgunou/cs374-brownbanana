import { Layout, Form, Input, Button, List } from 'antd';
import React from 'react';

import { getFirebaseDB } from '../Firebase';
import { HeaderNoProfile } from '../components/Header';
import { Stylist } from '../models/Stylist';
import { Menus } from '../models/Menus';
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
      "stylists": [],
      "whole_stylists": [],
      "menus": {},
      "name": "",
      "style": "",
      "hairshop": "",
    }
  }

  componentDidMount() {
    getFirebaseDB('stylists')
      .orderByKey()
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
        self.setState({ 
            "stylists": stylists,
            "whole_stylists": stylists
        });
      })
      .catch(error => console.log(error));
    getFirebaseDB('menus')
      .orderByKey()
      .once('value')
      .then(snapshot => {
        if (!snapshot.exists()) {
          alert("No record in DB for menus");
          return
        }

        var self = this;
        var menus = {};
        snapshot.forEach(function(snap, index) {
          const data = snap.val();
          const menu = new Menus(snap.key, data);

          menus[snap.key] = menu;
        })
        self.setState({ 
            "menus": menus
        });
      })
      .catch(error => console.log(error));
  }

  onUpdateName(name) {
    this.setState(
      { name: name },
      this.filterStylists
    );
  }

  onUpdateStyle(style) {
    this.setState(
      { style: style },
      this.filterStylists
    );
  }

  onUpdateHairshop(hairshop) {
    this.setState(
      { hairshop: hairshop },
      this.filterStylists
    );
  }

  filterStylists() {
    let currentStylists = this.state.whole_stylists;

    // filter by name
    if (this.state.name) {
      currentStylists = currentStylists.filter(s => {
        return s.name.toLowerCase().includes(this.state.name.toLowerCase());
      });
    }

    // filter by style
    if (this.state.style) {
    const styleFilteredStylists = [];
      currentStylists.forEach(s => {
        const hasMenu = s.menu_keys.some(k => {
          return this.state.menus[k].name.toLowerCase().includes(this.state.style.toLowerCase());
        });
        if (hasMenu) {
          styleFilteredStylists.push(s);
        }
      });
      currentStylists = styleFilteredStylists;
    }

    // filter by salon
    if (this.state.hairshop) {
      currentStylists = currentStylists.filter(s => {
        return s.salon.toLowerCase().includes(this.state.hairshop.toLowerCase());
      });
    }

    this.setState({
      "stylists": currentStylists
    });
  }

  onClickSearchAgain(){
    document.getElementById("search_form").reset();
    this.setState({ "stylists": this.state.whole_stylists });
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
              <Input
                id= "name_input"
                onChange= {(evt) => {this.onUpdateName(evt.target.value)}}
                placeholder = "Enter stylist's name.." />
            </Form.Item>
            <Form.Item name = "style"
              label = "Style"
              rules = {
                [{
                  message: "e.g.) volume magic perm"
                }]
              } >
              <Input
                id = "style_input"
                onChange= {(evt) => {this.onUpdateStyle(evt.target.value)}}
                placeholder = "e.g.) volume magic perm" />
            </Form.Item> 
            <Form.Item name = "salon"
              label = "Hairshop"
              rules = {
                [{
                  message: "e.g.) Hongdae Hairshop"
                }]
              } >
              <Input
                id= "salon_input"
                onChange= {(evt) => {this.onUpdateHairshop(evt.target.value)}}
                placeholder = "e.g.) Hongdae Hairshop" />
            </Form.Item> 
            <Button type = "primary"
              htmlType = "submit"
              id = "searchagain"
              onClick= { () => {this.onClickSearchAgain()}}>
              Clear Search
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