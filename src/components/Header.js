import { Layout } from 'antd';

import '../css/Header.css';
import logo from '../icons/bbhairshop_logo_white.png';
import HeaderNavMenu from './HeaderNavMenu';
import HeaderSearchBar from './HeaderSearchBar';

const { Header } = Layout;

export function HeaderWithSearch() {
  return (
    <Header
      style={
        {
          display:'flex',
          justifyContent: 'space-between',
          height: 'fit-content',
          lineHeight: 'normal',
          paddingLeft: '20%',
          paddingRight: '20%'
        }
      }
    > 
      <div className="headersection" >
        <img src={logo} alt="BB Hairshop" style={{ height: '100%'}} />
      </div>
      <div className="headersection" >
        <HeaderSearchBar />
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

export function HeaderWithoutSearch() {
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
        <HeaderNavMenu
          notifications={[]}
          className="personalnav"
          style={{ display:'flex', alignItems: 'center'}}
        />
      </div>
    </Header>
  );
}
