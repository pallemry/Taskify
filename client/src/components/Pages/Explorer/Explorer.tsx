import React from 'react'
import { FolderOrFile } from './Helper/ExpolerInterfaces'
import Item from './Item'
import './Explorer.css'

type Props = {
    items: FolderOrFile[]
}

export default function Explorer({ items }: Props) {
    return (
        <ul className="root">
            {
                items.map(subItem => (
                    <Item item={subItem}></Item>
                ))
            }
        </ul>
    )
}