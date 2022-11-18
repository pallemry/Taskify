import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import * as icons from '@fortawesome/free-solid-svg-icons';
import { uuidv4 } from '../../../utils/utils';
import { FolderOrFile, getReadableType, ReadableType, File as IFile, Folder as IFolder } from './Helper/ExpolerInterfaces'

export type ItemMouseEvent = React.MouseEvent & {
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
                {props.item.name}
            </div>
        </div>
    )
}


export function Folder(props: Props<IFolder>) {
    const [subItems, setSubItems] = useState(props.item.subItems);
    const [folderOpen, setFolderOpen] = useState(false);
    return (
        <div className="folder">
            <details open={folderOpen} onChange={() => {
                return setFolderOpen(prev => !prev);
            }} >
                <summary onClick={(e) => props.onClick?.({ ...e, item: props.item })} className="f-name">
                    <FontAwesomeIcon icon={folderOpen ? icons.faFolderOpen : icons.faFolder} style={{ marginRight: '5px' }} />
                    {props.item.name}
                </summary>
                <ul className="items">
                    {
                        subItems.map(subItem => {
                            return (
                                <li key={subItem.id}>
                                    {
                                        isFile(subItem) ?
                                            <File key={subItem.id} onClick={props.onClick} item={subItem} depth={(props.depth ?? 0) + 1} /> :
                                            <Folder key={subItem.id} item={subItem} onClick={props.onClick} depth={(props.depth ?? 0) + 1} />
                                            // <div key={subItem.id}>{subItem.name}</div>
                                    }
                                </li>
                            );
                        })
                    }
                </ul>
            </details>
        </div>
    )
}

