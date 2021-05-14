import { Input } from 'antd';
import React from 'react';

import '../css/Header.css';

const { Search } = Input;

export default class HeaderSearchBar extends React.Component {
  makeSearch(queryString) {
    if (queryString) {
      //TODO: render search results page with given query
      alert(`You searched: ${queryString}`);
    }
  }

  render() {
    return (
      <Search
        className="searchbar"
        placeholder="Search for something here"
        allowClear
        onSearch={this.makeSearch()}
        style={{ width: '400px', textAlign: 'left' }}
        enterButton
      />
    )
  }
}
