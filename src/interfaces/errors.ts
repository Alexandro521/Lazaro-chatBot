
export type errType ={
    syntax: errTypeprops
    Auth: errTypeprops
    verification: errTypeprops
}
type errTypeprops = {
    [key:string]:{
        code: number
        target: string
        razon: string
    }
}