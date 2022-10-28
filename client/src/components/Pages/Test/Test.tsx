import React from 'react'
import { uuidv4 } from '../../../utils/utils'
import { FolderOrFile } from '../Explorer/Helper/ExpolerInterfaces'

type Props = {}

export const testExplorerItems: FolderOrFile[] = [
    {
        fileContents: 'hello',
        name: 'ab.js',
        id: uuidv4()
    }
]

export default function Test({}: Props) {
  return (
    <div>Test</div>
  )
}