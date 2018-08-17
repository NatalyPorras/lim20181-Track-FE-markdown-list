
const fs = require('fs');
const fetch = require('node-fetch');
let contador = 0,contadorLinkOk =0 ,contadorLinkBad=0;
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
const contadorURL = (contador,contadorLinkBad,contadorLinkOk) => {
  console.log("total" + contador);
  console.log("ok" + contadorLinkBad);
  console.log("fail" + contadorLinkOk);  
}
const readFile = (archivo, options) => {
  fs.readFile(archivo, (err, data) => {
    const text = data.toString();

    const reg1 = /[^()](ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/gi;
    const reg2 = /\[([\w\s]*)\]\((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?\)/gi;
    let result1 = text.match(reg1);
    let result2 = text.match(reg2);

    // validarURL(reg1,result1)
    // validarURL(reg2,result2)
    if (result1) {
      result1.forEach(result => {
        let modifiedResult=result.replace(/[\n]/gi, '')
        // console.log(modifiedResult)
        fetch(modifiedResult).then(function (response) {
          contador++;
          if(options.validate === undefined && options.stats===undefined){
            console.log(archivo + ' -- ' + modifiedResult + " " +"(No tiene titulo)");
          }else if(options.validate === true && options.stats===undefined){
            if (response.status >= 200 && response.status < 400) {
              contadorLinkOk++;
              console.log(archivo + ' -- ' + modifiedResult + "ok" + " " + response.status + "(No tiene titulo)");
            } else if (response.status >= 400) {
              contadorLinkBad++;
              console.log(archivo + ' -- ' + modifiedResult + "fail" + " " + response.status + "(No tiene titulo)");
            }
          }else if (options.validate === undefined && options.stats===true) {
            contadorURL(contador,contadorLinkBad,contadorLinkOk)
          }

        });
      })
    } 
    if(result2) {
      // console.log(contUrlOK,contUrlBad);
      result2.forEach(result => {
        //despejar texto de la url
        const eliminarParentesis = result.replace(/\(.*\)/g, '');
        const textoURL  = eliminarParentesis.replace(/[\[\]']/gi, '');
        console.log(textoURL);
    //despejar url
        const eliminarCorchete=result.replace(/\[.*\]/g, '');
        const soloUrl=eliminarCorchete.replace(/[\(\)']/gi, '')
        
        fetch(soloUrl).then(function (response) {
          contador++;
          if (options.validate === undefined && options.stats===undefined) {
            console.log(archivo + ' -- ' + soloUrl +  "'" + textoURL+ "'");

          } else if(options.validate === true && options.stats===undefined) {
            if (response.status >= 200 && response.status < 400) {
              contadorLinkOk++;
              console.log(archivo + ' -- ' + soloUrl + " " + response.status + " " +  "'" + textoURL+ "'");
            } else if (response.status >= 400) {
              contadorLinkBad++;
              console.log(archivo + ' -- ' + soloUrl + " " + response.status + "(No tiene titulo)");
            }
          }else if (options.validate === undefined && options.stats===true) {
           contadorURL(contador,contadorLinkBad,contadorLinkOk)
          }

        });

      })
      contadorURL(contador,contadorLinkBad,contadorLinkOk)
    }
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

