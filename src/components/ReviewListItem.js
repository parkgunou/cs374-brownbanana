import React from 'react';
import { Typography, Space } from 'antd';
import { StarOutlined ,StarFilled } from '@ant-design/icons';

import '../css/Review.css';

const { Text } = Typography;

export default class ReviewListItem extends React.Component {
  ratingStar(){
    const rating=[];

    for (var i=0; i<this.props.rating; i++){
      rating.push(<StarFilled />)
    }
    for (var j=0; j<5-this.props.rating; j++){
      rating.push(<StarOutlined />)
    }
    return rating
  }
  
  render() {
  const review = this.props.review
    return (
      <Space direction='vertical' className='review-box'>
        <Text strong>{review.menu}</Text>
        <Space direction='horizontal'>
            {this.ratingStar()}
            <Text>{review.rating}.0 / 5.0</Text>
        </Space>
        <Text>{review.description}</Text>
        <Space direction='horizontal'>
            <Text type='secondary'>{review.reviewer}  |</Text>
            <Text type='secondary'>{review.created_at} days ago</Text>
        </Space>
      </Space>
    );
  }
}