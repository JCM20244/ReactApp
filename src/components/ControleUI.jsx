import React, {useState} from 'react'
import { ListGroup ,Button,Form,ProgressBar} from 'react-bootstrap'
import axios from 'axios';

export default function ControleUI({details,title}) {
    const [aplyingBtn, setAplyingBtn]= useState(true);
    const [isChecked, setIsChecked] = useState('Good');
    const [values,setValues] = useState({
        iddevice:details.ID,
        description:'',
        newSource: '',
        newStatus: '',
        date: '',
        isSource: '',
        isStatus: 'Good'

    });

    const styles = {
        checks:{width: 20, height: 20},
        label:{fontWeight: 'normal', fontFamily: 'Arial, Helvetica, sans-serif'}
    }
    const handleEdit = ()=>{
        setAplyingBtn(false);
    }
    const isGoodHandler = (checkedStatus)=>{
        if(checkedStatus ==='Good'){
            setIsChecked('Bad');
            console.log(isChecked);
        }else if(checkedStatus==='Bad'){
            setIsChecked('Good');
        }
    }

    function submitHendler(e) {
        e.preventDefault();
        axios.post('http://localhost:8000/controle',{iddevice: values.iddevice,isSource:values.isSource, isStatus: values.isStatus,
        description: values.description, newSource: values.newSource, newStatus: values.newStatus, date: values.date})
            .then((data) => {
                console.log(data);
                window.location.reload(false);
            }); 
    }

  return (
    <div>
        <div className='row'>
            <div className='col-12 fw-bold py-2 TitleText  align-center rounded-top-1 border' style={{color: '#00224D'}}>{title}</div>
        </div>
        <Form onSubmit={submitHendler}>
            <div className='row '>
                <div className='col-lg-8 col-md-8 col-sm-12 col-xs-12 border-end border-bottom'>
                    <ListGroup id='LeftDetails'>
                        <ListGroup.Item  className=' border-0 justify-between'>
                            <div className='row mx-0'>
                                <div className='col-12'>
                                    <Form.Group>
                                        <Form.Label style={styles.label}>Device Name:</Form.Label>
                                        <Form.Control type='text' value={details.descricao} size='sm' className='shadow-sm mb-1 border-0' readOnly/>
                                    </Form.Group>
                                    <div style={styles.label}>The device is into default source and as good status ?</div>
                                    <Form.Check inline type='checkbox' id='inline-checkbox'>
                                        <Form.Check.Input type='checkbox'  onChange={()=>setValues({...values,isSource: details.sala, iddevice: details.ID})} className='shadow-sm' style={styles.checks} />
                                        <Form.Check.Label>isPresent ?<span className='text-danger'>*</span></Form.Check.Label>
                                    </Form.Check>
                                    <Form.Check inline type='checkbox' id='inline-checkbox'>
                                        <Form.Check.Input type='checkbox' className='shadow-sm' checked={isChecked==='Bad'?false:true} onChange={()=>{isGoodHandler('Good'); setValues({...values, isStatus: 'Bad'})}}  style={styles.checks} disabled={isChecked==='Bad'?true:false}/>
                                        <Form.Check.Label>isGood ? </Form.Check.Label>
                                    </Form.Check>
                                    <Form.Check inline type='checkbox' id='inline-checkbox' >
                                        <Form.Check.Input type='checkbox' className='shadow-sm' style={styles.checks} checked={isChecked==='Good'?false:true} onChange={()=>{isGoodHandler('Bad'); setValues({...values, isStatus: 'Good'})}} disabled ={isChecked==='Good'?true:false} />
                                        <Form.Check.Label>isBad ?</Form.Check.Label>
                                    </Form.Check>
                                </div>
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item  className=' border-0 justify-between'>
                            <div className='row mx-0'>
                                <div className='col-12'>
                                    <label style={styles.label}>Give more information about control device: </label>
                                    <ProgressBar now={0} style={{height: 2,borderRadius: 0}}/>
                                </div>
                            </div>
                            <div className='row mx-0'>
                                <div className='col-6'>
                                    <Form.Group>
                                        <Form.Label style={styles.label}>Description:{values.description}</Form.Label>
                                        <Form.Control type='text' size='sm' placeholder='Type description' className='shadow-sm' value={values.description} onChange={(e)=>setValues({...values,description:e.target.value})}></Form.Control>
                                    </Form.Group>
                                </div>
                                <div className='col-6'>
                                    <Form.Group>
                                        <Form.Label className='' style={styles.label}>New Source:{values.newSource}</Form.Label>
                                        <Form.Control type='text' size='sm'  placeholder='Type new source' className='shadow-sm' value={values.newSource} onChange={(e)=>setValues({...values,newSource:e.target.value})}></Form.Control>
                                    </Form.Group>
                                </div>
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item  className='border-0 justify-between  '>
                            <div className='row mx-0'>
                                <div className='col-6'>
                                    <Form.Group>
                                        <Form.Label  style={styles.label}>New Status:{values.newStatus}</Form.Label>
                                        <Form.Control type='text' size='sm' className='shadow-sm'  placeholder='Type new status' value={values.newStatus} onChange={(e)=>setValues({...values,newStatus:e.target.value})}></Form.Control>
                                    </Form.Group>
                                </div>
                                <div className='col-6'>
                                    <Form.Group>
                                        <Form.Label  style={styles.label}>Control Date:{values.date} <span className='text-danger'>*</span>:</Form.Label>
                                        <Form.Control type='date' size='sm' className='shadow-sm' value={values.date} onChange={(e)=>setValues({...values,date:e.target.value})}></Form.Control>
                                    </Form.Group>
                                </div>
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item className='d-flex border-0'>
                            <Button type='submit' className='mx-3 px-4' size='sm' variant='success'onClick={handleEdit} >APPLIY</Button>
                            <Button className='px-4' size='sm'  disabled={aplyingBtn} >EDIT</Button>
                        </ListGroup.Item>
                    </ListGroup>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 border">
                    <div className='bg-info justify-between p-3 rounded mt-2'>
                        Default checkbox is mean that if the device is in primary source. 
                        The default value is the primary source registed.
                    </div>
                    <div className='bg-success justify-between p-3 rounded mt-2'>
                        Good checkbox is device where the status is good. 
                        Bad checkbox is device where the status is not good.
                    </div>
                </div>
            </div>
        </Form>
    </div>
  )
}
