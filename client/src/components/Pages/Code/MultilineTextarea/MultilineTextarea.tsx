import React, { useLayoutEffect, useRef, useState } from 'react'
import './MultilineTextarea.css'

type Props = {}

export default function MultilineTextarea({ }: Props) {
  const textEditorRef = useRef<HTMLTextAreaElement>(null)
  const lineNumbersRef = useRef<HTMLDivElement>(null)
  const [lastNumberOfLines, setLastNumberOfLines] = useState(1)

  useLayoutEffect(() => {
    setLastNumberOfLines(textEditorRef.current?.value.split('\n').length ?? 1);
  })

  function onTextAreaKeyUp(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    const text = (event.target as HTMLTextAreaElement).value
    const numberOfLines = text.split('\n').length;
    if (lineNumbersRef.current && numberOfLines !== lastNumberOfLines) {
      lineNumbersRef.current.innerHTML = new Array(numberOfLines)
      .fill('<span></span>')
      .join('')
      setLastNumberOfLines(numberOfLines)
    }
  }

  function onTextAreaKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Tab' && textEditorRef.current) {
      const start = textEditorRef.current.selectionStart
      const end = textEditorRef.current.selectionEnd

      textEditorRef.current.value = textEditorRef.current.value.substring(0, start) + '\t' + textEditorRef.current.value.substring(end)

      event.preventDefault()
    }
  }

  return (
    <div className="editor">
      <div className="line-numbers" ref={lineNumbersRef}>
        <span></span>
      </div>
      <textarea ref={textEditorRef} onKeyUp={onTextAreaKeyUp} onKeyDown={onTextAreaKeyDown}></textarea>
    </div>
  )
}