import React, { useContext, useEffect, useMemo, useState } from 'react'
import { FolderOrFile } from './Helper/ExpolerInterfaces'
import { Folder, isFolder, File } from './Item'
import './Explorer.css'
import { randomBool, uuidv4 } from '../../../utils/utils'
import { ConsoleContext } from '../Code/ConsoleProvider/ConsoleProvider'

type Props = {
    items: FolderOrFile[], 
}
// NOTE: DO NOT USE CONSOLE LOG ON EACH RENDER THIS WILL CAUSE AN INFNITE LOOP! INSTEAD USE saveConsole
export default function Explorer({ items }: Props) {
    const { saveConsole } = useContext(ConsoleContext)

    useEffect(() => {
        saveConsole.log('initialized')
    }, [])

    return (
        <>
            <ul className="root">
                {
                    items.map(i => {
                        return isFolder(i) 
                            ? <Folder item={i} onClick={(e) => { 
                            }}
                                key={i.id}
                            />
                            : <File key={i.id} item={i} onClick={(e) => { 
                            }}/>
                    })
                }

            </ul>
        </>
    )
} 