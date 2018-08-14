const fs = require('fs');

const readFile = (val) => {
  var path = val;
  var path_splitted = path.split('.');
  var extension = path_splitted.pop();
  let contUrlOK = 0, contUrlBad=0;
  if (extension == 'md') {
    fs.readFile(path, (err, data) => {
      if (err) throw err;
      const text = data.toString();
      const expression =/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
      // var regex = new RegExp(expression);
      if (expression.test(text)) {
        contUrlOK ++;
        console.log(expression.test(text));
      } else{
        contUrlBad ++;
      }
      console.log(contUrlOK,contUrlBad);
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
      console.log(path);
      const archivo = val + '/' + path;
      if (extension == 'md') {
        fs.readFile(archivo, (err, data) => {
          if (err) throw err;
          const text = data.toString();
          console.log(text);
        });
      }
    }
  });
}
const mdLinks = (val) => {
  fs.stat(val, (error, data) => {
    if (data.isFile()) {
      readFile(val);
    } else if (data.isDirectory()) {
      readDirect(val);
    }
  })
}
module.exports = mdLinks;
process.argv.forEach((val, index) => {
  if (index === 2) {
    mdLinks(val);
  }
});
