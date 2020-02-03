import * as $ from 'jquery';
import Post from '@models/Post';
import './styles/styles.css';
// import json from './assets/json';
// import xml from './assets/data.xml';
// import csv from './assets/data.csv';
import WebpackLogo from './assets/image.png';
const post = new Post('Webpack Course Title', WebpackLogo);

$('pre').addClass('code').html(post.toString());

// console.log(csv);
// console.log(post);
// console.log(xml);
// console.log(json);
