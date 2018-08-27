
const mdLinks = require('../index.js');
const path = require('path');


// it('mdLinks ', (done) => {
//     const options = {
//         stats: undefined,
//         validate: undefined
//     };
//     mdLinks('./test/testsMD', options)
//         .then(resultadoLinks => {
//             expect(resultadoLinks).toEqual([
//                 {
//                     file: './testsMD/cuatro.md',
//                     href: 'https://es.wikipedia.org/wiki/Markdown',
//                     text: 'Markdown',
//                 },
//                 {
//                     file: './testsMD/cuatro.md',
//                     href: 'https://carlostre.com/manejando-la-asincronia-en-javascript/',
//                     text: 'Asíncronía en js',
//                 },
//                 {
//                     file: './testsMD/cuatro.md',
//                     href: 'https://github.com/markedjs/marked',
//                     text: 'marked',
//                 }
//             ]);
//             done();
//         });
// });
it('mdLinks para --stats --validate', (done) => {
	const options = {
		stats: true,
		validate: true
	};
	mdLinks('./test/testsMD/', options).then((resultStatsValidate) => {
		expect(resultStatsValidate).toEqual(' total:  3 unicos: 3 rotos: 1');
		done();
	});
});





/* 
it('mdLinks para --stats', (done) => {
	const options = {
		stats: true,
		validate: false
	};
	mdLinks(path.join(process.cwd(), './test/prueba/hola/hola.md'), options).then((resultStats) => {
		expect(resultStats).toEqual('Total: 2 \nUnique: 2');
		done();
	});
})
; */