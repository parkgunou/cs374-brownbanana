import React from 'react';
import { List } from 'antd';

import MenuListItem from './MenuListItem';
import { getFirebaseDB } from '../Firebase';

const items = [
  {
    "name": "Volume Magic Perm",
    "description": "Lorem ipsum...",
    "price": 30000,
    "time_comsumed_mins": 30,
    "image_url": "https://images.unsplash.com/photo-1481349518771-20055b2a7b24?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cmFuZG9tfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80",
    "created_at" : 12312423543
  },
  {
    "name": "Menu2222222222",
    "description": "Lorem ipsum...",
    "price": 30000,
    "time_comsumed_mins": 30,
    "image_url": "https://images.unsplash.com/photo-1481349518771-20055b2a7b24?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cmFuZG9tfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80",
    "created_at" : 12312423543
  },
  {
    "name": "Menu3333333333",
    "description": "Lorem ipsum...",
    "price": 30000,
    "time_comsumed_mins": 30,
    "image_url": "https://images.unsplash.com/photo-1481349518771-20055b2a7b24?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cmFuZG9tfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80",
    "created_at" : 12312423543
  }
]

export default class MenuList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      "menus": []
    }
  }

  componentDidMount() {
    const menus = []
    const self = this

    this.props.menukeys.forEach(key => {
      getFirebaseDB('menus')
        .orderByKey().equalTo(key)
        .limitToFirst(1)
        .once('value')
        .then(snapshot => {
          if (!snapshot.exists()) {
            alert("No record in DB for profile");
            return
          }

          snapshot.forEach( function(snap, index) {
            const data = snap.val();

            menus.push(data)
            self.setState({ "menus": menus })
          })
        })
        .catch(error => console.log(error));
    })
  }

  render() {
    return(
      <List
        dataSource={this.state.menus}
        renderItem={item => (
          <MenuListItem 
            name={item.name} 
            price={item.price} 
            description={item.description} 
            time={item.time_comsumed_mins + 'min'}
            image={item.image_url}
            rating='3.3'
          />
        )}
      />
    );
  }
}