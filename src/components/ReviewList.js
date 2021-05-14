import React from 'react';
import { List } from 'antd';

import ReviewListItem from './ReviewListItem';

const items = [
  {
    "style":"Volume Magic Perm",
    "rating":"5",
    "mention":"Good",
    "name":"Peggy",
    "date":"2"
  },
  {
    "style":"HairCut&Volume Magic Perm",
    "rating":"4",
    "mention":"Good",
    "name":"Lee",
    "date":"3"
  },
  {
    "style":"Volume Magic Perm",
    "rating":"5",
    "mention":"Nice",
    "name":"Kim",
    "date":"4"
  }
]

export default class ReviewList extends React.Component {
  render() {
    return(
      <List
        dataSource={items}
        renderItem={item => (
          <ReviewListItem 
              style={item.style}
              rating={item.rating} 
              mention={item.mention}
              name={item.name} 
              date={item.date}
          />
        )}
      />
    )
  }
}