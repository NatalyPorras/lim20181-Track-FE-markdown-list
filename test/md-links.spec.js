const mdLinks = require('../index');

const options = {
	validate: undefined,
	stats: undefined
}

test('Ingresar Archivo y obtener los links "md-links ./test/test2/cuatro.md" ', () => {
	jest.setTimeout(10000)
	options.validate = undefined;
	options.stats = undefined;
	return mdLinks('./test/test2/cuatro.md', options) 
	.then(result1=>{
		expect(result1).toBe("./test/test2/cuatro.md\thttps://es.wikipedia.org/wiki/Markdown\ta Markdown\r\n");

	})
});
test('Ingresar Directorio y obtener los links "md-links ./test/test2" ', () => {
	jest.setTimeout(12000)
	options.validate = undefined;
	options.stats = undefined;
	return mdLinks('./test/test2', options) 
	.then(result2=>{
		expect(result2).toBe("./test/test2\thttps://es.wikipedia.org/wiki/Markdown\ta Markdown\r\n");
	})
	
});

test('Ingresar Archivo y obtener los links "md-links ./test/test2/cuatro.md --validate" ', () => {
	jest.setTimeout(12000)
	options.validate = true;
	options.stats = undefined;
	return mdLinks('./test/test2/cuatro.md', options) 
	.then(result4=>{
		expect(result4).toBe("./test/test2/cuatro.md\thttps://es.wikipedia.org/wiki/Markdown\tOK\t200\tLink a Markdown\r\n");
	})
	
});

 test('Ingresar Directorio y obtener los links "md-links ./test/test2/cuatro.md --validate" ', () => {
	jest.setTimeout(12000)
	options.validate = true;
	options.stats = undefined;
	return mdLinks('./test/testsMD', options) 
	.then(result3=>{
		expect(result3).toBe("");
	})
	
});


/* test('Ingresar Directorio y obtener los links "md-links ./test/testsMD/tres.md --stats"', () => {
	jest.setTimeout(12000)
	options.stats = true;
	options.validate = undefined;
	return mdLinks('./test/testsMD/tres.md', options) 
	.then(result5=>{
		expect(result5).toBe("total:1\nunicos:1");
	})

});  */

test('Ingresar Directorio y obtener los links "md-links ./test/testsMD --stats --validate"', () => {
	jest.setTimeout(12000)

	options.stats = true;
	options.validate = true;
	return mdLinks('./test/test2/cuatro.md', options) 
	.then(result6=>{
		expect(result6).toBe("total:1\nunicos:1\nrotos:0");
	})
});
test('Ingresar Directorio y obtener los links "md-links ./test/testsMD --stats --validate"', () => {
	jest.setTimeout(12000)

	options.stats = true;
	options.validate = true;
	return mdLinks('./test/testsMD/tres.md', options) 
	.then(result7=>{
		
		expect(result7).toBe("total:1\nunicos:1\nrotos:0");
	})
});

test('Ingresar Directorio y obtener los links "md-links ./test/testsMD --stats --validate"', () => {
	jest.setTimeout(12000)

	options.stats = true;
	options.validate = true;
	return mdLinks('./test/test2', options) 
	.then(result8=>{
		console.log(result8);

		expect(result8).toBe("total:1\nunicos:1\nrotos:0");
	})
});

/* return mdLinks('./test/testsMD/tres.md', options) 
.then(result4=>{
	expect(result4).toBe("total:1\nunicos:1");
}) */
/* test('', () => {
	options.stats = true;
	options.validate = true;
	return expect(Promise.resolve(mdLinks('./test/testsMD', options))).resolves.toBe("total:1\nunicos:1\nrotos:0");
}); */
/* test('', () => {
	options.stats = true;
	options.validate = true;
	return expect(Promise.resolve(mdLinks('./test/testsMD/tres.md', options))).resolves.toBe("total:1\nunicos:1\nrotos:0");
});
 */


