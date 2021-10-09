
import React from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';

const CustomModal = ( { children, openModal, setOpenModal, modalTypeClass, className, title } ) => {
    return (
        <div>
            <div className={modalTypeClass}>
                <Modal isOpen={openModal} toggle={() => setOpenModal( !openModal )} className={className}>
                    <ModalHeader toggle={() => setOpenModal( !openModal )}>  {title}</ModalHeader>
                    <ModalBody>
                        {children}
                    </ModalBody>
                </Modal>
            </div>
        </div>
    );
};

export default CustomModal;
