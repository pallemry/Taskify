import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import './MainWindow.css'
import SplitPane from 'react-split-pane'
import MultilevelMenus from '../../../MultiDropdown/MultilevelMenus/MultilevelMenu';
import { menuItems } from '../../../../config';
import { getHeightBetweenNavbarAndScreenBottom } from '../../../../utils/utils';
import { MenuItem } from '../../../../MenuItem';
import ts from 'typescript';
import MultilineTextarea from '../MultilineTextarea/MultilineTextarea';

type Props = {}

export default function MainWindow({ }: Props) {
    const editorRef = useRef<HTMLTextAreaElement>(null);
    const explorerRef = useRef<HTMLDivElement>(null);
    const consoleRef = useRef<HTMLUListElement>(null);
    const ref = useRef<HTMLDivElement>(null);
    const [saveConsole] = useState(console)

    useEffect(() => {
        console = {
            assert: () => { },
            clear: () => {
                consoleRef.current!.innerHTML = '';
            },
            //@ts-ignore
            Console: {},
            log: (...args) => {
                saveConsole.log(...args)
                for (const arg of args) {
                    if (typeof arg === 'object')
                        consoleRef.current!.innerHTML += JSON.stringify(arg, null, 2) + '\n'
                    else
                        consoleRef.current!.innerHTML += arg + '\n';
                }
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
        if (item.id === 2)
            run()
    }

    function run() {
        const code = new Function(ts.transpile(editorRef.current?.value ??
            'throw new Error(\'An Error occured while loading the script\')'));
        code();
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
                    <div className="explorer" ref={explorerRef}>abcdefg</div>
                    <div className="main-editor">
                        {/* @ts-ignore */}
                        <SplitPane split="horizontal" minSize={50} defaultSize={300} primary='secondary'>
                            <MultilineTextarea />
                            <div style={{
                                maxHeight: '100%',
                                width: '100%',
                                overflowY: 'scroll'
                            }}>
                                <ul id='console' ref={consoleRef}>
                                </ul>
                            </div>
                        </SplitPane>
                    </div>
                </SplitPane>
            </div>
        </div>
    )
}