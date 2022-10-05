import React, { useEffect, useRef, useState } from 'react'
import { uuidv4 } from '../../../utils/utils';
import './Home.css'

type Props = {}

export default function Home({ }: Props) {


  const [headers, setHeaders] = useState(['Build.', 'Develop.', 'Think.'])
  const [queued, setQueued] = useState<string[]>([]);
  const [animationStarted, setAnimationStarted] = useState(false);
  const headersRef = useRef<HTMLDivElement>(null);
  const [smoothAnimation, setSmoothAnimation] = useState(false);

  useEffect(() => {
    if (!animationStarted && queued.length === 0) {
      setQueued([...headers].reverse());
      setAnimationStarted(true)
    }
  }, [headers])

  useEffect(() => {
    if (queued.length === headers.length || !animationStarted) {
      return;
    }

    setHeaders(headers.map(h => h))
  }, [queued])

  const getLength = (value: string, ref?: HTMLElement) => {
    console.log(ref, headersRef.current?.children[0].clientWidth);
    return {
      '--length': value.length,
      '--width': '100px'
    } as any;
  }

  const handleAnimationEnd = (e: React.AnimationEvent) => {
    if (e.animationName === 'typewriter' && queued[queued.length - 1] === e.currentTarget.textContent) {
      queued.pop();
      setQueued(queued.map(h => h))
    }
  }

  const getAnimation = (header: string) => {
    let result = '';
    if (queued[queued.length - 1] === header) {
      result += 'cursor-after animate-text ';
    } else if (queued.some(h => h === header)) {
      result += 'home__header_hide '

    }

    else if (headers[headers.length - 1] === header) {
      result += 'cursor-after '
    }
    if (!smoothAnimation) {
      result += 'animate-steps ';
    }
    result += 'home__header ';
    return result;
  };

  const reset = () => {
    setAnimationStarted(false);
    setQueued([]);
    setHeaders(headers.map(h => h))
  }

  return (
    <div id='home' className='whitebg'>
      <div ref={headersRef} className='home_headers_wrapper'>
        {
          headers.map(header => {
            return <>
              <span className={getAnimation(header)} style={getLength(header)} onAnimationEnd={handleAnimationEnd}>{header}</span>
              <br />
            </>
          })
        }
      </div>
      <button onClick={reset}>reset</button>
    </div>
  )
}