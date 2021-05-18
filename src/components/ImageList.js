import { List } from 'antd';
import React from 'react';

import ImageListItem from './ImageListItem';
import { getFirebaseDB } from '../Firebase';

const imageDes = [{
    "style": "Swallow perm",
    "description": "I am a girl",
    "image_url": "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
  },
  {
    "style": "Ash perm",
    "description": "I am a girl",
    "image_url": "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
  },
  {
    "style": "Man haircut",
    "description": "I am a girl",
    "image_url": "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
  },
  {
    "style": "Woman haircut",
    "description": "I am a girl",
    "image_url": "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
  },
  {
    "style": "Woman perm",
    "description": "I am a girl",
    "image_url": "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
  }
];

export default class ImageList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageList: []
    }
  }
  
  componentDidMount() {
    getFirebaseDB().once('value').then((snapshot) => {
      this.setState({
        imageList: imageDes
      });
    });
  }
  
  render() {
    return (
      <List
        grid = {{ gutter: 16, column: 4 }}
        dataSource = { this.state.imageList }
        renderItem = { item => (
          <ImageListItem
            style = { item.style }
            description = { item.description }
            image_src = { item.image_url }
          />
        )}
      />
    );
  }
};