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
      "stylists": [],
      "whole_stylists": []
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
  }

  filterStylists(str){
    var stylistslist = this.state.whole_stylists;
    const input = document.getElementById("name_input");
    const input1 = document.getElementById("style_input");
    const input2 = document.getElementById("salon_input");
    if (str === "name") {
      if(input.value === "" && input1.value === "" && input2.value === ""){
        this.setState({ 
          "stylists": this.state.whole_stylists
        });
      }
      else {
        var filtered_list = [];
        for (var i = 0; i < stylistslist.length; i++) {
          if(stylistslist[i].name.toLowerCase().indexOf(input.value.toLowerCase()) !== -1){
            filtered_list.push(stylistslist[i]);
          }
        }
        this.setState({"stylists": filtered_list});
      }
    }
    else if (str === "salon") {
      if(input.value === "" && input1.value === "" && input2.value === ""){
        this.setState({ 
          "stylists": this.state.whole_stylists
        });
      }
      else {
        var filtered_list1 = [];
        for (var j = 0; j < stylistslist.length; j++) {
          if(stylistslist[j].salon.toLowerCase().indexOf(input2.value.toLowerCase()) !== -1){
            filtered_list1.push(stylistslist[j]);
          }
        }
        this.setState({"stylists": filtered_list1});
      }
    }
  }

  onClickSearchAgain(){
    console.log("search again!");
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
              <Input id= "name_input" onKeyUp= {() => {this.filterStylists("name")}} placeholder = "Enter stylist's name.." />
            </Form.Item>
            <Form.Item name = "style"
              label = "Style"
              rules = {
                [{
                  message: "e.g.) volume magic perm"
                }]
              } >
              <Input id = "style_input" placeholder = "e.g.) volume magic perm" />
            </Form.Item> 
            <Form.Item name = "salon"
              label = "Hairshop"
              rules = {
                [{
                  message: "e.g.) Hongdae Hairshop"
                }]
              } >
              <Input id= "salon_input" onKeyUp= {() => {this.filterStylists("salon")}} placeholder = "e.g.) Hongdae Hairshop" />
            </Form.Item> 
            <Button type = "primary"
              htmlType = "submit"
              id = "searchagain"
              onClick= { () => {this.onClickSearchAgain()}}>
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