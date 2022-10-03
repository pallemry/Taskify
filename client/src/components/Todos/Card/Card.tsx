import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef, useState } from 'react';
import ExpandableText from '../Expandable text/ExpandableText';
import * as icons from '@fortawesome/free-solid-svg-icons';
import './Card.css'
import { CardPropTypes } from './CardPropTypes';
import useOutsideAlerter from '../../../hooks/useOutsideAlerter';

const Card = (props: CardPropTypes) => {
    const [todo, setTodo] = useState(props.todo);
    const [isDone, setIsDone] = useState(props.todo.isDone);
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [editText, setEditText] = useState(todo.message);
    const cardRef = useRef<HTMLLIElement>(null);
    useOutsideAlerter(cardRef, () => setIsEditing(false));

    const markDone = () => {
        if (isEditing) {
            props.updateMessage(todo.id, editText);
            setIsEditing(false);
        }
        else {
            setIsDone(props.updateIsDone(todo.id));
        }
    }

    const deleteTask = () => {
        setIsDeleting(true);
    }
    
    const animationEnd = (e: React.AnimationEvent) => {
        setIsDeleting(false);
        (e.target as HTMLElement).style.display = 'none';
        props.deleteTask(todo.id);
    }

    const prevent: React.MouseEventHandler = e => e.preventDefault();

    const editTextChange = (e: React.ChangeEvent) => {
        setEditText((e.target as HTMLTextAreaElement).value);
    }

    return (
        <li className={`${isDone ? 'todos__item-done' : ''} ${isDeleting ? 'pop' : ''} ${isEditing ? 'hide-background' : ''} todos__item`} 
        onAnimationEnd={animationEnd}
        ref={cardRef}>
            <div className="todos__item__text">
                {
                    isEditing ?
                    <textarea defaultValue={editText} name="text" className={``} onChange={editTextChange}></textarea>
                            // <input type="text" defaultValue={editText} className='todos__item__edit' />
                        :
                        <ExpandableText text={todo.message}></ExpandableText>
                }
            </div>
            <div className="icons" id={"icons-" + todo.id}>
                <FontAwesomeIcon
                    icon={icons.faTrashCan}
                    className='icon'
                    title='Delete task'
                    onClick={deleteTask}
                    onMouseDown={prevent}
                ></FontAwesomeIcon>
                <FontAwesomeIcon
                    icon={icons.faEdit}
                    className='icon'
                    title='Edit task'
                    onClick={() => setIsEditing(prev => !prev)}
                    onMouseDown={prevent}
                ></FontAwesomeIcon>
                <FontAwesomeIcon
                    icon={icons.faCheck}
                    className='icon'
                    title='Mark as done'
                    onClick={markDone}
                    onMouseDown={prevent}
                ></FontAwesomeIcon>
            </div>

        </li>
    )
}

export default Card;