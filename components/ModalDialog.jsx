import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'



function ModalDialog() {
        const [show, setShow] = useState(true);
        const router=useRouter()

        const handleClose = () => setShow(false);
        const handleShow = () => {
                setShow(true)
                router.back()
        };

  return (
    <>
        
        

        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} centered>
                
                <Modal.Body>
                I will not close if you click outside me. Don't even try to press
                escape key.
                </Modal.Body>
                <Modal.Footer>
                <button className='btn' onClick={handleClose}>
                Close
                </button>
                </Modal.Footer>
        </Modal>
    </>
  )
}
export default ModalDialog