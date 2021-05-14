import { Badge, Tooltip } from 'antd';
import { BellOutlined, UserOutlined } from '@ant-design/icons';

import '../css/Header.css';
import React from 'react';

export default class HeaderNavMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notiCount: props.notifications.length
    }
  }

  renderMyProfile() {
    //TODO
  }

  showNotification() {
    //TODO
  }

  render() {
    return (
      <>
        <Tooltip className="personalmenuelem" title="Profile" style={{ color: 'white' }}>
          <div>
            <a onClick={this.renderMyProfile()} >
              <UserOutlined style={{ color: 'white', margin: '0px 2px 0px 2px' }} />
              <span style={{ color: 'white' }}>Peggy Lee</span>
            </a>
          </div>
        </Tooltip>
        <Tooltip className="personalmenuelem" title="Notifications">
          <div>
            <a onClick={this.showNotification()}>
              <Badge count={this.state.notiCount} size='small' >
                <BellOutlined style={{ color: 'white' }} />
              </Badge>
            </a>
          </div>
        </Tooltip>
      </>
    );
  }
}