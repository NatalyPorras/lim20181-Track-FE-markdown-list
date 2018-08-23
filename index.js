const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');
const marked = require('marked');
const renderer = new marked.Renderer();


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
  console.log(elemento)
  const objLinks = {};
/* elemento.forEach(dat =>{
  if (dat.substr(0, 1) === '[' && dat.substr(-1, 1) === ')') {

    const eliminarParentesis = dat.replace(/\(.*\)/g, '');
    const textoURL = eliminarParentesis.replace(/[\[\]']/gi, '');
    //despejar url
    const eliminarCorchete = dat.replace(/\[.*\]/g, '');
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
}) */

}

const leerArchivo = (array) => {
  array.forEach(elemento =>{
    fs.readFile(elemento, 'utf8', (err, data) => {
    if (err) throw err;
    const htmlMD = marked(data);
    const despejando =  htmlMD.match('<([a]+)*[^/]*?>');
    console.log(despejando);
    
/* 
    despejando.forEach(line =>{
      const links = line.match('a');
      console.log(links);
      
    }) */
    
/*       
     renderer.link = function (data, level) {
       
  var escapedText = data.toLowerCase().replace(/[^\w]+/g, '-');
  console.log(text,level,escapedText);

  return escapedText;
};


console.log(elemento, { renderer: renderer }); */

    // console.log(texto);
    
    // const reg1 = /[^()](ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/gi;
    // const reg2 = /\[([\w\s]*)\]\((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?\)/gi;
    // const urlsTotal = text.match(reg1).concat(text.match(reg2));
    //   console.log(urlsTotal)
  })

  })
/*   const arrayLinks = urlsTotal.map(elemento => {
    const links = datosObjeto(elemento, newRuta)
    const stats = statusURL(links);
    return stats;
  });
  console.log(arrayLinks)

  return arrayLinks; */
}

const validarDirectorio = (ruta) => {
  let ar;
  let newarray = [];

  fs.readdir(ruta, (err, files) => {
    if (err) {
      throw err;
    }

    files.forEach(elemento => {
      const extension = path.extname(elemento);
      if (extension === '.md') {
        newarray.push(ruta+'/'+elemento);
      } else if (!!extension) {
        return elemento
      } else {
        let newRuta = ruta + '/' + elemento;
        validarDirectorio(newRuta)
      }
    })

    ar = leerArchivo(newarray);

    return ar;

  })

}


['readme.md']
['uno.md', 'dos.md', 'tres.md']
const leerMd = (arr) => {
  arr.for
  fs.readFile()
  [{}, {}, {}]
}

const mdLinks = (ruta, options) => {
  return new Promise((resolve, reject) => {
    fs.stat(ruta, (err, data) => {
      if (err) return reject(err);
      if (data.isFile()) {
        return resolve(validarArchivo(ruta))
      } else {
        return resolve(validarDirectorio(ruta));
      };
    });
  })

}
/* 
mdLinks('./src')
.then((data) => {
  console.log(data)
}) */

module.exports = mdLinks;