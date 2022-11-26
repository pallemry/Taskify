import React, { useState } from 'react'
import { uuidv4 } from '../../../utils/utils'
import { FolderOrFile } from '../Explorer/Helper/ExpolerInterfaces'

type Props = {}

export const testExplorerItems: FolderOrFile[] = [
  {
    fileContents: 'hello world from ab',
    name: 'ab.js',
    id: uuidv4()
  }, {
    fileContents: 'hello world from ab.ts',
    name: 'ab.ts',
    id: uuidv4()
  }, {
    subItems: [
      {
        id: uuidv4(),
        name: 'x.js',
        fileContents: 'hello world from x'
      }, 
      {
        id: uuidv4(),
        name: 'open me',
        subItems: [{
          id: uuidv4(),
          name: 'x.js',
          fileContents: 'hello world from x'
        }]
      }
    ],
    name: 'open ab',
    id: uuidv4()
  }
]

export default function Test({ }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <details>
      <summary onClick={() => {
        setOpen(!open)
    }}>wow {open ? 'wow' : 'mah'}</summary>
      dwadwadwa
    </details>
  )
}