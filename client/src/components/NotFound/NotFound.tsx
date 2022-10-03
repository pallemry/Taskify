import React, { useState } from 'react'
import Modal from '../Modal/Modal'
import './NotFound.css'
import * as icons from '@fortawesome/free-solid-svg-icons'
import { ModalClosedEvent } from '../Modal/ModalClosedEvent'
import { useNavigate } from 'react-router-dom'

type Props = {}

export default function NotFound({ }: Props) {
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [backToHomeOption] = useState('Back to home');
    const navigator = useNavigate();

    const onClosed: (e: ModalClosedEvent) => void = (e) => {
        if (e.chosenOption === backToHomeOption)
            navigator('/')
    }
    return (
        <div id="not-found">
            <Modal 
            isOpen={isModalOpen} 
            setIsOpen={setIsModalOpen}
            icon={icons.faXmarkCircle}
            heading='404'
            message={"Uh oh, Looks like we can't find this page."}
            options={[backToHomeOption]}
            onClosed={onClosed}
            showXButton={false}
            />
        </div>
    )
}