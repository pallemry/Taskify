import { useState } from "react";
import Modal from "../components/Modal/Modal";

export default function useErrorModal(err: string | null = null) {
    const [error, setError] = useState<string | null>(err);

    const modal = <Modal
        isOpen={error !== null}
        onClosed={e => setError(null)}
        options={[]}
        heading='Error occured'
        message={error ?? ''}
    />


    return { error, setError, modal }
}