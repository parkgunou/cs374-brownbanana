import { Layout, Input } from 'antd';

import '../css/Header.css';
import logo from '../icons/bbhairshop_logo_white.png';
import HeaderNavMenu from './HeaderNavMenu';

const { Header } = Layout;
const { Search } = Input;

const onSearch = (input) => {
  alert(`You searched for ${input}`);
}

export function HeaderWithSearch() {
  return (
    <Header
      style={
        {
          display:'flex',
          justifyContent: 'space-between',
          height: 'fit-content',
          lineHeight: 'normal'
        }
      }
    >
      <div className="headersection" >
        <img src={logo} alt="BB Hairshop" style={{ height: '100%'}} />
      </div>
      <div className="headersection" >
        <Search
          className="searchbar"
          placeholder="Search for something here"
          allowClear
          onSearch={onSearch}
          style={{ width: '400px', textAlign: 'left' }}
          enterButton
        />
      </div>
      <div className="headersection" >
        <HeaderNavMenu
          notifications={[]}
          className="personalnav"
          style={{ display:'flex', alignItems: 'center'}}
        />
      </div>
    </Header>
  );
}
