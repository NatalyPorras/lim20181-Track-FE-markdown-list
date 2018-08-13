const fs = require('fs');

const readFile = (val) => {
  var path = val;
  var path_splitted = path.split('.');
  var extension = path_splitted.pop();
  if (extension == 'md') {
    fs.readFile(path, (err, data) => {
      if (err) throw err;
      const text = data.toString();
      console.log(text);
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
const mdLinks = (val) =>{
  fs.stat(val, (error, data) => {
    if (data.isFile()) {
      readFile(val);
    } else if (data.isDirectory()) {
     readDirect(val);
    }
  })
}
module.exports=mdLinks;
process.argv.forEach((val, index) => {
  if (index === 2) {
    mdLinks(val); 
  }
});
