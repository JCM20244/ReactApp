import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import {Nav,Navbar,Badge} from 'react-bootstrap'
import React, { Component } from 'react'
import "../App.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell,faEllipsis } from '@fortawesome/free-solid-svg-icons'

export default class HeadCollapse extends Component {
  render() {
    return (
        <Navbar collapseOnSelect expand="lg" className="pt-0 pb-0 shadow-sm" style={{ backgroundColor: '#444791', maxHeight: 50}} >
            <Navbar.Brand className='mx-4 text-white py-1' >
                Sistema de Controle de Valida&ccedil;&atilde;o de Agentes (SCVA) - PRO-VIDA
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" color='white' className=' border-0 shadow-sm'/>
            <Navbar.Collapse id="responsive-navbar-nav " className='justify-content-end mx-4 '>
                <Nav className='fw-bold Links  py-2 ps-5' >
                    <Nav.Link href="/" className='Links'>Home</Nav.Link>
                    <Nav.Link href="/devices" className='Links'><FontAwesomeIcon icon={faEllipsis} fontSize={20} /></Nav.Link>
                    <Nav.Link href="/controle" className='Links'> <Badge bg= ''  className='border ' style={{backgroundColor: '#ebebeb', borderRadius: 25}}><span className='text-primary'>JC</span></Badge></Nav.Link>
                    <Nav.Link href="#" className='Links'><FontAwesomeIcon icon={faBell} /> </Nav.Link> 
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
  }
}
