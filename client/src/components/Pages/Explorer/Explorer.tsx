import React, { useEffect, useMemo, useState } from 'react'
import { FolderOrFile } from './Helper/ExpolerInterfaces'
import { Folder, isFolder, File } from './Item'
import './Explorer.css'
import { randomBool, uuidv4 } from '../../../utils/utils'

type Props = {
    items: FolderOrFile[]
}

export default function Explorer({ items: i }: Props) {
    const [items, setItems] = useState(i)

    useEffect(() => {
        applyIds(items)
    }, [])

    function applyIds(items: FolderOrFile[]): void {
        items.forEach(item => {
            item.id = uuidv4();
            if (isFolder(item)) {
                applyIds(item.subItems)
            }
        })
    }

    return (
        <>
            <ul className="root">
                {
                    items.map(i => {
                        return isFolder(i) 
                            ? <Folder item={i} onClick={(e) => { 
                                console.log(e.item.name)
                            }}/>
                            : <File item={i} onClick={(e) => { 
                                console.log(e.item.name)
                            }}/>
                    })
                }

            </ul>
        </>
    )
}