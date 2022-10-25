import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import './MainWindow.css'
import SplitPane from 'react-split-pane'
import MultilevelMenus from '../../../MultiDropdown/MultilevelMenus/MultilevelMenu';
import { config, menuItems } from '../../../../config';
import { getHeightBetweenNavbarAndScreenBottom } from '../../../../utils/utils';
import { MenuItem } from '../../../../MenuItem';
import ts from 'typescript';
import MultilineTextarea, { IMultilineTextarea } from '../MultilineTextarea/MultilineTextarea';
import { error } from 'console';
import ConsoleMethod from './ConsoleMethod';
import IConsoleMessage, { MessageType } from './IConsoleMessage';
import ConsoleMessage from '../ConsoleMessage/ConsoleMessage';
import Explorer from '../../Explorer/Explorer'
import { testExplorerItems } from '../../Test/Test';

type Props = {}
export default function MainWindow({ }: Props) {
    const textEditorRef = useRef<IMultilineTextarea>(null);
    const explorerRef = useRef<HTMLDivElement>(null);
    const consoleRef = useRef<HTMLUListElement>(null);
    const ref = useRef<HTMLDivElement>(null);
    const [saveConsole] = useState(console);
    const [currentFileContents, setCurrentFileContents] = useState(config.defaultFileContents);
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
        textEditorRef.current?.setValue(currentFileContents)
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
            run()
        }
    }

    function reset() {
        console.clear();
    }

    function run() {
        if (textEditorRef.current) {
            try {
                reset();
                const code = new Function(ts.transpile(textEditorRef.current.getValue()));
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
                {/* @ts-ignore */}
                <SplitPane split="vertical" minSize={0} defaultSize={250} maxSize={1500}>
                    <div id="explorer">
                        <Explorer items={testExplorerItems} />
                    </div>
                    <div className="main-editor">
                        {/* @ts-ignore */}
                        <SplitPane split="horizontal" minSize={50} defaultSize={300} primary='second'>
                            <MultilineTextarea ref={textEditorRef} defaultValue={currentFileContents} />
                            <ul id='console' ref={consoleRef}>
                                {
                                    consoleMessages.map((consoleMessage, index) => {
                                        return <ConsoleMessage message={consoleMessage} key={index} />
                                    })
                                }
                            </ul>
                        </SplitPane>
                    </div>
                </SplitPane>
            </div>
        </div>
    )
}