### Que es un campo referencia?

A la hora de que el valor de un campo existente en un schema sea obtenido de todos los valores de otro campo definido en otro schema es útil utilizar un campo referencia.
Este no es más que la selección aleatoria de uno entre todos los valores del campo existentes en los registros del schema seleccionado.

### Ejemplo

Supongamos que estamos creando dos schemas: **User** y **Post** uno que guarda información del usuario y otro que guarda información de las publicaciones creadas por estos.
El schema **User** tendrá entre sus campos un campo que guardará los id´s de todas las publicaciones hechas por ese usuario
