import { errType } from "../../interfaces/errors";
export const error: errType = {
  syntax: {
    main: {
      code: 1,
      target: "main",
      razon: "Error de sintaxis \n formato: !main",
    },
    enable: {
      code: 2,
      target: "enable",
      razon:
        "Error de sintaxis \n formato: !enable <commandName> :set true/false",
    },
    onlyGroups: {
      code: 2,
      target: "enable",
      razon:
        "Error de sintaxis \n formato: !only_Groups <commandName> :set true/false",
    },
    globalEnable: {
      code: 3,
      target: "globalEnable",
      razon:
        "Error de sintaxis \n formato: !G_enable <commandName> :set true/false",
    },
    addBannedUser: {
      code: 4,
      target: "addBannedUser",
      razon:
        "Error de sintaxis \n formato: !restrict :u <commandName> :c [numberTarget...]",
    },
    addWhiteListUser: {
      code: 5,
      target: "addWhiteListUser",
      razon:
        "Error de sintaxis \n formato: !only_list :u <commandName> :c [numberTarget...]",
    },
    setSuperUser: {
      code: 6,
      target: "setSuperUser",
      razon: "Error de sintaxis \n formato: !set_sudo [numbersTarget...]",
    },
    Unsudo: {
      code: 7,
      target: "Unsudo",
      razon: "Error de sintaxis \n formato: !unsudo [numbersTarget...]",
    },
    getConfig: {
      code: 8,
      target: "getConfig",
      razon: "Error de sintaxis \n formato: !get_config [command]",
    },
    setOnlyAminds: {
      code: 9,
      target: "setOnlyAminds",
      razon:
        "Error de sintaxis \n formato: !only_Admins <commandName> :set true/false",
    },
    setOnlyAminds_global: {
      code: 10,
      target: "setOnlyAminds_global",
      razon:
        "Error de sintaxis \n formato: !G_only_Admins <commandName> :set true/false",
    },
    removeParticipants: {
      code: 11,
      target: "removeParticipants",
      razon: "Error de sintaxis \n formato: !rm [numberTarget...]",
    },
  },
  Auth: {
    notExist: {
      code: 12,
      target: "notExist",
      razon: "Este comando no existe",
    },
    onlyGroups: {
      code: 13,
      target: "onlyGroups",
      razon: "Solo para grupos",
    },
    onlyAdmins: {
      code: 14,
      target: "onlyAdmins",
      razon: "Solo para grupos",
    },
    Root: {
      code: 15,
      target: "Root",
      razon: "Este comando solo puede ser utilizado por el usuario Root",
    },
    superUser: {
      code: 16,
      target: "superUser",
      razon: "Este comando solo puede ser utilizado por el usuario Root",
    },
    userNotAllowed: {
      code: 17,
      target: "userNotAllowed",
      razon: "Este comando no esta permitido para el usuario",
    },
    adminNotAllowed: {
      code: 18,
      target: "adminNotAllowed",
      razon:
        "Este comando solo puede ser utilizado por un administrador del grupo o un super Usuario del grupo",
    },
  },
  verification: {
    notVerified: {
      code: 19,
      target: "notVerified",
      razon: "Este comando solo puede ser utilizado por usuarios verificados",
    },
    isInList: {
      code: 20,
      target: "isInList",
      razon: "Este usuario ya esta en la lista de usuarios baneados",
    },
    isSuperUser: {
      code: 21,
      target: "isSuperUser",
      razon: "Este comando no puede ser utilizado en super usuarios",
    },
    notBanned: {
      code: 22,
      target: "notBanned",
      razon: "Este comando no esta permitido para el usuario",
    },
    notBanSuperUser: {
      code: 23,
      target: "notBanSuperUser",
      razon: "Este comando no puede ser utilizado en super usuarios",
    },
  },
};
