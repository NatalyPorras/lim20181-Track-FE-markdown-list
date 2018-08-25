const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');
const marked = require('marked');


/* const statusURL = (links) => {
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
}
 */
const searchLinks = (data, elemento) => {
  const array = [];

  const obj = {}
  const renderer = new marked.Renderer();
  renderer.link = function (href, title, text) {
    obj.href = href;
    obj.text = text;
    obj.file = elemento;

    array.push(obj)
    console.log(array);

    return '';
  }
  marked(data, { renderer });
  
  return array;
}

const readFile = (nameFile) => {
  const promise = new Promise((resolve, reject) => {
    fs.readFile(nameFile, 'utf8', (err, data) => {
      if (err) reject(err);
      resolve(searchLinks(data, nameFile));
    })
  });

  return promise
}


const leerArchivo = (array)=>{
  const arrayPromises = array.map(elemento => readFile(elemento));

  return Promise.all(arrayPromises)
    .then(responses => {
      // console.log(responses);

      const arrayAllLinks = [];
      responses.forEach(data => {

        arrayAllLinks.push(data)
      })
      return arrayAllLinks
    })

}
const validarArchivo = (ruta) => {
  const extension = path.extname(ruta);
  if (extension === '.md') {
    return ruta;
  } 
}
const contentArchivos= (ruta) => {
  const arrayFile = [];
  const rutaMd = validarArchivo(ruta);
  arrayFile.push(rutaMd);
  let arf = leerArchivo(arrayFile)

  return arf
}

const readDirectory = (dir,files_) => {
  // console.log(dir,files_);
  
  files_ = files_ || [];
  
  var files = fs.readdirSync(dir);
  for (var i in files){
      var name = dir + '/' + files[i];
      if (fs.statSync(name).isDirectory()){
        
          readDirectory(name, files_);
      } else {
        const rutaMd = validarArchivo(name);
        if(!!rutaMd)
          files_.push(rutaMd);
      }
  }
  let ar = leerArchivo(files_); 
  return ar;
}

const readdir = ruta => new Promise((resolve, reject) => fs.readdir(
  ruta,
  (err, files) => err ? reject(er) : resolve(files),
));

const mdLinks = (ruta) => {
  return new Promise((resolve, reject) => {
    fs.stat(ruta, (err, data) => {
      if (err) return reject(err);

      if (data.isFile()) {
  
        resolve(contentArchivos(ruta))
      } else {
  
        resolve(readDirectory(ruta))
      };
    });
  })

}

module.exports = mdLinks;