export interface Readable {
    name: string;
    id?: string;
}

export interface File extends Readable {
    fileContents: string;
}

export interface Folder extends Readable {
    subItems: FolderOrFile[];
}

export type FolderOrFile = Folder | File;

export enum ReadableType {
    File = 'file',
    Folder = 'folder',
    Unkown = 'unkown',
}

export function getReadableType(folderOrFile: any): ReadableType {
    if ('subItems' in folderOrFile) {
        return ReadableType.Folder;
    } else if ('name' in folderOrFile) {
        return ReadableType.File;
    } else {
        return ReadableType.Unkown;
    }
}