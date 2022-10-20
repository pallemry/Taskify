import React from 'react'
import { uuidv4 } from '../../../../utils/utils';
import IConsoleMessage, { MessageType } from '../MainWindow/IConsoleMessage';
import './ConsoleMessage.css'

type Props = {
    message: IConsoleMessage;
    
}

export default function ConsoleMessage({ message: consoleMessage }: Props) {
    return <li
        key={uuidv4()}
        className={`console ${consoleMessage.type.toString()}`}>
        {
            consoleMessage.type === MessageType.Error ?

                <details onDoubleClick={(e) => e.preventDefault()}>
                    <summary>{consoleMessage.title}</summary>
                    {consoleMessage.message}
                </details> :
                <>{consoleMessage.message}</>
        }
    </li>
}