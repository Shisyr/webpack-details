import * as $ from 'jquery';
import Post from '@models/Post';
import React from 'react';
import {render} from 'react-dom';
import './styles/styles.css';
import './styles/less.less';
import './styles/scss.scss';
import './babel';
// import json from './assets/json';
// import xml from './assets/data.xml';
// import csv from './assets/data.csv';
import WebpackLogo from './assets/image.png';

const post = new Post('Webpack Course Title', WebpackLogo);
// $('pre').addClass('code').html(post.toString());


const App = () => (
    <div className="container">
        <h1>Webpack Course</h1>
        <hr/>
        <div className="logo"/>
        <hr/>
        <pre/>
        <hr/>
        <div className='href' data-content='Link Hover'>
            Link Hover
        </div>
        <div className="box">
            <h2>Less</h2>
        </div>
        <hr/>
        <div className="card">
            <h2>SCSS</h2>
        </div>
    </div>
);
render(
    <App/>
    , document.getElementById('app')
);
