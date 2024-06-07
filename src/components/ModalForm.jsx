import React from 'react'
import { Modal } from 'react-bootstrap'
// import Forms from './Forms'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faXmark } from '@fortawesome/free-solid-svg-icons'
import EditDevice from './EditDevice'

export default function ModalForm(props) {
  return (
    <Modal {...props} size='lg' aria-labelledby ="contained-modal-title-vcenter" centered style={{fontSize: 12}} >
      <Modal.Header id='contained-modal-title-vcenter'  closeButton></Modal.Header>
        <Modal.Body >
           <EditDevice details = {props.reagentDetails}/>
        </Modal.Body>
    </Modal>
  )
}
