import React ,{useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import '../App.css';
//import { Button} from 'react-bootstrap';
import HeadCollapse from './HeadCollapse';
import Forms from './Forms';
import Sidebar from './Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck,faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { Image } from 'react-bootstrap';
// import Email from './Email';


export default function Dasbohard() {
  const [ref, setref] = useState('');
  const [formconf, setformconf]= useState('');

  const getdataform = (message)=>{
      setformconf(message);
  }
  const getRef=(ref)=>{
    setref(ref);
  }
  return (
    <main className="App mx-0 w-100" style={{height:'100vh', backgroundColor: '#f5f5f5'}} > 
      <HeadCollapse/>
      <div className='row mx-0 ' >
        <div className='col-1 shadow-sm' style={{backgroundColor: '#ebebeb', maxWidth: 75,height:'92vh'}}>
              <Sidebar/>
        </div>
        <div className='col-lg-9 col-md-9 col-sm-12'>
            <div className='rounded border mt-lg-5 mt-md-5 mt-sm-4 mt-xs-3 ms-lg-3 ms-md-2 ms-sm-1 ms-xs-1  shadow-sm' style={{ opacity:.9, padding: 10}} >
              <div className='row mx-0'>
                <div className='col-12'>
                <Forms id='formComp' getdataform ={getdataform} getRef={getRef}/>
                </div>
              </div>
            </div>
        </div>
        <div className='col-lg-2'>
        <div className='rounded  mt-lg-5 mt-md-5 mt-sm-4 mt-xs-3  shadow-sm mx-0' style={{ opacity:.9}} >
          <div className='card-group shadow-sm'>
            <div className='card'>
              <div className='card-body'>
                <div style={{textAlign: 'center', alignItems: 'center', justifyContent: 'center', marginBottom: 2}}><Image src='chat.png' width={50}/></div>
                <div style={{textAlign: 'justify'}}>Dear user, before entering the reagent's data, be careful to read the contents of the box that comes with the reagent!</div>
              </div>
            </div>
          </div>
          <div className='card-group shadow-sm mt-2'>
            <div className='card'>
            <div className='card-header' style={{textAlign: 'center', alignItems: 'center', justifyContent: 'center', marginBottom: 2, borderBottomWidth: 2, borderBottomColor: '#eee'}}>New Attachiment {formconf === 'sucess'&&<FontAwesomeIcon icon={faCircleCheck} color='green'/>} {formconf ==='error'&&<FontAwesomeIcon icon={faCircleExclamation} color='red'/>}</div>
              <div className='card-body'>
                <div style={{textAlign: 'justify'}}>{formconf? <div><p> REF: {ref}</p><p>Status:{formconf} </p></div>: 'No data entered'} </div>
              </div>
            </div>
          </div>
        </div>
        {/* <Email/> */}
        </div>

      </div> 
    </main>
);
}
