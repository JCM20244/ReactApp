const express  = require('express');
const cron = require('node-cron');
const nodemailer =require('nodemailer');
const app = express();
const cors = require('cors');
const port  = process.env.Port || 8000;
const db = require('./db.config');
const borderParser = require('body-parser');

app.use(borderParser.urlencoded({extended: false}));
app.use(borderParser.json());
app.use(cors());


  // Mail transport configuration
let transporter = nodemailer.createTransport({
    service:'gmail',
    port: 465,
    secure: true,
    auth: {
      user: 'jcumbe.info@gmail.com',
      pass: 'imwq rigs zscp ldmm',
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  cron.schedule('2 * * 6 *', function () {
    console.log('---------------------');
    console.log('Running Cron Process');
   
    db.query('SELECT ref,expdate FROM reagente WHERE PERIOD_DIFF(EXTRACT(YEAR_MONTH FROM expdate), EXTRACT(YEAR_MONTH FROM CURRENT_DATE))<=1',function(err,result){
            if(err){
                console.log('error of select');
            }else{
                if(result){
                let message = (
                    '<h4>Attention Laboratory. The following reagents are about to expire: </h4>'+
                    '<table style="border: 1px solid #333;border-color: green; padding-left: 5px ; padding-right: 5">' +
                    '<thead style="border: 1px; background-color: #666;  ">' +
                    '<th > REF </th>' +
                    '<th> DATA DE EXPIRACAO </th>'  +
                    '</thead>'
                  ); 
                  
                 result.map(item =>
                     message += (
                       '<tr>' +
                        '<td>'.concat(item.ref)+ '</td>' +
                        '<td>'.concat((new Date(item.expdate)).toISOString().split('T')[0].replace(/-/g, ' ')) + '</td>' +
                        // '<td>' + start + '</td>' +
                        /*...*/
                      '</tr>'
                     )
                  );
                  message +=  '</table>'+'<h4>Note: Please select these reagents! </h4>';
                let mailOptions = {
                    from: 'jcumbe.info@gmail.com',
                    to: 'josecumbeartur@gmail.com',
                    subject: 'Mensagem vindo de SCVA',
                    text: 'Este e o email de teste',
                    html:message
                    
                };
                 // Delivering mail with sendMail method
                transporter.sendMail(mailOptions, (error, info) => {
                  if (error) console.log(error);
                  else console.log('Email sent: ' + info.response);
                });
            }
            }
    });
  });

//apis
app.listen(port, ()=>{
    console.log(`The server run in ${port} port`);
});
app.get('/device', (req,res)=>{
    db.query('SELECT * from reagente', function(err,result){
        if(err){
            res.json({message: 'Fatal Error'});
        }else{
            res.json({message: result});
        }
    });
   
});
app.get('/device/:id',(req,res)=>{
    const id = req.params.id;
    db.query('SELECT * FROM reagente WHERE ID=?',[id], function(err,result){
        if(err){
            res.json({message: "Error Found"});
        }else{
            res.json({message: result});
        }
    });
    
});
//reference: reference,lot: lot,quantity:quantity,name:name,pdate: pdate,expDate: expDate
app.post('/add',(req,res)=>{
    const quantity = req.body.quantity;
    const reference = req.body.reference;
    const lot = req.body.lot;
    const nome = req.body.name;
    const proddate = req.body.pdate;
    const expdate = req.body.expDate;
    const vendor = req.body.vendor;
    const status = 'on date';
    const iduser = 1;
    if(reference && lot){
        db.query('INSERT INTO reagente (ref,nome,lot,proddate,expdate,vendor,status, iduser,quatity) values(?,?,?,?,?,?,?,?,?)',[reference,nome,lot,proddate,expdate,vendor,status, iduser,quantity],function(err,result){
            if(err){
                res.json({message: 'error'});
            }else{
                res.json({message: 'sucess' });
            }
        });
    }else{
    res.json({Error: 'Fatal Error'});
}
});
app.put('/update/:id',(req,res)=>{
    const quantity = req.body.quantity;
    const reference = req.body.reference;
    const lot = req.body.lot;
    const nome = req.body.name;
    const proddate = req.body.pdate;
    const expdate = req.body.expDate;
    const vendor = req.body.vendor;
    const status = 'on date';
    const iduser = 1;
    const ID = req.params.id;
    db.query('UPDATE reagente SET ref=?,nome=?,lot=?,proddate=?,expdate=?,vendor=?,status=?, iduser=?,quatity=? WHERE ID=?',[reference,nome,lot,proddate,expdate,vendor,status, iduser,quantity,ID],function(err,result){
        if(err){
            res.json({message: 'error'});
        }else{
            res.json({message: result });
        }
    });
});
app.delete('/delete/:id',(req,res)=>{
    const ID = req.params.id;
    db.query('DELETE FROM reagente WHERE id=?',[ID],function(err,result){
        if(err){
            res.json({message: 'Error to delete row'});
        }else{
            res.json({message: result});
        }
    });
});

app.get('/find/:content',(req,res)=>{
    const content = req.params.content;
    db.query('SELECT * FROM device WHERE nrSerie = ?',[content],(err,result)=>{
        if(err){
            res.json({message: 'Error Found were find row'});
        }else{
            res.json({message: result});
        }
    });
});
app.post('/controle',(req,res)=>{
    const noRetrited = {
        description: req.body.description?req.body.description:'NON',
        newSource: req.body.newSource?req.body.newSource: 'NON',
        newStatus: req.body.newStatus? req.body.newStatus: 'NON',
    }
    db.query('INSERT INTO dcontrole (iddevice,cdate,isIn,newSource,cdescription,newStatus) values (?,?,?,?,?,?) ',
    [req.body.iddevice,req.body.date,req.body.isSource,noRetrited.newSource,noRetrited.description,noRetrited.newStatus],function(err,result){
    if(err){
        res.json({message: 'Error to insert row'});
    }else{
        res.json({message:result});
    }
});
});

app.get('/:source',(req,res)=>{
    const sourc = req.params.source;
    db.query('SELECT * FROM device WHERE sala = ?',[sourc],function(err,result){
        if(err){
            res.json({message: 'Error Found to get device by source'});
        }else{
            res.json({message: result});
        }
    });
});

app.get('/dados',(req,res)=>{
    res.json({message: 'Hello Server'});
});
