import React ,{useState,useEffect}from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import {Button, InputGroup, ListGroup,Form } from 'react-bootstrap';
import "../App.css"
import HeadCollapse from './HeadCollapse';
import ModalForm from './ModalForm';
import ControleUI from './ControleUI';
import Relatorio from './Relatorio';
import {PDFViewer} from '@react-pdf/renderer'

export default function Dcontrole() {

    const [modalShow,setModalShow] = useState(false);
    const [device,setDevice] = useState([]);
    const [deviceDetails, setDeviceDetails] =useState([]);
    const title = 'DEVICE CONTROL';
    const [source,setSelected] = useState('');
    const [docClicked,setClicked] = useState(false);
    useEffect(() => {
      if(source ===''){
      fetch("http://localhost:8000/device")
        .then((res) => res.json())
        .then((data) =>{ 
          setDevice(data.message);
          const leftDetais = document.getElementById('LeftDetails');
          if(leftDetais){
             leftDetais.style.display = 'block';
          }
        });
      }else{
          fetch('http://localhost:8000/'+source)
          .then((res)=>res.json())
          .then((data)=>{
              setDevice(data.message);
              const leftDetais = document.getElementById('LeftDetails');
              if(leftDetais){
                leftDetais.style.display = 'block';
              }
          });
      }
    }, [source]);

    const docHandler =()=>{
      setClicked(true);
    }
  return (
    <main className='w-100' style={{backgroundColor: '#ffffff', height: "100vh",backgroundSize: "cover",backgroundRepeat: "no-repeat"}}>
      <HeadCollapse/>
      <div className='row mx-2 mt-5'>
          <div className='col-lg-4 col-md-8 col-sm-12 col-xs-12 bg-white rounded-1 border ' style={{opacity: 0.96}}>
            <div className='row'>
              <div className='col-12'>
                <div className='row py-1'>
                  <div className='col-12'>
                    <div className='row'  style={{justifyContent: 'space-between'}}>
                      <div className='col-lg-2 col-md-2 col-sm-12 col-xs-12'><Button size='sm' onClick={()=>setModalShow(true)}>NEW </Button> </div>
                      <div className='col-lg-10 col-md-10 col-sm-12 col-xs-12'>
                        <div className='d-flex'>
                          <InputGroup size='sm' >
                            <Form.Control  placeholder='search device' className='border-0 shadow-sm rounded-1' style={{backgroundColor: '#F5F5F5', maxWidth: 280}} />
                          </InputGroup>
                          <InputGroup>
                           <Form.Select size='sm'  className = 'ms-1 shadow-sm' onChange={(e)=>setSelected(e.target.value)}>
                            <option>choose source</option>
                            <option>Audiometer</option>
                            <option>Reception</option>
                            <option>Spirometer</option>
                            <option>TVisual</option>
                           </Form.Select>
                          </InputGroup>
                        </div>
                      </div>
                    </div>
                    <div className='' >
                      <ModalForm show={modalShow}  onHide={()=>setModalShow(false)} style={{opacity:0.9}} />
                   
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-12'>
                <ListGroup className='border-0 rounded-0'>
                  <ListGroup.Item className='border-0 border-end border-start border-top'>
                    <div className='row shadow-sm py-0 border-bottom border-secondary tableTh'>
                      <div className='col-6'>Description</div>
                      <div className='col-6'>Source</div>
                    </div>
                  </ListGroup.Item>
                  {device.map((item)=>
                    <ListGroup.Item className='border-0 border-end border-start py-0' >
                      <div className=' row shadow-sm py-1' style={{cursor: 'pointer'}} action onClick={()=>{setDeviceDetails(item);}}>
                        <div className='col-6'>{item.descricao}</div>
                        <div className='col-6 '>{item.sala}</div>
                      </div>
                    </ListGroup.Item>
                  )}
                </ListGroup>
              </div>
              <div className='col-12'>
                <Button title='Print' onClick={()=>docHandler()}/>
                {docClicked && <PDFViewer><Relatorio/></PDFViewer>}
              </div>
            </div>
           
          </div>
          <div className='col-lg-8 col-md-8 col-sm-12 col-xs-12 bg-white rounded border' style={{opacity: 1}}>
              <ControleUI details={deviceDetails} title={title}/>
              {source}
          </div>
      </div>
         
    </main>
   
  )
}

