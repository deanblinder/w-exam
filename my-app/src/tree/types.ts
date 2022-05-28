export enum fileType {
    DIR='directory',
    PNG = 'png',
    DOC = 'doc'
}

export type File = {
    id:number,
    title:string,
    dateCreated:string,
    type:fileType
    children?:File[]
}


