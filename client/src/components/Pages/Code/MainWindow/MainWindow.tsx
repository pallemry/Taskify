import React, { useEffect, useLayoutEffect, useRef } from 'react'
import './MainWindow.css'
import SplitPane from 'react-split-pane'
import MultilevelMenus from '../../../MultiDropdown/MultilevelMenus/MultilevelMenu';
import { menuItems } from '../../../../config';
import { motion } from 'framer-motion';
import { getHeightBetweenNavbarAndScreenBottom } from '../../../../utils/utils';

type Props = {}

export default function MainWindow({ }: Props) {
    const editorRef = useRef<HTMLDivElement>(null);
    const explorerRef = useRef<HTMLDivElement>(null);
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

    function run() {

    }

    return (
        <div style={{
            width: '100%',
            position: 'relative'
        }} ref={ref}>
            <MultilevelMenus items={menuItems} />
            <div className="whitebg main-wrapper">
                {/* @ts-ignore */ }
                <SplitPane split="vertical" minSize={0} defaultSize={250} maxSize={1500}>
                    <div className="explorer" ref={explorerRef}>abcdefg</div>
                    <div className="main-editor" ref={editorRef}>
                        {/* @ts-ignore */ }
                        <SplitPane split="horizontal" minSize={0} defaultSize={window.innerHeight - 400} maxSize={window.innerHeight - 100}>
                            <textarea style={{

                            }} defaultValue={"let a = 0;\nconsole.log(a);"}
                                className='editor'>
                            </textarea>
                            <ul id='console'>
                            </ul>
                        </SplitPane>
                    </div>
                </SplitPane>
            </div>
        </div>
    )
}