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

    id   |  personaje
   ---- |---------
- [1] | Midudev
- [2] | Ex Novia
- [3] | Ana de Armas
- [4] | Taylor Swift
- [5] | Gotic Girl Friend
- [6] | Choso (jujutsu kaisen)
- [7] | Ryomen Sukuna (jujutsu kaisen)
- [8] | Step Sisters
- [9] | Satoru Gojo
- [10] | Albert Einstein
- [11] | Ghost
- [12] | Luis Abinader
- [13] | Hipolito Mejia

_si tu personaje preferido no esta en la lista, puedes enviar un mensaje a @18292078938 para que sea agregado_
`

export const characters = {
    "1": "midudev",
    "2": "exNovia",
    "3": "anaDeArmas",
    "4": "taylosSwift",
    "5": "goticGirlFriend",
    "6": "choso",
    "7": "ryomenSukuna",
    "8": "stepSisters",
    "9": "satoruGojo",
    "10": "albertEinstein",
    "11": "ghost",
    "12": "luisAbinader",
    "13": "hipolitoMejia"
  }