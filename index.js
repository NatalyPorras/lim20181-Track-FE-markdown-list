const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const marked = require('marked');
const expresionRegulaMD = /(\.|\/)(md|markdown|mdown|mkdn|mkd|mdwn|mdtxt|mdtext)$/gi;

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
      links.status = err.code;
      return links
    })
}

const optionsValidateSats = (links, options) => {

  const newArrayUrl = links.map(link => {
    return link.href;
  })

  if (options.validate === undefined && options.stats === undefined) {
    let resultArray1 = '';
    links.forEach(link => {
      resultArray1 += `${link.file}\t${link.href}\ta ${link.text}\r\n`;
    });
    return resultArray1
  } else if (options.validate === true && options.stats === undefined) {
    let resultArray2 = '';
    links.forEach(link => {
      resultArray2 += `${link.file}\t${link.href}\t${link.statusText}\t${link.status}\tLink a ${link.text}\r\n`;
    })
    return resultArray2
  } else if (options.validate === undefined && options.stats === true) {

    return `total:${links.length}\nunicos:${valoresUnicos(newArrayUrl).length}`;

  } else if (options.validate === true && options.stats === true) {
    let brokenurl = 0;
    links.forEach(link => {
      if (link.status > 400 && link.status === 'ENOUNT') {
        return brokenurl++
      }
    })
    return `total:${links.length}\nunicos:${valoresUnicos(newArrayUrl).length}\nrotos:${brokenurl}`;

  }
}

const searchLinks = (data, elemento) => {
  const array = [];

  const renderer = new marked.Renderer();
  renderer.link = function (href, title, text) {
    array.push({ href, text, file: elemento })
    return ''
  }
  marked(data, { renderer });
  return array
}

const validateFile = (arrayMD) => {
  const newArray = arrayMD.filter(function (dato) {
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

const getFilesMDFile = (ruta) => {

    return readFile(ruta)
      .then(result => {
        console.log(result);
        
        return result
      })

}

const getFilesMDDir = (ruta) => {
 let arrayRuta =[]
  return statFile(ruta)
    .then(dataFile => {
      if (dataFile.isFile() && expresionRegulaMD.test(path.extname(ruta))) {
        arrayRuta.push(ruta)
        return arrayRuta;
      } else if (dataFile.isDirectory()) {
        return readdir(ruta)
          .then(files => {
            return files.map(newfiles => {
              return getFilesMDDir(path.join(ruta, newfiles))
            })
          })
          .then(result => {
            return Promise.all(result).then(arrayPlano)
          })
          .then(validateFile)          
      }
    })
   
}

const mdLinks = (ruta, options) => {
  return statFile(ruta)
    .then(results => {
      if (results.isFile()) {
        return getFilesMDFile(ruta)
          .then(resulArrayNew => {
            return new Promise((resolve,reject)=>{
              resolve(searchLinks(resulArrayNew, ruta))
            })
          })
          .then(tots => {
            
          return arrayPlano(tots)
          })
          .then(objLinksfile => {
            return objLinksfile.map(resultValidate => {
              return validateLInks(resultValidate)
            })
          })
          .then(linksStatusFile => {
            return Promise.all(linksStatusFile)
          })
      } else if (results.isDirectory()) {
        return getFilesMDDir(ruta)
          .then(result => {
            return result.map(resultReadFile => {
              return readFile(resultReadFile)
            })
          })
          .then(mds => {
            return Promise.all(mds)
              .then(resulArrayT => {
                return resulArrayT.map(resultado => {
                  return searchLinks(resultado, ruta)
                })
              })
          })
          .then(arrayPlano)
          .then(objLinksDir => {
            return objLinksDir.map(resultalidateLink => {
              return validateLInks(resultalidateLink)
            })
          })
          .then(linksStatus => {
            return Promise.all(linksStatus)
          })
      }
    })
    .then(objLinks => {
      return optionsValidateSats(objLinks, options)
    })

}

module.exports = mdLinks;

