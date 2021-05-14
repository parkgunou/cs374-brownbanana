import { Layout, Input } from 'antd';

import '../css/Header.css';

const { Header } = Layout;
const { Search } = Input;

const onSearch = (input) => {
  alert(`You searched for ${input}`);
}

export function HeaderWithSearch() {
  return (
    <Header>
      <div className="logo" />
      <Search
        className="searchbar"
        placeholder="Search for something here"
        allowClear
        onSearch={onSearch}
        style={{ width: 300 }}
        enterButton
      />
    </Header>
  );
}
