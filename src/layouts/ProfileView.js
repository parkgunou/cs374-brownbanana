import { Layout, Menu } from 'antd';

import ProfileBio from './ProfileBio';
import { HeaderWithSearch } from '../components/Header';
import { MenuList } from './MenuList';

const { Content } = Layout;

function ProfileView() {
  return (
    <Layout className="layout">
      <HeaderWithSearch></HeaderWithSearch>
      <ProfileBio />
      <Content style={{ padding: '0 50px' }}>
        <Menu mode="horizontal">
          <Menu.Item>Tab 1</Menu.Item>
          <Menu.Item>Tab 2</Menu.Item>
          <Menu.Item>Tab 3</Menu.Item>
        </Menu>
        <div className="site-layout-content">Content 2</div>
        <MenuList />
      </Content>
    </Layout>
  );
}

export default ProfileView;
