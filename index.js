
const fs = require('fs');
const fetch = require('node-fetch');

const validarExtensionMD=(ruta,files)=>{
  const path = files;
  const path_splitted = path.split('.');
  const extension = path_splitted.pop();
  const archivo = ruta + '/' + path;
  if (extension == 'md') {
      readFile(archivo);
  }
}
const readFile = (archivo) => {
    fs.readFile(archivo, (err, data) => {
      const text = data.toString();
      const expression =/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/gi;
      text.replace(expression, (url) => {
          fetch(url).then(function (response) {
            if(response.status >= 200 && response.status < 400){
              // contUrlOK++ ;
              console.log(archivo + " " + url + " " + response.status); 
            }else if(response.status > 400){
              // contUrlBad++ ;
              console.log(archivo + " " + url + " " + response.status); 
            }
            // console.log(contUrlOK,contUrlBad);

          });
         
      })

    });

}

const readDirect = (val,options) => {
  fs.readdir(val, (err, files) => {
    if (err) {
      throw err;
    }
    for (let i = 0; i < files.length; i++) {
      validarExtensionMD(val,files[i]);
    }
  });
}

const mdLinks = (ruta,options) => {
  fs.stat(ruta, (error, data) => {
    if (data.isFile()) {
      validarExtensionMD(ruta,options);
    } else if (data.isDirectory()) {
      readDirect(ruta,options);
    }
  })
}

module.exports = mdLinks;

