import React from 'react';
import { Typography, Space } from 'antd';
import { StarOutlined ,StarFilled} from '@ant-design/icons';

import '../css/Review.css';

const { Text } = Typography;

export default class ReviewListItem extends React.Component {
  ratingStar(){
    const rating=[];
    let i=0, j=0;
    for (i=0; i<this.props.rating; i++){
      rating.push(<StarFilled />)
    }
    for (j=0; j<5-this.props.rating; j++){
      rating.push(<StarOutlined />)
    }
    return rating
  }
  
  render() {
    return (
      <Space direction='vertical' className='review-box'>
        <Text strong>{this.props.style}</Text>
        <Space direction='horizontal'>
          {this.ratingStar()}
          <Text>{this.props.rating}.0</Text>
        </Space>
        <Text>{this.props.mention}</Text>
        <Space direction='horizontal'>
          <Text type='secondary'>{this.props.name}  |</Text>
          <Text type='secondary'>{this.props.date} days ago</Text>
        </Space>
      </Space>
    );
  }
}