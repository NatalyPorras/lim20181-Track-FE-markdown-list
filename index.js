const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');
const marked = require('marked');
/* 
const statusURL = (links) => {
  links.forEach(data => {
    fetch(data.href)
      .then(elemento => {
        // return links.status = elemento.status;
      })
      .catch(error => {
        // return links.status = error.code;
   console.log(links.href + ' --- ' + error.code)
 })
  })
} */

/* const searchLinks = (data, elemento) => {
  const array = [];
  const obj = {}
  const renderer = new marked.Renderer();
  renderer.link = function (href, title, text) {
    obj.href = href;
    obj.text = text;
    obj.file = elemento;

    array.push(obj)
    
  }
  marked(data, { renderer: renderer });
  console.log(array);
  return array;
} */

/* const readFile = (nameFile) => {
  const promise = new Promise((resolve, reject) => {
    fs.readFile(nameFile, 'utf8', (err, data) => {
      if (err) reject(err);
      resolve(searchLinks(data, nameFile));
    })
  });

  return promise
} */
/* const leerArchivo = (array) => {

  const arrayPromises = array.map(elemento => readFile(elemento));

  return Promise.all(arrayPromises)
    .then(responses => {
      // console.log(responses);

      const arrayAllLinks = [];
      responses.forEach(data => {
        // console.log(data);

        arrayAllLinks.push(data)
      })
      // console.log(arrayAllLinks);

      return arrayAllLinks
    })
}
 */
const getFile = (ruta) => {
  const newarray = [];
  if (err) return reject(err);

  fs.readdir(ruta, (err, files) => {
    if (err) {
      throw err;
    }
    files.forEach(elemento => {
      const extension = path.extname(elemento);
      if (extension === '.md') {
        newarray.push(ruta + '/' + elemento);

      } else if (!!extension) {
        return elemento
      } else {
        let newRuta = ruta + '/' + elemento;
        readDirectorio(newRuta)
      }
    })

    /*     leerArchivo(newarray)
          .then(data => {
            // console.log(data);
    
          }) */
  })
}
const validarArchivo = (ruta) => {
  const extension = path.extname(ruta);
  if (extension === '.md') {
    return ruta;
  }else{
    return 'no es md  '
  }
}
const readFile = (ruta,options,cb) =>{
  const arrayFile = [];
  const validacion = validarArchivo(ruta);
  fs.readFile(validacion,(err,data)=>{
    arrayFile.push(validacion);
    cb(err,arrayFile);
  })
  
}

const reaDirectory = (ruta,options,cb) =>{
    const arrayLinksDirectory = [];    
    fs.readdir(ruta,(err,file) =>{
    file.forEach(files =>{
      
      let newRuta = ruta +files;
      arrayLinksDirectory.push(newRuta)
          // if(stat.isFile()){
          //   readFile(files,options,(err,result)=>{
          //     cb(err,result);
            // })
          // console.log(files);
            
          // }else if(stat.isDirectory()){
          //   let newRuta=path.resolve(ruta,files);
          //   reaDirectory(newRuta,options,(err,result)=>{
          //     cb(err,result);
          //   })
          // console.log('no es file');
    
          // }
    })
      // cb(err,data)
      console.log(arrayLinksDirectory);

    })
    
} 

const mdLinks = (ruta, options) => {
  return new Promise((resolve, reject) => {
    fs.stat(ruta, (err, data) => {
      if (data.isFile()) {
        readFile(ruta,options, (err,result) =>{
          resolve(result)
        });
        // resolve(leerArchivo(ruta,options))
      } else {
        reaDirectory(ruta,options,(err,result)=>{
          resolve(result);
        })
        // resolve(directorio(ruta, options))
      };
    });
  })

}

module.exports = mdLinks;