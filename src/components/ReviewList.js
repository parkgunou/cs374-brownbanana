import React from 'react';
import { List } from 'antd';

import ReviewListItem from './ReviewListItem';

const items = [
  {
    "style":"Volume Magic Perm",
    "rating":"5",
    "mention":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ante libero, sagittis eget odio nec, iaculis ultrices nulla. Ut volutpat ornare leo, vitae hendrerit ligula pellentesque ac. Praesent faucibus diam id enim mattis, et sagittis enim consequat. Morbi sit amet nunc placerat, viverra metus id, dictum arcu. Phasellus nisi elit, aliquam eu accumsan et, blandit id arcu. Nunc vitae rutrum lectus. Maecenas auctor non justo in laoreet. Praesent id vestibulum felis, sed vestibulum eros. Maecenas sit amet efficitur purus, ut consequat diam. Vivamus eu tellus justo.",
    "name":"Peggy",
    "date":"2",
    "image_url":"https://images.unsplash.com/photo-1481349518771-20055b2a7b24?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cmFuZG9tfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80"
  },
  {
    "style":"Woman's HairCut & Volume Magic Perm",
    "rating":"3",
    "mention":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ante libero, sagittis eget odio nec, iaculis ultrices nulla. Ut volutpat ornare leo, vitae hendrerit ligula pellentesque ac. Praesent faucibus diam id enim mattis, et sagittis enim consequat. Morbi sit amet nunc placerat, viverra metus id, dictum arcu. Phasellus nisi elit, aliquam eu accumsan et, blandit id arcu. Nunc vitae rutrum lectus. Maecenas auctor non justo in laoreet. Praesent id vestibulum felis, sed vestibulum eros. Maecenas sit amet efficitur purus, ut consequat diam. Vivamus eu tellus justo.",
    "name":"Lee",
    "date":"3"
  },
  {
    "style":"Volume Magic Perm",
    "rating":"5",
    "mention":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ante libero, sagittis eget odio nec, iaculis ultrices nulla. Ut volutpat ornare leo, vitae hendrerit ligula pellentesque ac. Praesent faucibus diam id enim mattis, et sagittis enim consequat. Morbi sit amet nunc placerat, viverra metus id, dictum arcu. Phasellus nisi elit, aliquam eu accumsan et, blandit id arcu. Nunc vitae rutrum lectus. Maecenas auctor non justo in laoreet. Praesent id vestibulum felis, sed vestibulum eros. Maecenas sit amet efficitur purus, ut consequat diam. Vivamus eu tellus justo.",
    "name":"Kim",
    "date":"4",
    "image_url":"https://images.unsplash.com/photo-1481349518771-20055b2a7b24?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cmFuZG9tfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80"
  }, 
  {
    "style":"Man's HairCut",
    "rating":"4",
    "mention":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ante libero, sagittis eget odio nec, iaculis ultrices nulla. Ut volutpat ornare leo, vitae hendrerit ligula pellentesque ac. Praesent faucibus diam id enim mattis, et sagittis enim consequat. Morbi sit amet nunc placerat, viverra metus id, dictum arcu. Phasellus nisi elit, aliquam eu accumsan et, blandit id arcu. Nunc vitae rutrum lectus. Maecenas auctor non justo in laoreet. Praesent id vestibulum felis, sed vestibulum eros. Maecenas sit amet efficitur purus, ut consequat diam. Vivamus eu tellus justo.",
    "name":"Park",
    "date":"6"
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
          image={item.image_url}
          />
        )}
        />
        )
      }
    }