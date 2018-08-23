#!/usr/bin/env node

const mdLinks= require ("./index.js");
const program = require('commander');
let options = {
    validate:null,
    stats:null
}
 program
  .arguments('<file>')
  .option('-v, --validate', 'The user to authenticate as')
  .option('-s, --stats', 'The user\'s password')
  .action(function(file){
    
    options.validate = program.validate;
    options.stats = program.stats;

    mdLinks(file,options)
  })
  .parse(process.argv);
