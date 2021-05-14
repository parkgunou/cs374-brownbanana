import { Layout, Tabs } from 'antd';

import MenuList from '../components/MenuList';
import ProfileBio from '../components/ProfileBio';
import ReviewList from '../components/ReviewList';
import { HeaderWithSearch } from '../components/Header';

const { Content } = Layout;
const { TabPane } = Tabs;

function ProfileView() {
  return (
    <Layout className="layout">
      <HeaderWithSearch></HeaderWithSearch>
      <ProfileBio />
      <Content style={{ padding: '0 50px' }}>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Styles" key="1">

          </TabPane>
          <TabPane tab="Reviews" key="2">
            <ReviewList />
          </TabPane>
          <TabPane tab="Menu" key="3">
            <MenuList />
          </TabPane>
        </Tabs>
      </Content>
    </Layout>
  );
}

export default ProfileView;
