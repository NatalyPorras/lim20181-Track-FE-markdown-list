const mdlinks= require ("./index.js");
var program = require('commander');
 program
  .arguments('<file>')
  .option('-v, --validate <username>', 'The user to authenticate as')
  .option('-s, --stats <password>', 'The user\'s password')
  .action(function(file){
    console.log(program)
  })
  .parse(process.argv);


