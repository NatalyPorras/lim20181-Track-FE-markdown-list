
const fs = require('fs');
const fetch = require('node-fetch');

const validarExtensionMD = (ruta, options) => {

  const path_splitted = ruta.split('.');
  const extension = path_splitted.pop();
  if (extension == 'md') {
    readFile(ruta, options);
  }
}
const validarExtensionDirectorio = (ruta, files, options) => {

  const archivo = ruta + "/" + files

  validarExtensionMD(archivo, options);

}

const readFile = (archivo, options) => {
  fs.readFile(archivo, (err, data) => {
    const text = data.toString();

    const reg1 = /[^()](ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/gi;
    const reg2 = /\[([\w\s]*)\]\((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?\)/gi;
    let result1 = text.match(reg1);
    let result2 = text.match(reg2);

    if (result1) {
      result1.forEach(result => {
        console.log(archivo + ' ' + result)
        /*               fetch(result).then(function (response) {
                        if(response.status >= 200 && response.status < 400){
                          // contUrlOK++ ;
                          // console.log(archivo + " " + result + " " + response.status + "No tiene titulo"); 
                        }else if(response.status > 400){
                          // contUrlBad++ ;
                            // console.log(archivo + " " + result + " " + response.status + "No tiene titulo"); 
                        }
        
                      })  */
      })
      // console.log(contUrlOK,contUrlBad);
    }
    if (result2) {
      result2.forEach(result => {
        console.log(archivo + ' ' + result)

        // console.log( result.replace(/[\[\]]/g, '') );

      })
    }
    /*  .forEach((item) => {
 
     console.log(item)
   }); */
    // console.log(result2)

    /*  .forEach((item) => {
 
     console.log(item)
     console.log( item.replace(/[\[\]]/g, '') );
   }); */
    // console.log(result2)

    /*       text.replace(expression, (url) => {
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
          }) */
  });
}

const readDirect = (val, options) => {
  fs.readdir(val, (err, files) => {
    if (err) {
      throw err;
    }
    for (let i = 0; i < files.length; i++) {
      validarExtensionDirectorio(val, files[i], options);
      let newDirectory = val + '/' + files[i];
      fs.stat(newDirectory, (err, stat) => {
        if (stat.isDirectory()) {
          mdLinks(newDirectory, options)
        }
      })
    }
  });
}

const mdLinks = (ruta, options) => {
  fs.stat(ruta, (error, data) => {
    if (data.isFile()) {
      validarExtensionMD(ruta, options);
    } else if (data.isDirectory()) {
      readDirect(ruta, options);
    }
  })
}

module.exports = mdLinks;

