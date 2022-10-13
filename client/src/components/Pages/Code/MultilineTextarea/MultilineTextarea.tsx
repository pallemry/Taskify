import React, { useEffect, useImperativeHandle, useLayoutEffect, useRef, useState } from 'react'
import $ from 'jquery'
import './MultilineTextarea.css'

type Props = {
  defaultValue?: string
}

export type IMultilineTextarea = {
  getValue: () => string
  setValue: (value: string) => void
}

const MultilineTextarea = React.forwardRef<IMultilineTextarea, Props>((props: Props, ref) => {
  const textEditorRef = useRef<HTMLTextAreaElement>(null)
  const lineNumbersRef = useRef<HTMLDivElement>(null)
  const [lastNumberOfLines, setLastNumberOfLines] = useState(1)

  useEffect(() => {
    if (props.defaultValue)
      updateText(props.defaultValue?.toString());
  }, [])

  useImperativeHandle(ref, () => ({
    getValue() {
      if (!textEditorRef.current) {
        throw new Error('')
      }
      return textEditorRef.current.value;
    },
    setValue(value) {
      if (!textEditorRef.current) {
        throw new Error('')
      }
      textEditorRef.current.value = value;
    },
  }))

  useLayoutEffect(() => {
    setLastNumberOfLines(textEditorRef.current?.value.split('\n').length ?? 1);
    $('.editor').css('max-height', '1000px')
  })

  function onTextAreaKeyUp(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    updateText((e.target as HTMLTextAreaElement).value);
  }

  function updateText(text: string) {
    const numberOfLines = text.split('\n').length;
    if (lineNumbersRef.current && numberOfLines !== lastNumberOfLines) {
      lineNumbersRef.current.innerHTML = new Array(numberOfLines)
        .fill('<span></span>')
        .join('');
      setLastNumberOfLines(numberOfLines);
    }
  }

  function onTextAreaKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Tab' && textEditorRef.current) {
      const start = textEditorRef.current.selectionStart
      const end = textEditorRef.current.selectionEnd

      textEditorRef.current.value = textEditorRef.current.value.substring(0, start) + '   ' + textEditorRef.current.value.substring(end)

      event.preventDefault()
    }
  }

  return (
    <div className="editor">
      <div className="line-numbers" ref={lineNumbersRef}>
        <span></span>
      </div>
      <textarea ref={textEditorRef}
        defaultValue={props.defaultValue}
        onKeyUp={onTextAreaKeyUp}
        onKeyDown={onTextAreaKeyDown}
        id='editor-text-id'
        onScroll={(e) => {
          $('.line-numbers').css('top', (-($('#editor-text-id').scrollTop() ?? 0)) + 'px')
        }}
      ></textarea>
    </div>
  )
})

export default MultilineTextarea;