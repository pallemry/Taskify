import React, { useEffect, useRef, useState } from 'react'
import './Headings.css'

type Props = {
    headers?: string[];
    animationSmoothed?: boolean;
}

export default function Headings(props: Props) {
    const [headers, setHeaders] = useState<string[]>(getHeaders())
    const [queued, setQueued] = useState<string[]>([]);
    const [animationStarted, setAnimationStarted] = useState(false);
    const headersRef = useRef<HTMLDivElement>(null);
    const [smoothAnimation, setSmoothAnimation] = useState(props.animationSmoothed ?? false);

    useEffect(() => { setHeaders(getHeaders()) }, [props.headers])

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
        <>
            <div ref={headersRef} className='home_headers_wrapper'>
                {
                    headers.map((header, index) => {
                        return <div key={index}>
                            <span className={getAnimation(header)} style={getLength(header)} onAnimationEnd={handleAnimationEnd}>{header}</span>
                            <br />
                        </div>
                    })
                }
            </div>
            <button onClick={reset}>reset</button>
        </>
    )

    function getHeaders(): string[] | (() => string[]) {
        return props.headers ?? [];
    }
}