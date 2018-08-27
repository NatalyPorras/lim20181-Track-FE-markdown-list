#!/usr/bin/env node

const mdLinks= require ("./index.js");
const program = require('commander');
const path = require('path');

let options = {
    validate:null,
    stats:null
}
let newruta;
 program
  .arguments('<file>')
  .option('-v, --validate', 'The user to authenticate as')
  .option('-s, --stats', 'The user\'s password')
  .action(function(file){
         
    options.validate = program.validate;
    options.stats = program.stats;
    
if(path.isAbsolute(file)){
  newruta = file;
}else{
  newruta=path.resolve(file)
}
    mdLinks(newruta,options).then(data =>{
      console.log(data);
    })
  })
  .parse(process.argv);