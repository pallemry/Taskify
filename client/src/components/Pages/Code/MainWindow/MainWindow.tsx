import React, { useEffect, useRef } from 'react'
import './MainWindow.css'
import SplitPane from 'react-split-pane'
import MultilevelMenu from '../../../MultilevelMenu/MultilevelMenu';

type Props = {}

export default function MainWindow({ }: Props) {
    const editorRef = useRef<HTMLDivElement>(null);
    const explorerRef = useRef<HTMLDivElement>(null);
    function run() {

    }

    return (
        <>
            <MultilevelMenu />
            <div className="whitebg main-wrapper">
                {/* @ts-ignore */ }
                <SplitPane split="vertical" minSize={0} defaultSize={150} maxSize={1500}>
                    <div className="explorer" ref={explorerRef}>abcdefg</div>
                    <div className="main-editor" ref={editorRef}>
                        {/* @ts-ignore */ }
                        <SplitPane split="horizontal" minSize={0} defaultSize={window.innerHeight - 200} maxSize={window.innerHeight - 100}>
                            <textarea style={{

                            }} defaultValue={"let a = 0;\nconsole.log(a);"}
                                className='editor'>
                            </textarea>
                            <ul id='console'>
                                <button onClick={run}>run</button>
                            </ul>
                        </SplitPane>
                    </div>
                </SplitPane>
            </div>
        </>
    )
}