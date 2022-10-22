import React, { useEffect, useState } from 'react'
import { FolderOrFile, getReadableType, ReadableType, File, Folder } from './Helper/ExpolerInterfaces'

type Props = {
    item: FolderOrFile;
    depth?: number;
}

function isFile(item: any) {
    return getReadableType(item) === ReadableType.File;
}

function isFolder(item: any) {
    return getReadableType(item) === ReadableType.Folder;
}

export default function Item({item, depth}: Props) {

    function onClick() {
        console.log(item.name)
    }

    let body: JSX.Element;
    if (isFile(item))
        body = (<div className="file" onClick={onClick}>
            <div className="f-name">
                {item.name} + {depth}
            </div>
        </div>);
    else
        body = (<div className="folder">
            <details>
                <summary onClick={onClick} className="f-name">{item.name} + {depth}</summary>
                <ul className="items">
                    {
                        (item as Folder).subItems.map(subItem => (
                            <li key={subItem.name}>
                                <Item item={subItem} depth={(depth ?? 0) + 1}></Item>
                            </li>
                        ))
                    }
                </ul>
            </details>
        </div>);

    return body;
}

