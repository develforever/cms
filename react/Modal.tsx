import React, { useContext, useState } from "react";
import AppContext from "@app/AppContext";
import { ModalsPluginEvent } from "./AppState/Plugin/ModalsPlugin";

export interface ModalProps {
    id: string;
    title?: string;
    onCancel?: () => void;
    onOk?: () => void;
    onClose?: () => void;
}

const MODAL_CLASS_OPEN = 'modal show d-block';
const MODAL_CLASS_CLOSE = 'modal';

const Modal: React.FC<ModalProps> = ({ id, title, onCancel, onClose, onOk, ...arg }) => {

    const context = useContext(AppContext);

    const [state, setState] = useState({
        modalClass: MODAL_CLASS_OPEN
    });

    function close() {
        setState((state) => {
            context.plugin.ModalsPlugin.next({
                event: ModalsPluginEvent.REMOVE,
                data: id
            });
            return {
                ...state,
                modalClass: MODAL_CLASS_CLOSE
            };
        });
    }

    function onCloseBtn() {

        onClose ? onClose() : null;

        close();
    }

    function onCancelBtn() {

        onCancel ? onCancel() : null;
        close();
    }

    function onOkBtn() {

        onOk ? onOk() : null;
        close();
    }

    return <div className={state.modalClass} tabIndex={-1}>
        <div className="modal-dialog modal-xl">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Modal title</h5>
                    <button type="button" className="btn-close" onClick={onCloseBtn} data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <p>Modal body text goes here.</p>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={onCancelBtn} data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary" onClick={onOkBtn}>Save changes</button>
                </div>
            </div>
        </div>
    </div>
}


export default Modal