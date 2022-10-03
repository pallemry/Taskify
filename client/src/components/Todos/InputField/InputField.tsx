import React, { useEffect, useRef, useState } from 'react'
import { EventEmitter } from 'stream';
import EventsService from '../../../services/events';
import Modal from '../../Modal/Modal';
import './InputField.css';
import * as icons from '@fortawesome/free-solid-svg-icons';
import { InputFieldProps } from './InputFieldProps';
import { ModalClosedEvent } from '../../Modal/ModalClosedEvent';

const InputField: React.FC<InputFieldProps> = (props) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [count, setCount] = useState(0);

    const inputBoxKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.key === 'Enter') {
            createNewTask();
        }
    }
    
    const createNewTask = () => {
        const inputElement = inputRef.current as HTMLInputElement;
        const value = inputElement.value;
        // Prevent adding empty elements
        if (value === '') 
            return;
        inputElement.blur();
        inputElement.value = '';
        props.handleAdd(value);
    }

    const onResetModalClosed = (e: ModalClosedEvent) => {
        const answer = e.chosenOption.toLowerCase();
        if (answer === 'yes') {
            props.clearTodos();
        }
    }

    return (
        <div className="container">
            <form className="input">
                <div style={{width: '100%', position: 'relative', display: 'flex', alignItems: 'center'}}>
                <input
                ref={inputRef}
                type="text"
                placeholder="Enter a task" 
                className="input__box" 
                onKeyDown={inputBoxKeyDown}>
                </input>
                <button className="input__submit btn" type="button" onClick={createNewTask}>Go</button>
                </div>
                <button className='reset btn' type="button" onClick={() => setIsDeleting(!isDeleting)}>Reset</button>
            </form>
            {
                <Modal
                setIsOpen={setIsDeleting}
                isOpen={isDeleting}
                icon={icons.faCheckCircle}
                onClosed={onResetModalClosed}
                message="Are you sure you want to delete all notes? This action cannot be undone!"></Modal>
            }
        </div>
    )
}

export default InputField;
