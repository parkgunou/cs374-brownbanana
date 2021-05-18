import { Image } from 'antd';
import React from 'react';
import '../css/StyleImage.css';


export default class ImageListItem extends React.Component {
  render() {
    return (
      <div id = "imagelist" >
        <Image
          className = "style-images"
          width = { 200 }
          src = { this.props.image_src }
        />
        <div id = "imageDescription" >
          { this.props.style }
        </div>
      </div>
    );
  }
}