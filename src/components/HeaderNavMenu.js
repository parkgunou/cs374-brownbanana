import React from 'react';
import ReactDom from 'react-dom';
import { Button, Tooltip } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import ProfileView from '../layouts/ProfileView';

import '../css/Header.css';

export default class HeaderNavMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      notiCount: props.notifications.length
    }
  }

  renderMyProfile(name) {
    ReactDom.render(
      <React.StrictMode>
        <ProfileView name={name} />
      </React.StrictMode>,
      document.getElementById('root')
    );
  }

  render() {
    return (
      <>
        <Tooltip className="personalmenuelem" title="Profile" style={{ color: 'white' }}>
          <div>
            <Button type='text' onClick={() => { this.renderMyProfile(this.state.name) }} >
              <UserOutlined style={{ color: 'white', margin: '0px 4px 0px 2px' }} />
              <span style={{ color: 'white' }}>{this.state.name}</span>
            </Button>
          </div>
        </Tooltip>
      </>
    );
  }
}