import React, {useState ,useEffect} from 'react'
import { ListGroup ,Button,Form} from 'react-bootstrap'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

export default function EditDevice(props) {
    const [readyStatus,setReadStatus] = useState(true);
    const [aplyingBtn, setAplyingBtn]= useState(true);
    const details = props.details
    const id = props.details.id
    const [fieldType, setFieldType] = useState('text');

    const [values, setValues] = useState({
        ref: '',
        lot: '',
        name:  '',
        proddate:  '',
        expdate:  '',
        vendor:  '',
        status:  '',
    });
    useEffect(()=>{
        // setAplyingBtn(true);
        setValues({ref: details.ref,lot:details.lot,name: details.nome,proddate: details.proddate,expdate:details.expdate,vendor: details.vendor, status: details.status});
    },[details]);

    const handleEdit = ()=>{

        setReadStatus(false);
        setAplyingBtn(false);
        setFieldType('date');
    }
    
    function submitHendler(e) {
        e.preventDefault();
        axios.put('http://localhost:8000/update/' + id, { ref: values.ref,lot: values.lot,quantity: values.quantity,name:values.name,pdate: values.proddate,expdate: values.expdate, vendor: values.vendor})
            .then((data) => {
                console.log(data);
                window.location.reload(false);
            });
    }
    function deleteHendler(e){
        axios.delete('http://localhost:8000/delete/'+id).then((data)=>{
            console.log(data);
            window.location.reload(false);
        });  
    }
  return (
    <div className='' style={{fontSize: 12}}>
        <div className='row mx-0 border rounded'>
            <div className='col-12 text-white fw-bold py-2 TitleText bg-secondary align-center rounded-top-1 border'>Edit Reagent</div>
        </div>
        <div className='row mx-0 border'>
            <div className='col-12 bg-white'>
                <Form onSubmit={submitHendler}>
                    <ListGroup id='LeftDetails'>
                        <ListGroup.Item  className=' border-0 justify-between'>
                            <div className='row mx-0'>
                                <div className='col-4'>
                                    REF:
                                </div>
                                <div className='col-8'>
                                    <Form.Control type='text' size='sm' className='shadow-sm ms-2' readOnly={readyStatus} value={values.ref}  onChange={(e)=>setValues({...values,ref: e.target.value})}/>
                                </div>
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item  className=' border-0 justify-between'>
                            <div className='row mx-0'>
                                <div className='col-4'>
                                    LOT:
                                </div>
                                <div className='col-8'>
                                    <Form.Control type='text' size='sm'  className='shadow-sm ms-2' readOnly={readyStatus}  value={values.lot} onChange={(e)=>setValues({...values,lot:e.target.value})}/>
                                </div>
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item  className='border-0 justify-between'>
                            <div className='row mx-0'>
                                <div className='col-4'>
                                    Name:
                                </div>
                                <div className='col-8'>
                                    <Form.Control type='text' size='sm' className='shadow-sm ms-2 formInput' readOnly={readyStatus} value={values.name}  onChange={(e)=>setValues({...values,name:e.target.value})}/>
                                </div>
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item  className=' border-0 justify-between'>
                            <div className='row mx-0'>
                                <div className='col-4 '>
                                    PROD.DATE:
                                </div>
                                <div className='col-8'>
                                    <Form.Control type={fieldType} size='sm' className='shadow-sm ms-2' readOnly={readyStatus} value={values.proddate} onChange={(e)=>setValues({...values,proddate:e.target.value})} />
                                    {/* <Form.Control type='text' size='sm' className='shadow-sm ms-2 d-none'  value={id}/> */}
                                </div>
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item  className=' border-0 justify-between'>
                            <div className='row mx-0'>
                                <div className='col-4 '>
                                    EXPA.DATE:
                                </div>
                                <div className='col-8'>
                                    <Form.Control type={fieldType} size='sm' className='shadow-sm ms-2' readOnly={readyStatus}  value={values.expdate}  onChange={(e)=>setValues({...values,expdate:e.target.value})} />
                                </div>
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item  className=' border-0 justify-between'>
                            <div className='row mx-0'>
                                <div className='col-4 '>
                                    VENDOR:
                                </div>
                                <div className='col-8'>
                                    <Form.Control type='text' size='sm' className='shadow-sm ms-2' readOnly={readyStatus} value={values.vendor} onChange={(e)=>setValues({...values,vendor:e.target.value})} />
                                    <Form.Control type='text' size='sm' className='shadow-sm ms-2 d-none'  value={id}/>
                                </div>
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item  className=' border-0 justify-between'>
                            <div className='row mx-0'>
                                <div className='col-4 '>
                                    STATUS:
                                </div>
                                <div className='col-8'>
                                    <Form.Label style={{marginLeft: 10}} > {values.status} {values.status==='on date'&&<FontAwesomeIcon icon={faCircleCheck} color='green' className='ms-5'/>} {values.status==='out date'&& <FontAwesomeIcon icon={faCircleExclamation} color='red'/>}</Form.Label>
                                </div>
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item className='d-flex border-0 border-top'>
                            <Button className='px-4' size='sm' onClick={handleEdit} >EDIT</Button>
                            <Button type='submit' className='mx-4 px-4' size='sm' variant='success' disabled={aplyingBtn}>APPLIY</Button>
                            <Button className='px-4' variant='danger' size='sm' onClick={deleteHendler} >Delete</Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Form>
        </div>
        </div>
    </div>
  )
}
