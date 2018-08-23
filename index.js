const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');

/* let contador = 0,contadorLinkOk =0 ,contadorLinkBad=0;
const validarExtensionDirectorio = (ruta, files, options) => {
  const archivo = ruta + "/" + files
  validarExtensionMD(archivo, options);
}
const contadorURL = (contador,contadorLinkBad,contadorLinkOk) => {
  console.log("total" + contador);
  console.log("ok" + contadorLinkBad);
  console.log("fail" + contadorLinkOk);  
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
      });
    });
  });
} */
const statusURL = (links) => {
  let stats = fetch(links.href)
    .then(elemento => {
      return links.status = elemento.status;
    })
    .catch(error => {
      return links.status = error.code;
/*     console.log(links.href + ' --- ' + error.code)

 */  })


  return stats
}

const datosObjeto = (elemento, newRuta) => {
  const objLinks = {};

  if (elemento.substr(0, 1) === '[' && elemento.substr(-1, 1) === ')') {

    const eliminarParentesis = elemento.replace(/\(.*\)/g, '');
    const textoURL = eliminarParentesis.replace(/[\[\]']/gi, '');
    //despejar url
    const eliminarCorchete = elemento.replace(/\[.*\]/g, '');
    const soloUrl = eliminarCorchete.replace(/[\(\)']/gi, '')

    objLinks.href = soloUrl;
    objLinks.text = textoURL;
    objLinks.file = newRuta;

    return objLinks;

  } else {
    let modifiedResult = elemento.replace(/[\n]/gi, '')

    objLinks.href = modifiedResult;
    objLinks.text = "(no tiene nombre)";
    objLinks.file = newRuta;

    return objLinks;
  }
}

const leerArchivo = (newRuta) => {
  fs.readFile(newRuta, (err, data) => {
    if (err) throw err;
    const text = data.toString();
    const reg1 = /[^()](ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/gi;
    const reg2 = /\[([\w\s]*)\]\((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?\)/gi;
    const urlsTotal = text.match(reg1).concat(text.match(reg2));

    const arrayLinks = urlsTotal.map(elemento => {
      const links = datosObjeto(elemento, newRuta)
      const stats = statusURL(links);
      return stats;
    });
console.log(arrayLinks)

    return arrayLinks;
  })
}


const validarArchivo = (newRuta,data) => {

  const extension = path.extname(newRuta);
  console.log(extension);
  if (extension == '.md') {

    leerArchivo(newRuta);
  } else {
    console.log("no es md");
  }
}
const validarDirectorio = (ruta) => {
const newarray = [];
// let array = '';
  fs.readdir(ruta, (err, files) => {
    if (err) {
      throw err;
    }
    const extension = path.extname(files);
    if (extension == '.md') {
      /* let array=files.map(files =>{
       return files
    })  */
    console.log(files)
    }/* else {
      let newRuta = path.resolve(ruta,files);
      validarDirectorio(newRuta)
    } */
    
    
    
      /* validarExtensionDirectorio(val, files[i], options); */
/*       let newDirectory = val + '/' + files[i];
 *//*       fs.stat(newDirectory, (err, stat) => {
        if (stat.isDirectory()) {
          mdLinks(newDirectory, options)
        }
      }); */
    })

}


['readme.md']
['uno.md', 'dos.md','tres.md']
 const leerMd = (arr) => {
   arr.for
   fs.readFile()
   [{},{},{}]
 }

const mdLinks = (ruta, options) => {
  return new Promise((resolve, reject)=>{
    fs.stat(ruta, (err, data) => {
      if (err) return reject(err);
      if (data.isFile()) {
        return resolve(validarArchivo(ruta,data))
      } else {
        return resolve(validarDirectorio(ruta));
      };
    });
  })


  
 
}

module.exports = mdLinks;
