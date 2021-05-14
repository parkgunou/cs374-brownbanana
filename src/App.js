import './App.css';
import { Layout, Breadcrumb } from 'antd';
import { HeaderWithSearch } from './components/Header';

const { Content, Footer } = Layout;

function App() {
  return (
  <Layout className="layout">
    <HeaderWithSearch></HeaderWithSearch>
    <Content style={{ padding: '0 50px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-content">Content</div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
  </Layout>
  );
}

export default App;
