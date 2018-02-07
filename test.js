'use strict'
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var express = require('express');
var app = express();
var http = require('http');
var replace = require('stream-replace');
var htmlConvert = require('html-convert');
var htmlToText = require('html-to-text');
var convert = htmlConvert();
var destin=fs.createWriteStream('./standup.text');
var path=require('path');
var credentials = require('./credentials.json');
var dateFormat = require('dateformat');
var now = new Date();
var request = require('request');
 var schedule = require('node-schedule');
var strings = require('node-strings');
var username = "Mithra",
password = "12345";
/**
 * Payload : Set of arguments 
 */

var url = "https://" + username + ":" + password + "@agile-standup-bot.herokuapp.com/channels/2/standups";
request(url)
  .pipe(replace(/\/assets\//g ,  ''))
  .pipe(destin);
request(
  {
        url : url
  },
/**
 * Description : 
 * Arguments: 
 * Return values:
*/  
function (error,response, body) {
    if (!error) {
      var $ = cheerio.load(body)
      var content =$('.wrapper').text();
      var title = $('title').text();
      content = $('body').text();
      console.log('URL: ' + url);
      console.log('Title: ' + title);
      console.log('Content:' + content);
      var text = htmlToText.fromString(content, {
        wordwrap: 130
      });
  console.log("Converted text from HTML",text);
  var text1=text.replace('Manage Users Settings #meetings','');
  var text2=text1.replace('Made by So Fetch','');
  var text3=text2.replace('Previous Day','');
  var text4=text3.replace('Divya Pothu','\nDIVYA POTHU\n');
    var text5=text4.replace('BangaruBabu Pureti','\nBANGARUBABU PURETI\n');
      var text6=text5.replace('Satish Matapati','\nSATISH MATAPATI\n');
       var text7=text6.replace('Mithra k ','\nMITHRA K \n');

       var text8=text7.replace(/What I worked on yesterday:/g,'\nWhat I worked on yesterday:\n');
       var text9=text8.replace(/Anything in my way:/g,'\nAnything in my way: \n');
       var text10=text9.replace(/What I am working on today:/g,'\nWhat I am working on today:\n');
       // var text11='Divya Pothu'.italic();
       // var text12=text10.replace('Divya Pothu',text11);
       //      var text13='BangaruBabu Pureti'.red();   
       //           var text14=text12.replace('BangaruBabu Pureti',text13);
       //            var text15='Satish Matapati'.bold(); 
       //            var text16=text14.replace('Satish Matapati',text15);
       //                var text17='Mithra k '.bold(); 
       //                  var text18=text16.replace('Mithra k',text17);
       // console.log(text18);

 // console.log(strings.italic('Hello World'));
 // var text11=text10.bold('Divya Pothu');
 // var text12=text11.bold('Satish Matapati');
 // var text13=text12.bold('BangaruBabu Pureti');
 // var text14=text13.bold('Mithra k ');
 // x=content;
// console.log(content);
var j = schedule.scheduleJob( '*/1 * * * *', function(){
var send = require('gmail-send')({
  user: credentials.user,
  pass: credentials.pass,                 
  to:   credentials.to,       
  text:    'Hi all'+ "\n"+'Please find the below minutes of meeting.'+"\n"+"\n"+text10+"\n"+"\n"+"Regards,"+"\n"+"Divya Pothu,"+"\n"+"Tata Consultancy Services"+"\n"+"Mailto: Divya.pothu@tcs.com"+"\n"+"Cell:- +91 9686440226",
  body:'divya',
});
console.log('* [example 1.1] sending test email');
//var filepath = './standup.text';  // File to attach
send({ // Overriding default parameters
  subject: 'Minutes of Meeting '+'('+dateFormat(now)+')',         // Override value set as default
  // files: [ filepath ],
}, function (err, res) {
  console.log('* [example 1.1] send() callback returned: err:', err, '; res:', res);
});
});
}
    else{
      console.log("We’ve encountered an error: " + error);
    }
});



