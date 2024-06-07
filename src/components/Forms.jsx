import  { useState } from 'react'
import {Button, Form} from 'react-bootstrap'
import '../App.css'
import axios from 'axios';
import FindDevice from './FindDevice';

export default function Forms ({getdataform,getRef}) {
    const [reference,setReference] = useState(''); 
    const [lot, setLot] = useState('');
    const [pdate, setPdate] = useState((new Date()));
    const [expDate, setExpdate] = useState('');
    const [quantity, setQuantity] = useState('');
    const [name, setName] = useState('');
    const [vendor, setVendor] = useState('');
    const [showFind,setShowFind]= useState(false);
    const submitHendler = e =>{
        e.preventDefault();
        axios.post('http://localhost:8000/add',{reference: reference,lot: lot,quantity:quantity,name:name,pdate: pdate,expDate: expDate, vendor: vendor},)
        .then((data)=>{
            console.log(data.data);
            getRef(reference);
            getdataform(data.data.message);
            setReference('');
            setLot('');
            setQuantity('');
            setName(''); 
            setExpdate('');
            setPdate('');
            setVendor('');
        });
    }

    if(showFind){
     const val =  document.getElementById('formComp');
     val.style.display = 'none'
    }

    return (
        <div>
            <Form  onSubmit={submitHendler} id='formComp'>
                <div className='TitleForm fw-bold' style={{color:'#00224D'}}>NEW REAGENT</div>
                <div className='row'>
                    <div className='col-lg-6 col-md-12 col-sm-12 col-xs-12'>
                        <Form.Group className='m-4 small' controlId='formGroupSerial'>
                            <Form.Label className='mt-2'>REF: </Form.Label>
                            <Form.Control className='shadow-sm  rounded-1 '  type="text" placeholder='reference here' value={reference} onChange={(e)=>setReference(e.target.value)} />
                            <Form.Label className='mt-2'>LOT:</Form.Label>
                            <Form.Control className='shadow-sm  rounded-1 '  type='text' placeholder='lot here' value={lot} onChange={(e)=>setLot(e.target.value)}/> 
                        </Form.Group>
                    </div>
                    <div className='col-lg-6 col-md-12 col-sm-12 col-xs-12 '>
                    <Form.Group className='m-4 small' controlId='formGroupSource'>
                        <Form.Label className='mt-2'>QUANTITY: </Form.Label>
                        <Form.Control className=' rounded-1 shadow-sm '  type="number" placeholder='quantity' value={quantity} onChange={(e)=>setQuantity(e.target.value)} />
                        <Form.Label className='mt-2'>REAGENT NAME:</Form.Label>
                        <Form.Control className=' rounded-1 shadow-sm '  type='text' placeholder='reagent name here' value={name} onChange={(e)=>setName(e.target.value)}/>
                    </Form.Group>
                    </div>
                    </div>
                    <div className='row'>
                        <div className='col-lg-6 col-md-12 col-sm-12 col-xs-12 '>
                        <Form.Group className='m-4 small' controlId='formGroupSource'>
                            <Form.Label >PROD.DATE: </Form.Label>
                            <Form.Control className=' rounded-1 shadow-sm '  type="date" placeholder='produce date' value={pdate} onChange={(e)=>setPdate(e.target.value)} />
                            <Form.Label className='mt-2'>EXPA.DATE</Form.Label>
                            <Form.Control className='rounded-1 shadow-sm  '  type='date' placeholder='expire date' value={expDate} onChange={(e)=>setExpdate(e.target.value)}/>
                        </Form.Group>
                        </div>
                        <div className='col-lg-6 col-md-12 col-sm-12 col-xs-12 '>
                        <Form.Group className='m-4 small' controlId='formGroupSource'>
                            <Form.Label >VENDOR: </Form.Label>
                            <Form.Control className='rounded-1 shadow-sm '  type="text" placeholder='vendor here' value={vendor} onChange={(e)=>setVendor(e.target.value)} />
                        </Form.Group>
                        </div>
                    </div>
                
                <div className='row mx-0'>
                    <div className=' col-12 m-4 d-flex'>
                        <Button type="submit" className='me-4 fw-bold mt-2 border-0 py-0 bg-none' style={{backgroundColor: '#444791'}} >REGISTER</Button>
                        <Button  className='btn-primary  fw-bold mt-2' onClick={()=>setShowFind(true)}>FIND REAGENT</Button>
                    </div>
                </div>
            </Form>
            {showFind&&<FindDevice id='findComp'/>}
      </div>
    )
}
