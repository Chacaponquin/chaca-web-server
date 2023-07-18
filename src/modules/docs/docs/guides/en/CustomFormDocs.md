## ¿ Para qué funciona ?

Supongamos que se está creando una serie de usuarios que parten del mismo schema **User** que contiene:

- id
- nombre (name)
- edad (age)

Y se quiere añadir un campo que informe si el usuario es mayor o menor de edad. Se puede ver que este campo depende de la edad del registro de usuario que se este creando. ¿ De qué forma se podría acceder a la edad del usuario para poder utilizarla en nuestra lógica ?

```js
function getValue(fields, utils) {
  if (fields.age >= 18) {
    return true;
  } else {
    return false;
  }
}
```

Esto traeria consigo registros de la siguinte forma:

```js
[
  {
    id: "4136cd0b-d90b-4af7-b485-5d1ded8db252",
    name: "Juan",
    age: 23,
    isOlder: false,
  },
  {
    id: "4136cd0b-d90b-4af7-b485-5d1ded8db2650",
    name: "Camila",
    age: 67,
    isOlder: true,
  },
];
```

## ¿ Qué tienes a mano ?

- **fields**
   Se puede tener acceso a los campos del registro que se este creando
- **utils**
   Tienes acceso a funciones de la libreria **Chaca** para que puedas modificar datos. Leer más
