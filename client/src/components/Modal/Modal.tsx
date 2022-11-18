import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { faExclamationCircle, faX } from '@fortawesome/free-solid-svg-icons';
import './Modal.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { createPortalElement } from '../../utils/createPortalElement';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { ModalClosedEvent } from './ModalClosedEvent';

type Props = {
    icon?: IconProp;
    setIsOpen?: (isOpen: boolean) => unknown;
    message?: string,
    isOpen?: boolean,
    options?: string[],
    showXButton?: boolean,
    heading?: string,
    onClosed?: (e: ModalClosedEvent) => void;
}

export default function Modal(props: Props) {
    const modalRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const [icon] = useState<IconProp>(props.icon ?? faExclamationCircle)
    const [chosenOption, setChosenOption] = useState<string>('');
    const [showXButton] = useState(props.showXButton ?? true);
    const [options] = useState<string[]>(props.options ?? ["No", "Yes"]);

    useEffect(() => {
        let height = modalRef.current?.clientHeight || 0;
        height = height + (window.innerHeight - height) / 2;
        modalRef.current?.style.setProperty('--height', height + 'px');
    }, [props.isOpen])

    const modalExitAnimationName = 'unappear';
    if (!props.isOpen || props.isOpen === undefined) return null;

    const ToggleAnimations = () => {
        modalRef.current?.classList.toggle(modalExitAnimationName);
        modalRef.current?.classList.toggle('appear');
        overlayRef.current?.classList.toggle('fade-out');
        overlayRef.current?.classList.toggle('fade-in');
    }

    const animationDurationStyle = { "--duration": ".3s" } as any;
    return createPortal(
        <div id='modal__container'>
            <div className="overlay-modal fade-in" style={animationDurationStyle} ref={overlayRef}></div>
            <div className="modal appear" style={animationDurationStyle} ref={modalRef} onAnimationEnd={e => {
                if (e.animationName === modalExitAnimationName) {
                    (document.getElementById('modal__container') as HTMLElement).style.display = 'none';
                    if (props.setIsOpen)
                        props.setIsOpen(false);
                    props.onClosed?.(new ModalClosedEvent(chosenOption));
                }
            }}>
                {
                    showXButton && <FontAwesomeIcon className='xButton' icon={faX} onClick={ToggleAnimations}></FontAwesomeIcon>
                }
                <FontAwesomeIcon icon={icon} className="warning-icon" />

                {
                    props.heading && 
                    <div className="modal__message modal__heading">{props.heading}</div>
                }
                <div className="modal__message modal__blend">{props.message}</div>
                <div className="buttons">
                    {
                        options.map((option, index) => {
                            return <button className='modal__button modal__blend' key={option} onClick={() => {setChosenOption(option); ToggleAnimations();}}>{option}</button>
                        })
                    }
                </div>
            </div>
        </div>,
        document.getElementById('portal') ?? createPortalElement()
    )
}


