const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');
const marked = require('marked');
const expresionRegulaMD = /(\.|\/)(md|markdown|mdown|mkdn|mkd|mdwn|mdtxt|mdtext)$/gi;
const array = [];

const valoresUnicos = (links) => {
  return [...new Set(links)];
}


const validateLInks = (links) => {

  return fetch(links.href)
    .then(response => {
      links.status = response.status;
      links.statusText = response.statusText;
      return links
    })
    .catch(err => {
      links.codeError = err.code;
      return links
    })
}

const searchLinks = (data, elemento) => {
  const renderer = new marked.Renderer();
  renderer.link = function (href, title, text) {
    array.push({ href, text, file: elemento })
    return ''
  }
  marked(data, { renderer });
  return array
}

const validateFile = (arrayMD) => {
  let newArray = arrayMD.filter(function (dato) {
    return dato != undefined
  });
  return newArray
}

const arrayPlano = (array) => {
  return array.reduce((memo, item) => {
    return memo.concat(item);
  }, []);
}

const readFile = (nameFile) => {
  
  return new Promise((resolve, reject) => {
    // let newfiles = './' + nameFile

    fs.readFile(nameFile, 'utf8', (err, data) => {
      if (err) reject(err);
      resolve(data);
    })
  });
}
const statFile = (ruta) => {
  return new Promise((resolve, reject) => {
    fs.stat(ruta, (err, data) => {
      if (err) return reject(err);
      resolve(data)
    })
  })
}

const readdir = (ruta) => {
  return new Promise((resolve, reject) => fs.readdir(
    ruta,
    (err, files) => err ? reject(err) : resolve(files),
  ))
};

const getFilesMDFile =(ruta) =>{
  return statFile(ruta)
  .then(dataFile =>{
    if (dataFile.isFile() && expresionRegulaMD.test(path.extname(ruta))) {
      return [ruta];
    }
  })
  .then(file => file.map(readFile))
  .then(fileMD=>{
    return Promise.all(fileMD)
  })
  
}
const getFilesMDDir = (ruta) => {

  return statFile(ruta)
    .then(dataFile => {
      if (dataFile.isFile() && expresionRegulaMD.test(path.extname(ruta))) {
        return [ruta];
      } else if (dataFile.isDirectory()) {
        return readdir(ruta)
          .then(files => files.map(newfiles => getFilesMDDir(path.join(ruta, newfiles))))
          .then(result => {
            return Promise.all(result).then(arrayPlano)
          })
          .then(validateFile)
      }
    })

}

const mdLinks = (ruta, options) => {
  return statFile(ruta)
    .then(result => {
      if (result.isFile()) {
        return getFilesMDFile(ruta)
        .then(resulArrayT => resulArrayT.map(resultado => {
          return searchLinks(resultado, ruta)
        }))
        .then(arrayPlano)
          .then(objLinks => objLinks.map(validateLInks))
          .then(linksStatus => {
            return Promise.all(linksStatus)
              .then(objLinks => optionsValidateSats(objLinks, options))
          })
      } else if (result.isDirectory()) {
        return getFilesMDDir(ruta)
          .then(result => result.map(readFile))
          .then(mds => {
            return Promise.all(mds)
              .then(resulArrayT => resulArrayT.map(resultado => {
                return searchLinks(resultado, ruta)
              }))
          })
          .then(arrayPlano)
          .then(objLinks => objLinks.map(validateLInks))
          .then(linksStatus => {
            return Promise.all(linksStatus)
              .then(objLinks => optionsValidateSats(objLinks, options))
          })
      }
    })
}

module.exports = mdLinks;