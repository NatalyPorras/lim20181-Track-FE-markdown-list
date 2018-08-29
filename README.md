<<<<<<< HEAD



# linksmarkdown

Esta libreria permite analizar archivos con extensión MARKDOWN, donde analiza el contenido y extrae las url presentes en el archivo, realizar solicitudes de su estatus y mostrarlas.

Como libreria utilizada para extraer los links se implemento `MARKED`, gracias a su renderizador el archivo markdown se convierte a html agilizando el proceso de obtener los link. Se cuenta con 3 opciones como primera una donde validen los ulr con sus estatus, segundo nos brinden links totales y unicos y como tercero nos brinden links totales, unicos y rotos.


## Instalación 

`npm install <github-user>/md-links` ó `npm install linksmarkdown`

## Versión
`1.0.6`

## Modo de Uso en CLI

``$ md-links <path-to-file> [options]`
`<route>` Ruta del archivo o carpeta a evaluar .

`<options>` Contiene los valores (`--stats,--validate,--stats --validate`)

`--validate` Si ingresamos esta opción muestra la ruta del archivo, estado(si funciona o no), texto del estado y texto de referencia de la url.

`--stats` Si ingresamos esta opción muestra una estadistica de la totalidad de las url y las que son unicas

`--stats --validate` Si ingresamos esta opción muestra una estadistica de la totalidad de las url, las que son unicas y los rotos

## Ejemplos

```sh
$ md-links ./prueba/ejemplo.md
./some/example.md http://algo.com/2/3/ Link a algo
./some/example.md https://otra-cosa.net/algun-doc.html algún doc
./some/example.md http://google.com/ Google
```

#### Options

##### `--validate`

```sh
$ md-links ./some/example.md --validate
./some/example.md http://algo.com/2/3/ ok 200 Link a algo
./some/example.md https://otra-cosa.net/algun-doc.html fail 404 algún doc
./some/example.md http://google.com/ ok 301 Google
```
##### `--stats`

```sh
$ md-links ./some/example.md --stats
Total: 3
Unique: 3
```
##### `--stats --validate`

```sh
$ md-links ./some/example.md --stats --validate
Total: 3
Unique: 3
Broken: 1
```
=======
>>>>>>> 57abec9db1647d30ea8a1385bce0da5934187a8a
