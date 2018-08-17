const mdlinks= require ("./index.js");
var program = require('commander');
 program
  .arguments('<file>')
  .option('-v, --validate', 'The user to authenticate as')
  .option('-s, --stats', 'The user\'s password')
  .action(function(file){
    console.log(program.validate,program.stats);
    mdlinks(file);
  })
  .parse(process.argv);


zz