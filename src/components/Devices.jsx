import React ,{useState,useEffect}from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import {Table } from 'react-bootstrap';
import "../App.css"
import HeadCollapse from './HeadCollapse';
// import ModalForm from './ModalForm';
// import EditDevice from './EditDevice';
import Sidebar from './Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import ModalForm from './ModalForm';

export default function Devices() {
  // const [modalShow,setModalShow] = useState(false);
  const [device,setDevice] = useState([]);
  const [modalShow,setModalShow] = useState(false);
  const [reagentDetails, setReagentDetails] =useState([]);
  // const title = 'DETAILS';
    useEffect(() => {
      fetch("https://reagentvalidation-c85e925aa2e8.herokuapp.com/device")
        .then((res) => res.json())
        .then((data) =>{ 
          setDevice(data.message);
          const leftDetais = document.getElementById('LeftDetails');
          if(leftDetais){
             leftDetais.style.display = 'block';
          }
        });
    }, []);
//#F5f7f8
  return (
    <main className='mx-0' style={{backgroundColor: '#f5f5f5', color: '#222'}}>
      <HeadCollapse/>
      <div className='row mx-2'>
        <div className='col-1  shadow-sm' style={{backgroundColor: '#ebebeb', maxWidth: 75, height:'92vh'}}>
            <Sidebar/>
        </div>
        <div className='col-lg-11 col-md-11 col-sm-12 col-xs-12'>
          <div className='row '>
            <div className='col-lg-10 col-md-10 col-sm-12 col-xs-12 border mt-lg-5 mt-md-5 mt-sm-3 mt-xs-3 ms-lg-5 ms-md-5 ms-sm-3 ms-xs-3'>
              <h4>Reagent Control Emviroment </h4>
              <div style={{maxHeight: '75vh', overflowY:'auto'}}>
              <Table responsive="sm" className='table table-hover  overflow-hidden h-50' style={{}} >
                <thead >
                  <tr >
                    <th>ID</th>
                    <th>REF.</th>
                    <th>LOT.</th>
                    <th>NOME</th>
                    <th>PROD.DATE</th>
                    <th>EXPA.DATE</th>
                    <th>MONTHS</th>
                    <th>VENDOR</th>
                    <th>STATUS</th>
                    <th>ACTION</th>
                  </tr>
                </thead>
                <tbody style={{fontSize: 10}}>
                {device.map((item,i)=>
                  <tr className=" py-0" style={{cursor: 'pointer'}} >{/**action onClick={()=>{setDeviceDetails(item);}} */}
                {/**overflow: hidden,text-overflow: ellipsis,max-width: 200px, */}
                    <td>{i++}</td>
                    <td>{item.ref}</td>
                    <td>{item.lot}</td>
                    <td style={{ whiteSpace: 'nowrap',overflow: 'hidden',textOverflow: 'ellipsis',maxWidth: 200}}>{item.nome}</td>
                    <td style={{ whiteSpace: 'nowrap',overflow: 'hidden',textOverflow: 'ellipsis',maxWidth: 100}}>
                      {(new Date(item.proddate).getDate())+'/'+(new Date(item.proddate).getMonth()+1) +'/'+ (new Date(item.proddate).getFullYear())}
                      </td>
                    <td style={{ whiteSpace: 'nowrap',overflow: 'hidden',textOverflow: 'ellipsis',maxWidth: 100}}>
                      {(new Date(item.expdate).getDate())+'/'+(new Date(item.expdate).getMonth()+1) +'/'+ (new Date(item.expdate).getFullYear())}
                    </td>
                    <td> {item.difmes}</td>
                    <td style={{ whiteSpace: 'nowrap',overflow: 'hidden',textOverflow: 'ellipsis',maxWidth: 200}}>{item.vendor}</td>
                    <td> {item.difmes >1 ? <strong className='text-success'>On date</strong>:<strong className='text-warning'>warning</strong>}</td>
                    <td style={{justifyContent: 'center', textAlign: 'center'}} onClick={()=>{setModalShow(true);setReagentDetails(item)}}>
                      <FontAwesomeIcon icon={faPenToSquare} fontSize={20} style={{color: 'blue'}} />
                      {/* <FontAwesomeIcon icon={faTrash} fontSize={20} style={{color: '#E72929', marginLeft: 8}} /> */}
                    </td>
                  </tr>
                  )}
                </tbody>
              </Table>
              <ModalForm show={modalShow} reagentDetails={reagentDetails} onHide={()=>setModalShow(false)} style={{opacity:0.9}} />
              </div>
            </div>
            </div>
            {/* <div className='col-lg-4 col-md-4 col-sm-12 col-xs-12 bg-white rounded border' style={{opacity: 0.9}}>
                <EditDevice details={deviceDetails} title={title}/>
            </div> */}
        </div>
      </div>
         
    </main>
   
  );
}
