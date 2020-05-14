import { React } from 'preact'
import { useCallback, useContext, useEffect, useState } from 'preact/hooks'
import style from './style.css'
import { AppModalContext } from './AppModalContextProvider'

const Modal = (props) => {
    const { setModalBody } = useContext(AppModalContext)

    const escFunction = useCallback((event) => {
        if (event.key === 'Escape') {
            setModalBody(null)
        }
    }, [])

    useEffect(() => {
        document.addEventListener('keydown', escFunction, false)

        return () => {
            document.removeEventListener('keydown', escFunction, false)
        }
    }, [])

    return (
        props.children && (
            <div className={style.modalContent}>
                <div className={style.modalHeader}>
                    <span className="close" onClick={() => setModalBody(null)}>
                        &times;
                    </span>
                    <h2>Modal Header</h2>
                </div>
                <div className={style.modalBody}>{props.children}</div>
                <div className={style.modalFooter}>
                    <h3>Modal Footer</h3>
                </div>
            </div>
        )
    )
}

export default Modal
