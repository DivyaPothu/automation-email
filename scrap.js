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
var request = require('request');
/**
 * Payload : Set of arguments 
 */
var username = "Mithra",
password = "12345",
url = "https://" + username + ":" + password + "@agile-standup-bot.herokuapp.com/channels/2/standups";
request(url)
  .pipe(replace(/\/assets\//g ,  ''))
  .pipe(destin);
request(
  {
        url : url
  },
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
        wordwrap: 130,
      });
    console.log("Converted text from HTML",text);
 //  var text1=text.replace('Manage','');
 //  var text2=text1.replace('Users','');
 //  var text3=text2.replace('Settings','');
 //  var text4=text3.replace('#meetings','');
 //  console.log(text4);
 // // x=content;
console.log(content);

}
    else{
      console.log("We’ve encountered an error: " + error);
    }
});


