import { useContext, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import './MainWindow.css'
import MultilevelMenus from '../../../MultiDropdown/MultilevelMenus/MultilevelMenu';
import config, { menuItems } from '../../../../config';
import { downloadFile, getHeightBetweenNavbarAndScreenBottom, uuidv4 } from '../../../../utils/utils';
import { MenuItem } from '../../../../MenuItem';
import { transpile } from 'typescript';
import MultilineTextarea, { IMultilineTextarea } from '../MultilineTextarea/MultilineTextarea';
import ConsoleMethod from './ConsoleMethod';
import IConsoleMessage, { MessageType } from './IConsoleMessage';
import ConsoleMessage from '../ConsoleMessage/ConsoleMessage';
import Explorer from '../../Explorer/Explorer'
import { testExplorerItems } from '../../Test/Test';
import { ConsoleContext } from '../ConsoleProvider/ConsoleProvider';
import { Allotment } from 'allotment';
import "allotment/dist/style.css";
import { isFile } from '../../Explorer/Item';
import { IUserContext, UserContext } from '../../../User/UserProvider';
import { File } from '../../Explorer/Helper/ExpolerInterfaces';

type Props = {
};

export default function MainWindow({ }: Props) {
    const { currentUser } = useContext(UserContext) as IUserContext;
    const textEditorRef = useRef<IMultilineTextarea>(null);
    const explorerRef = useRef<HTMLDivElement>(null);
    const consoleRef = useRef<HTMLUListElement>(null);
    const ref = useRef<HTMLDivElement>(null);
    const { saveConsole } = useContext(ConsoleContext);
    const [currentFileContents, setCurrentFileContents] = useState<string>(config.defaultText);
    const [currentFile, setCurrentFile] = useState<File>();
    const [consoleMessages, setConsoleMessages] = useState<IConsoleMessage[]>([]);

    function log(...args: any[]) {
        saveConsole.log(...args);
        let message = '';

        for (let index = 0; index < args.length; index++) {
            const arg = args[index];
            if (typeof arg === 'string') {
                message += arg;
            }
            else {
                message += JSON.stringify(arg, null, 2);
            }

            if (index < args.length - 1)
                message += ', '
        }

        consoleMessages.push({
            type: MessageType.Nomrmal,
            message: message
        })

        setConsoleMessages([...consoleMessages])
    }

    useEffect(() => {
        textEditorRef.current?.setValue(currentFileContents || '')
    }, [currentFileContents]);

    useEffect(() => {
        console = {
            assert: () => { },
            clear: () => {
                consoleMessages.length = 0;
            },
            //@ts-ignore
            Console: {},
            log: new ConsoleMethod(log).getFunction(),
            error: new ConsoleMethod((message: any) => {
                saveConsole.error(message);
                const messageAsJson = JSON.stringify(message, Object.getOwnPropertyNames(message), 2).replaceAll('\\n', '\n');
                consoleMessages.push({
                    message: messageAsJson,
                    type: MessageType.Error,
                    title: "Error: " + message.message
                });
                setConsoleMessages([...consoleMessages]);
            }).getFunction(),
            warn: (message: any) => {
                saveConsole.error(message);
                const messageAsJson = JSON.stringify(message, Object.getOwnPropertyNames(message), 2).replaceAll('\\n', '\n');
                consoleMessages.push({
                    message: "Warning: " + messageAsJson,
                    type: MessageType.Warning
                });
                setConsoleMessages([...consoleMessages]);
            }
        }
        return () => {
            console = saveConsole;
        }
    }, [saveConsole])

    useLayoutEffect(() => {
        function updateHeight() {
            (ref.current as HTMLElement).style.height = getHeightBetweenNavbarAndScreenBottom(40) + 'px';
        }
        updateHeight();
        window.onresize = () => {
            updateHeight();
        }
    })

    function itemSelected(item: MenuItem) {
        if (item.id === 2) {
            run();
        }

        if (item.id === 11) {
            save();
        }

        if (item.id === 12) {
            downloadFile(currentFileContents, "script.txt")
        }

    }

    function save() {
        if (textEditorRef.current) {
            setCurrentFileContents(textEditorRef.current.getValue())
            if (currentFile)
                currentFile.fileContents = textEditorRef.current.getValue();
        }
    }

    function reset() {
        console.clear();
    }

    function run() {
        save();
        if (textEditorRef.current) {
            try {
                reset();
                const code = new Function(transpile(textEditorRef.current.getValue()));
                code();
            } catch (error) {
                console.error(error);
            }
        } else {
            console.error('An error occured while loading the script');
        }
    }

    return (
        <div style={{
            width: '100%',
            position: 'relative'
        }} ref={ref}>
            <MultilevelMenus items={menuItems} itemSelected={itemSelected} />
            <div className="whitebg main-wrapper">
                <Allotment>
                    <Allotment.Pane snap preferredSize={window.innerWidth / 7} minSize={window.innerWidth / 14}>
                        <div id="explorer" className="maximize">
                            <Explorer items=
                            {
                                testExplorerItems
                                // currentUser?.rootFolder || [{
                                //     fileContents: 
                                //     "// Welcome to taskify!\n" + 
                                //     "console.log('app!');",
                                //     name: "index.js"
                                // }]
                            }
                            onClick={e => {
                                const item = e.item;
                                if (isFile(item)) {
                                    setCurrentFileContents(item.fileContents)
                                    setCurrentFile(item);
                                }
                            }}/>
                        </div>
                    </Allotment.Pane>
                    <Allotment.Pane>
                        <div className="main-editor maximize">
                            <Allotment vertical>
                                <Allotment.Pane>
                                    <div className="maximize">
                                        <MultilineTextarea ref={textEditorRef} defaultValue={currentFileContents} />
                                    </div>
                                </Allotment.Pane>
                                <Allotment.Pane>
                                    <ul id='console' className="maximize" ref={consoleRef}>
                                        {
                                            consoleMessages.map((consoleMessage, index) => {
                                                return <ConsoleMessage message={consoleMessage} key={index} />
                                            })
                                        }
                                    </ul>
                                </Allotment.Pane>
                            </Allotment>
                        </div>
                    </Allotment.Pane>
                </Allotment>
            </div>
        </div>
    )
}