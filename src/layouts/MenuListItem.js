import React from 'react';
import { Typography, Divider, Space, Image, Row, Col } from 'antd';
import { DashboardOutlined, StarOutlined } from '@ant-design/icons';
import '../css/Menu.css';

const { Title, Text } = Typography;

const IconText = ({ icon, text }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);

export class MenuListItem extends React.Component {
    render() {
        console.log(this.props)
        return (
            <Row className='menu-box'>
                <Col span={18}>
                    <Space direction='vertical' className='menu-contents'>
                        <Title level={5} strong>{this.props.name}</Title>
                        <Text type='secondary'>${this.props.price}</Text>
                        <Text type='secondary'>{this.props.description}</Text>
                        <Space direction='horizontal'>
                            <IconText icon={DashboardOutlined} text={this.props.time} />
                            <Divider type='vertical' />
                            <IconText icon={StarOutlined} text={this.props.rating} />
                        </Space>
                    </Space>
                </Col>
                <Col span={2} />
                <Col span={4}>
                    <Image className='menu-image' src={this.props.image} />
                </Col>
            </Row>
        )
    }
}
