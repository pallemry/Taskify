import React, { useEffect, useState } from 'react'
import { uuidv4 } from '../../../utils/utils';
import { FolderOrFile, getReadableType, ReadableType, File as IFile, Folder as IFolder } from './Helper/ExpolerInterfaces'

type ItemMouseEvent = React.MouseEvent & {
    item: FolderOrFile;
}

type Props<T extends FolderOrFile = FolderOrFile> = {
    item: T;
    depth?: number;
    onClick?: (e: ItemMouseEvent) => void;
}


export function isFile(item: any): item is IFile {
    return getReadableType(item) === ReadableType.File;
}

export function isFolder(item: any): item is IFolder {
    return getReadableType(item) === ReadableType.Folder;
}

export function File(props: Props<IFile>) {
    return (
        <div className="file">
            <div className="f-name" onClick={(e) => props.onClick?.({ ...e, item: props.item })}>
                {props.item.name} + {props.depth}
            </div>
        </div>
    )
}


export function Folder(props: Props<IFolder>) {
    const [subItems, setSubItems] = useState(props.item.subItems);

    useEffect(() => {
        console.log('Files inside: ' + props.item.name + " were changed")
        
    }, [subItems])

    return (
        <div className="folder">
            <details>
                <summary onClick={(e) => props.onClick?.({ ...e, item: props.item })} className="f-name">{props.item.name} + {props.depth}</summary>
                <ul className="items">
                    {
                        subItems.map(subItem => (
                            <li key={subItem.id}>
                                {
                                    isFile(subItem) ?
                                        <File onClick={props.onClick} item={subItem} depth={(props.depth ?? 0) + 1} key={subItem.name} /> :
                                        <Folder item={subItem} onClick={props.onClick}
                                        depth={(props.depth ?? 0) + 1}/>
                                }
                            </li>
                        ))
                    }
                </ul>
            </details>
        </div>
    )
}

