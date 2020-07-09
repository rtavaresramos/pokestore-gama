import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const ModalCheckout = (props) => {
    const [show, setShow] = useState(false);

    const handleClose = () => {
        localStorage.removeItem('@pokeStore/items');
        setShow(false);
        window.location.reload(true);
    };

    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="success" className="btn btn-block" onClick={handleShow}>
                Finalizar compra
            </Button>

            <Modal show={show} onHide={handleClose}>
               
                <Modal.Body className="modal-body">
                    <FontAwesomeIcon icon={faCheckCircle} className="modal-icon" />
                    <h3>Parabéns!</h3>
                    <p>Compra realizada com sucesso!</p> 

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Fechar
                    </Button>
                   
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalCheckout;