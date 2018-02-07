
'use strict';

var scrap=require('./scrap.js');
let val=scrap.aa();
console.log(val);

var credentials = require('./credentials.json');
var dateFormat = require('dateformat');
var now = new Date();
// 
// Example 1
// =========
console.log('* [example 1.1] sending test email');

// Require'ing module and setting default options
var schedule = require('node-schedule');
var j = schedule.scheduleJob( '*/1 * * * *', function(){
var send = require('gmail-send')({
// var send = require('../index.js')({
  user: credentials.user,
  // user: 'pothudivya@gmail.com',                  // Your GMail account used to send emails
  // pass: 'kkecskdpvfxinixj',
  pass: credentials.pass,                  // Application-specific password
  // to:   'divya.pothu@gmail.com',
  to:   credentials.to,         // Send to yourself
                                           // you also may set array of recipients:
                                           // [ 'user1@gmail.com', 'user2@gmail.com' // from:    credentials.user             // from: by default equals to user
  // replyTo: credentials.user             // replyTo: by default undefined
  // Subject: 'Minutes of Meeting',
  text:    'Hi all',// Plain text
  body:'divya',
  //html:    '<b>html text</b>'            // HTML
});


// Override any default option and send email

console.log('* [example 1.1] sending test email');

var filepath = './standup.text';  // File to attach

send({ // Overriding default parameters
  subject: 'Minutes of Meeting '+'('+dateFormat(now)+')',         // Override value set as default
  files: [ filepath ],
}, function (err, res) {
  console.log('* [example 1.1] send() callback returned: err:', err, '; res:', res);
});



});
