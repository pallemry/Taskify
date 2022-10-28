import React from 'react'
import Console from './Console/Console'
import ConsoleProvider from './ConsoleProvider/ConsoleProvider'
import MainWindow from './MainWindow/MainWindow'

type Props = {}

export default function Code({ }: Props) {
    return (
        <ConsoleProvider>
            <MainWindow />
        </ConsoleProvider>
    )
}