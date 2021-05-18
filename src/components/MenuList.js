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
      itemList : []
    }
  }

  componentDidMount() {
    getFirebaseDB().once('value')
      .then(snapshot => {
        this.setState({
          itemList: items
        })
      });
  }

  render() {
    return(
      <List
        dataSource={this.state.itemList}
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