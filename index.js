const path = require('path');
const fs = require('fs');

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