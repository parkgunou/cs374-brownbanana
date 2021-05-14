import { Layout, Menu } from 'antd';
import { HeaderWithSearch } from '../components/Header';

const { Content } = Layout;

function ProfileView() {
  return (
  <Layout className="layout">
    <HeaderWithSearch></HeaderWithSearch>
    <Content style={{ padding: '0 50px' }}>
      <div className="site-layout-content">Content 1</div>
    </Content>
    <Content style={{ padding: '0 50px' }}>
      <Menu mode="horizontal">
        <Menu.Item>Tab 1</Menu.Item>
        <Menu.Item>Tab 2</Menu.Item>
        <Menu.Item>Tab 3</Menu.Item>
      </Menu>
      <div className="site-layout-content">Content 2</div>
    </Content>
  </Layout>
  );
}

export default ProfileView;
