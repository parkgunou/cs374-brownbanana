import React from 'react';
import ReactDom from 'react-dom';
import { Button, Layout } from 'antd';

import '../css/Header.css';
import logo from '../icons/bbhairshop_logo_white.png';
import HeaderNavMenu from './HeaderNavMenu';
import HeaderSearchBar from './HeaderSearchBar';
import HomeScreen from '../layouts/HomeScreen';

const { Header } = Layout;

function onClickHome() {
  ReactDom.render(
    <React.StrictMode>
      <HomeScreen />
    </React.StrictMode>,
    document.getElementById('root')
  );
}

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
        <Button type="text" style={{ padding: '0px', border: '0px' }} onClick={onClickHome} >
          <img src={logo} alt="BB Hairshop" style={{ height: '100%'}} />
        </Button>
      </div>
      <div className="headersection" >
        <HeaderSearchBar />
      </div>
      <div className="headersection" >
      </div>
    </Header>
  );
}

export function HeaderWithoutSearch(props) {
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
        <Button type="text" style={{ padding: '0px', border: '0px' }} onClick={onClickHome} >
          <img src={logo} alt="BB Hairshop" style={{ height: '100%'}} />
        </Button>
      </div>
      <div className="headersection" >
        <HeaderNavMenu
          name={props.name}
          notifications={[]}
          className="personalnav"
          style={{ display:'flex', alignItems: 'center'}}
        />
      </div>
    </Header>
  );
}

export function HeaderNoProfile() {
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
        <Button type="text" style={{ padding: '0px', border: '0px' }} onClick={onClickHome} >
          <img src={logo} alt="BB Hairshop" style={{ height: '100%'}} />
        </Button>
      </div>
    </Header>
  );
}