export const youtubeResultsSchema = () => {
    return {
      head: (id: string, Search: string) =>`[t:yts ${id}]

🔍Resultados de *${Search}*
`,
      body:(count,title: string,duration: string,url: string,canal: string) => `\n
『${count}』⤵
  ␥✒title: *${title}*
  ␥🕙duration: *${duration}*
  ␥📎 url: *${url}*
  ␥📺canal: *${canal}*
_ _ _ _ _ _ _ _ _ _  _ _ _ _ _ _ _ _ _ _ _`,
    };
}
    

export const main = `
*Bienvenido al menu Principal*

Lista de Menus Disponibles:

- 📜 *!menu1*  -- 🔎Busquedas

- 📜 *!menu2* -- 🎮 Juegos

- 📜 *!menu3* -- 📺 Multimedia

- 📜 *!menu4* -- 🛠️ Utilidades

- 📜 *!menu5* -- 🔐Admintradores

- 📜 *!menu6* -- ⚙️ Configuración de Comandos

*chrollo Bot v 1.0*

`;
export const menu1 = `
*Lista de Comandos Disponibles:*

- 📜 *!main* -- 🔎 Volver al Menu Principal

- 🔎 *!yts* -- 📺 Buscar Videos de YouTube

- 🔎 *!ttks* -- 📺 Buscar Videos de TikTok

- 🔎 *!img* -- 📷 Buscar Imágenes

- 🔎 *!pinterest* -- 📷 Buscar Imágenes de Pinterest

- 🔎 *!pinterestv2* -- 📷 Buscar Imágenes de Pinterest

- 🔎 *!wallpaper* -- 🖼️ Obtener Fondos de Pantalla

chrollo Bot v 1.0`;

export const menu2 = `
*Lista de Comandos Disponibles:*

- 📜 *!main* -- 🔎 Volver al Menu Principal

- 🎮 *!test_gay* -- 🔎 Eres Homosexual?

chrollo Bot v 1.0`;

export const menu3 = `
*Lista de Comandos Disponibles:*

- 📜 *!main* -- 🔎 Volver al Menu Principal

- 🎵 *!mp3* --  Descargar mp3

- 🎥 *!mp4* --  Descargar mp4

- 📺 *!ttkg* --  Obtener Videos de TikTok

chrollo Bot v 1.0`;
export const menu4 = `
*Lista de Comandos Disponibles:*

- 📜 *!main* -- 🔎 Volver al Menu Principal

- 🛠️ *!stk* --  Convertir una imagen a sticker

chrollo Bot v 1.0`;
export const menu5 = `
*Lista de Comandos Disponibles:*

- 📜 *!main* -- 🔎 Volver al Menu Principal

- 🦸‍♂️ *!set_sudo* --  Agregar Usuarios a la Lista de Superusuarios

- 💀 *!rm* --  Eliminar Usuarios del grupo

- 👨‍🦲 *!unsudo* --  Eliminar Usuarios de la Lista de Superusuarios

- 🗣 *!todos* --  etiqueta a todos los participantes del grupo

- 👁‍🗨 *!test* --  Prueba comandos experimentales

chrollo Bot v 1.0`;
export const menu6 = `
*Lista de Comandos Disponibles:*

- 📜 *!main* -- 🔎 Volver al Menu Principal

- *!get_config* -- 🔐 Obtener la configuración actual de un comando

- *!G_enable* -- 🔐 Habilitar o deshabilitar un comando globalmente

- *!enable* -- 🔐 Habilitar o deshabilitar un comando para este grupo

- *!only_Admins* -- 🔐 Habilitar o deshabilitar un comando a nivel global para todos los grupos

- *!only_list* -- 🔐 Habilitar o deshabilitar un comando para este grupo

- *!only_Groups* -- 🔐 Habilitar o deshabilitar un comando a nivel global para todos los grupos

- *!restrict* -- 🔐 Establecer que un usuario del grupo no pueda usar x comando

- *!unsudo* -- 🔐 Eliminar Usuarios de la Lista de Superusuarios

chrollo Bot v 1.0`;