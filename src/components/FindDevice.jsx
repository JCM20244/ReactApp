import axios from 'axios';
import React, { useState } from 'react'
import { Alert,InputGroup,Form, Button, ListGroup, Badge} from 'react-bootstrap'

export default function FindDevice() {
    const [show,setShow] = useState(true);
    const [content,setContent] = useState('');
    const [device, setDevice]= useState([]);
    const [openDetails,setOpenDetails] = useState(false);
    const findHandler = ()=>{
        axios.get('http://localhost:8000/find/'+content).then((res)=>{
            console.log(res.data);
            setDevice(res.data.message[0]);
            setOpenDetails(true);
        });
    }
    if(!show){
        document.getElementById('alert').style.display = 'none';
        window.location.reload(false);
    }
  return (

    <Alert variant='white' onClose={()=>setShow(false)} dismissible id='alert'>
        <div className='TitleForm fw-bold'>FIND DEVICE</div>
        <InputGroup size='sm' className='my-4'>
            <Form.Control  placeholder='search here' className='border-0 shadow-sm rounded-1' value={content} onChange={(e)=>setContent(e.target.value)} style={{backgroundColor: '#F5F5F5'}} />
            <Button variant='warning' className='fw-bold' onClick={findHandler}>Find</Button>
        </InputGroup>
        { openDetails&&
            <ListGroup>
                <ListGroup.Item className='justify-between d-flex' style={{justifyContent: 'space-between'}}>
                    <div>Serial Number:</div>
                    <div>{device.nrSerie}</div>
                </ListGroup.Item>
                <ListGroup.Item className='justify-between d-flex' style={{justifyContent: 'space-between'}}>
                    <div>Description:</div>
                    <div>{device.descricao}</div>
                </ListGroup.Item>
                <ListGroup.Item className='justify-between d-flex' style={{justifyContent: 'space-between'}}>
                    <div>Source:</div>
                    <div>{device.sala}</div>
                </ListGroup.Item>
                <ListGroup.Item className='justify-between d-flex' style={{justifyContent: 'space-between'}}>
                    <div>Status:</div>
                    <div><Badge bg='primary'>{' '}</Badge> {device.estado}</div>
                </ListGroup.Item>
            </ListGroup>
        }
    </Alert>
  )
}
