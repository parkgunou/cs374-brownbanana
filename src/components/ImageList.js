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
    console.log(props)
    this.state = {
      "styles": [],
      "stylekeys": props.stylekeys
    }
  }

  componentDidUpdate(prevProps) {
    if(this.props.stylekeys !== prevProps.stylekeys) {
      this.updateStyles();
    }
  }
  
  componentDidMount() {
    this.updateStyles()
  }

  updateStyles() {
    const styles = []
    const self = this

    this.props.stylekeys.forEach(key => {
      getFirebaseDB('styles')
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

            styles.push(data)
            self.setState({ "styles": styles })
          })
        })
        .catch(error => console.log(error));
    })
  }
  
  render() {
    return (
      <List
        grid = {{ gutter: 16, column: 4 }}
        dataSource = { this.state.styles }
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