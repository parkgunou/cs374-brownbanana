import React from 'react';
import { Typography, Divider, Space, List } from 'antd';
import { DashboardOutlined, StarOutlined ,StarFilled} from '@ant-design/icons';
import '../css/Review.css';

var i,j

const { Title, Paragraph, Text, Link } = Typography;

const IconText = ({ icon, text }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);

export class ReviewListItem extends React.Component {
    ratingStar(){
        const rating=[];
        for(i=0;i<this.props.rating;i++){
            rating.push(<StarFilled />)
        }
        for(j=0;j<5-this.props.rating;j++){
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
        )
    }
}