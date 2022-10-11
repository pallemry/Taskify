import React, { createRef, useEffect, useLayoutEffect, useState } from 'react'
import './Headings.css'

type Props = {
    /**
     * The headings, each heading represents a new line
     */
    labels: string[];
    /**
     * Wether the animtion looks smooth. In case it's false it looks as if it's being typed
     * @default false
     */
    animationSmoothed?: boolean;
    /**
     * The speed which the animtion will go in, as it's bigger the animation will animate faster
     * @default 1
     */
    animationSpeed?: number;
    className?: string;
    /**
     * Wether to show the cursor after the animtaion has finished in all labels
     * @note if {@link Props.showCursor showCursor} is set to flase this will not have any effect.
     * @default false
     */
    showCursorAfterDoneType?: boolean;
    /**
     * Wether to center the text, by default it will center to the left
     * @default
     * false
     */
    centerText?: boolean;
    /**
     * Wether to show the cursor.
     * @note this will override {@link Props.showCursorAfterDoneType showCursorAfterDoneType}
     * @default true
     */
    showCursor?: boolean;
}

export default function Headings(props: Props) {
    const [headers, setHeaders] = useState<string[]>(getHeaders())
    const [queued, setQueued] = useState<string[]>([]);
    const [centerText, setCenterText] = useState(props.centerText ?? false);
    const [showCursor, setShowCursor] = useState(props.showCursor ?? true);
    const [speed, setSpeed] = useState(props.animationSpeed ?? 1);
    const [animationStarted, setAnimationStarted] = useState(false);
    const [headersRefs, setHeadersRefs] = useState<React.RefObject<HTMLElement>[]>([]);
    const [smoothAnimation, setSmoothAnimation] = useState(props.animationSmoothed ?? false);

    useEffect(() => { setHeaders(getHeaders()) }, [props.labels])

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

    useLayoutEffect(() => {
        const widths: Array<number> = [];
        headersRefs.forEach((ref, index) => {
            const current = ref.current?.querySelector('.home__header') as HTMLElement;
            const widthAsNumber = Math.round(current?.getBoundingClientRect().width ?? 0);
            const width = widthAsNumber + 'px';
            widths.push(widthAsNumber);
            const height = Math.round(current?.getBoundingClientRect().height ?? 0) + 'px';
            const headerWordLength = headers[index].length.toString();
            if (!current?.classList.contains('animate-text')) {
                current?.style.setProperty('--width', width);
                current?.style.setProperty('--height', height);
            }
            current?.style.setProperty('--length', headerWordLength);
        })
        const headerRef = headersRefs[0].current?.parentElement;
        const style = headerRef?.style;
        const minWidth = Math.max(...widths);
        const cursorWidth = headerRef?.lastElementChild?.querySelector('#cursor')?.getBoundingClientRect().width || 0;
        const newMinWidth = minWidth + cursorWidth
        if (style && style.getPropertyValue('--min-width') === '') {
            style.setProperty('--min-width', `${newMinWidth}px`);
            style.setProperty('--animation-speed', `${1/speed}`);
        }
    });

    const handleAnimationEnd = (e: React.AnimationEvent) => {
        if (e.animationName === 'advance' && queued[queued.length - 1] === e.currentTarget.textContent) {
            queued.pop();
            setQueued([...queued])
        }
    }

    const getAnimation = (header: string) => {
        let result = 'home__header ';
        const cursorAfter = showCursor ? 'cursor-after ' : '';
        if (queued[queued.length - 1] === header) {
            result += cursorAfter;
            result += 'animate-text ';
        } else if (queued.some(h => h === header)) {
            result += 'home__header_hide '

        }
        else if (headers[headers.length - 1] === header && (props.showCursorAfterDoneType === true || props.showCursorAfterDoneType === undefined)) {
            result += cursorAfter;
        }
        if (!smoothAnimation) {
            result += 'animate-steps ';
        }
        return result;
    };


    return (
        <div id='headers-wrapper' className={`${props.className ?? ''}`}>
            {
                getHeadersElements()
            }
        </div>
    )

    function getHeadersElements(): React.ReactNode {
        headersRefs.length = 0;
        return headers.map((header, index) => {
            const ref = createRef<HTMLDivElement>();
            headersRefs.push(ref);
            return <div ref={ref} key={index} className={`header-wrapper ${centerText ? 'center-headings' : ''}`}>
                <div className={getAnimation(header)} onAnimationEnd={handleAnimationEnd}>
                    {header}
                </div>
                <div id="cursor" />
                <br />
            </div>;
        });
    }

    function getHeaders(): string[] | (() => string[]) {
        return props.labels ?? [];
    }
}