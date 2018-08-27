const mdLinks = require('../index.js');
const path = require('path');

describe('testear funcion md-links', () => {
	it('mdLinks ', (done) => {
		    const options = {
		        stats: undefined,
		        validate: undefined
		    };
		    mdLinks('./test/test2/cuatro.md', options)
		        .then(resultadoLinks => {
		            expect(resultadoLinks).toEqual( "./test/test2/cuatro.md\thttps://es.wikipedia.org/wiki/Markdown\ta Markdown\n")
		            done();
		        });
		});
	it('mdLinks --validate', (done) => {
		const options = {
			stats: undefined,
			validate: true
		};
		mdLinks('./test/testsMD/tres.md', options).then((resultStats) => {
			expect(resultStats).toEqual("./test/testsMD/tres.md\thttps://es.wikipedia.org/wiki/Markdown  \t ok \t 200 \t link a Markdown \n");
		});
		done()
	});
	it('mdLinks --stats --validate', (done) => {
		const options = {
			stats: true,
			validate: true
		};
		mdLinks('./test/testsMD/tres.md', options).then((resultStatsValidate) => {
			expect(resultStatsValidate).toEqual('total:1\nunicos:1\nrotos:0');

		});
		done()
	});

	it('mdLinks --stats', (done) => {
		const options = {
			stats: true,
			validate: undefined
		};
		mdLinks('./test/testsMD/tres.md', options).then((resultStat) => {
			expect(resultStat).toEqual('total:1\nunicos:1');
		});
		done()
	});
})






