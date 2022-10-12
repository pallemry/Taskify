import React, { useEffect, useLayoutEffect, useRef } from 'react'
import './MainWindow.css'
import SplitPane from 'react-split-pane'
import MultilevelMenus from '../../../MultiDropdown/MultilevelMenus/MultilevelMenu';
import { menuItems } from '../../../../config';
import { motion } from 'framer-motion';
import { getHeightBetweenNavbarAndScreenBottom } from '../../../../utils/utils';
import { MenuItem } from '../../../../MenuItem';
import ts from 'typescript';

type Props = {}

export default function MainWindow({ }: Props) {
    const editorRef = useRef<HTMLTextAreaElement>(null);
    const explorerRef = useRef<HTMLDivElement>(null);
    const consoleRef = useRef<HTMLUListElement>(null);
    const ref = useRef<HTMLDivElement>(null);


    useLayoutEffect(() => {
        function updateHeight() {
            (ref.current as HTMLElement).style.height = getHeightBetweenNavbarAndScreenBottom(40) + 'px';
        }
        updateHeight();
        window.onresize = () => {
            updateHeight();
        }
    })

    async function itemSelected(item: MenuItem) {
        if (item.id === 2)
            await run()
    }

    async function run() {
        const saveConsole = console;
        const code = new Function(ts.transpile(editorRef.current?.value ?? 'throw new Error(\'An Error occured while loading the script\')'));
        console = {
            assert: () => { },
            clear: () => {
                consoleRef.current!.innerHTML = '';
            },
            //@ts-ignore
            Console: {},
            log: (...args) => {
                for (const arg of args) {
                    if (typeof arg === 'object')
                        consoleRef.current!.innerHTML += JSON.stringify(arg, null, 2) + '\n'
                    else
                        consoleRef.current!.innerHTML += arg + '\n';
                }
            }
        }
        await code();
        console = saveConsole;

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
                        <SplitPane split="horizontal" primary='secondary'>
                            <textarea defaultValue={"let a = 0;\nconsole.log(a);"} ref={editorRef}
                                className='editor'>
                            </textarea>
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