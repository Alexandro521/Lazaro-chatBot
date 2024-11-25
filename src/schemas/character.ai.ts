export const characterSchema = `
*Quieres hablar con un personaje?*

Primero debes elegir un personaje, para ello usa:

_!char :p [personaje id] [mensaje inicial]_

*ejemplo:*

_!char :p 1 hola mundo_
-------------------------------
en caso de que no quieras cambiar de personaje, puedes usar:

_!char :change [personaje id] [mensaje inicial]_

*ejemplo:*

_!char :change 1 hola mundo_

-------------------------------
*Lista de personajes disponibles:*

    id  |  personaje
   ----|---------
- [1] | Midudev
- [2] | Ex Novia
- [3] | Ana de Armas
- [4] | Taylor Swift
- [5] | Gotic Girl Friend

_si tu personaje preferido no esta en la lista, puedes enviar un mensaje a @18292078938 para que sea agregado_
`