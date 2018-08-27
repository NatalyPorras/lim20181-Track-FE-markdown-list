
const mdLinks = require('../index.js');

describe('testear funcion md-links', () => {
	it('mdLinks ', (done) => {
		    const options = {
		        stats: undefined,
		        validate: undefined
		    };
		    mdLinks('./test/testsMD/cuatro.md', options)
		        .then(resultadoLinks => {
		            expect(resultadoLinks).toEqual( " ./test/testsMD/cuatro.md  \t https://es.wikipedia.org/wiki/Markdown  \t a Markdown \n ./test/testsMD/cuatro.md  \t https://github.com/markedjs/marked \t a marked \n ./test/testsMD/cuatro.md  \t https://carlostre.com/manejando-la-asincronia-en-javascript/  \t a Asíncronía en js \n")
		            done();
		        });
		});
/* 	it('mdLinks --validate', (done) => {
		const options = {
			stats: undefined,
			validate: true
		};
		mdLinks('./test/testsMD/cuatro.md', options).then((resultStats) => {
			expect(resultStats).toEqual(" ./test/testsMD/cuatro.md  \t  https://es.wikipedia.org/wiki/Markdown  \t  OK \t  200 \tLink a   Markdown \n ./test/testsMD/cuatro.md  \t  https://github.com/markedjs/marked \t OK \t 200 \t a marked \n ./test/testsMD/cuatro.md  \t https://carlostre.com/manejando-la-asincronia-en-javascript/ \t ok \t 200 \t a Asíncronía en js \n");
		});
		done()
	}); */
/* 	it('mdLinks --stats --validate', (done) => {
		const options = {
			stats: true,
			validate: true
		};
		mdLinks('./test/testsMD/cuatro.md', options).then((resultStatsValidate) => {
			expect(resultStatsValidate).toEqual(' total:  3 unicos: 3 rotos: 1');

		});
		done()
	});

	it('mdLinks --stats', (done) => {
		const options = {
			stats: true,
			validate: undefined
		};
		mdLinks('./test/testsMD/cuatro.md', options).then((resultStats) => {
			expect(resultStats).toEqual(' total: 3 unicos: 3');
		});
		done()
	}); */
})









