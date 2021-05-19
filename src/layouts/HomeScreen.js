import React from 'react'
import ReactDom from 'react-dom';
import { Space, Layout, Button } from 'antd';

import { HeaderNoProfile } from '../components/Header';
import ProfileView from './ProfileView';
import SearchScreen from './SearchScreen';

import '../css/HomeScreen.css';

const { Content } = Layout;

export default function HomeScreen() {
    function onClickExistingProfile() {
        ReactDom.render( <
            React.StrictMode >
            <
            ProfileView name = "Peggy" / >
            <
            /React.StrictMode>,
            document.getElementById('root')
        );
    }

    function onClickSearchProfile() {
        ReactDom.render( <
            React.StrictMode >
            <
            SearchScreen / >
            <
            /React.StrictMode>,
            document.getElementById('root')
        );
    }

    return ( <
        Layout className = "layout" >
        <
        HeaderNoProfile className = "background" / >
        <
        Content className = "background"
        style = {
            { paddingTop: '10%', paddingBottom: '10%' }
        } >
        <
        Space direction = "vertical"
        align = "center"
        size = { 20 }
        style = {
            { width: '100%' }
        } >
        <
        Button className = "navbutton"
        type = "primary"
        block onClick = { onClickSearchProfile } >
        Search
        for stylist <
        /Button> <
        Button className = "navbutton"
        type = "default"
        block > Create new profile < /Button> <
        Button className = "navbutton"
        block onClick = { onClickExistingProfile } >
        Log in as existing stylist <
        /Button> < /
        Space > <
        /Content> < /
        Layout >
    );
}