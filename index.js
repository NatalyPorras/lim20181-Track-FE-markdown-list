#!/usr/bin/env node

const fs = require('fs');
const fetch = require('node-fetch');

const readFile = (val) => {
  var path = val;
  var path_splitted = path.split('.');
  var extension = path_splitted.pop();
  let contUrlOK = 0, contUrlBad = 0;
  var pos = -1;
  if (extension == 'md') {
    fs.readFile(path, (err, data) => {
      if (err) throw err;
      const text = data.toString();
      var expression =/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/gi;
  
      text.replace(expression, (url) => {

          fetch(url).then(function (response) {
            if(response.status >= 200 && response.status < 400){
              contUrlOK++ ;
              console.log(val + " " + url + " " + response.status); 
            }else if(response.status > 400){
              contUrlBad++ ;
              console.log(val + " " + url + " " + response.status); 
            }
            console.log(contUrlOK,contUrlBad);

          });
         
      })

    });



  }
}

const readDirect = (val) => {
  fs.readdir(val, (err, files) => {
    if (err) {
      throw err;
    }

    for (let index = 0; index < files.length; index++) {
      var path = files[index];
      var path_splitted = path.split('.');
      var extension = path_splitted.pop();
      const archivo = val + '/' + path;
      if (extension == 'md') {
        fs.readFile(archivo, (err, data) => {
          if (err) throw err;
          const text = data.toString();
        });
      }
    }
  });
}
const mdLinks = (val,options) => {
  fs.stat(val, (error, data) => {
    if (data.isFile()) {
      readFile(val);
    } else if (data.isDirectory()) {
      readDirect(val, );
    }
  })
}
module.exports = mdLinks;
process.argv.forEach((val, index) => {
  if (index === 2) {
    mdLinks(val);
  }
});
