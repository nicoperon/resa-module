import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { Formik, Form } from 'formik';
import * as Bootstrap from 'react-bootstrap'
import * as Yup from 'yup';
import { repository } from '../utiles/repository';
import DatePicker from 'react-datepicker';
import logo from '../images/logo_ynov.png'
import LoadingAnimation from '../animation/LoadingAnimation'
import moment from 'moment'
import {Toast,Modal,Button} from 'react-bootstrap'
const DisplayingErrorMessagesSchema = Yup.object().shape({

    name: Yup.string()
        .required('Obligatoire'),
    time: Yup.string()
        .required('Obligatoire'),
    subject: Yup.string()
        .required('Obligatoire'),
});

export default () => {
    const [value, onChange] = useState(new Date());

    const [showAnimation,setshowAnimation]=React.useState(false);
    const [showmessage, setshowmessage] = React.useState(false);
    const [message, setmessage] = React.useState("");
    const [show, setShow] = useState(false);
    const [selectedSubject,setselectedSubject]=React.useState(undefined);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

const [dataMain,setdataMain]=React.useState([]);

    React.useEffect(()=>{
        (async()=>{
            setshowAnimation(true)
            const {data,status}= await repository.getCourses().then(x=>x).then(x=>x)
                console.log(data,status)   
                if(status==200 || status==201)
                {
                    
                    setdataMain(data.courses);
                    setshowAnimation(false)
                }         
                else
                {
                    setshowAnimation(false);
                }
        })()
   },[])

   const postData=async (datapost)=>{
    setshowAnimation(true);
      const {status,data}= await repository.postBooking(datapost).then(x=>x).then(x=>x)
    if(status==200|| status==201)
    {
        console.log(datapost,status)
        setmessage("Réservation effectuée avec succès")
        setshowmessage(true);
        setshowAnimation(false);
        setShow(true);
    
    }
    else
    {
        setshowAnimation(false);
    }

    }
    return <div className="mt-5">
         {showmessage ? <Toast style={{
            position: 'fixed',
            top: 10,
            right: 10,
        }}>
            <Toast.Header onClick={() => setshowmessage(false)}>
                <img src="" className="rounded mr-2" alt="" />
                <strong className="mr-auto">Réserver</strong>
            </Toast.Header>
            <Toast.Body>{message}</Toast.Body>
        </Toast> : <></>}
         {showAnimation? <LoadingAnimation/>:""}
        <div className="flex-box">
            <img src={logo}/>
        </div>
        <div className="container mt-3">
            <div className="row">
                <div className="col-md-6 bg-main bx-shadow lt-box">
                    <div className="flex-box ">

                        <Calendar
                            onChange={onChange}
                            value={value}
                        />
                    </div>
                </div>
                <div className="col-md-6 bx-shadow rt-box">
                    <div className="mt-5 ">
                        <h3 className="text-center font-weight-bold">Réserver un module</h3>
                    </div>
                    <Formik
                        initialValues={{
                            name: '',
                            time: moment().format("H:MM"),
                            subject: '',
                        }}
                        validationSchema={DisplayingErrorMessagesSchema}
                        onSubmit={async (values, { setSubmitting }) => {
                           await postData({...values,date:moment(value).format("DD/MM/YY")})
                        }}
                    >
                        {({ errors, touched, getFieldProps ,values,setFieldValue}) => {
                            // cstErrors = errors;

                            return (
                                <Form className="m-5">
                                    <h3>Confirmer la réservation le : </h3>
                                
                                    <p>{moment(value).format("DD/MM/YY ")+values.time} </p>
                                    <div class="form-group ">
                                        <label  for="name" class="text-info-1">Votre nom:</label><br></br>
                                        <input {...getFieldProps("name")} type="text" class="form-control" />
                                        {touched.name && errors.name && <div style={{ color: 'red', marginTop: 10 }}>{errors.name}</div>}

                                    </div>
                                    <div class="form-group">
                                        <label for="password" class="text-info-1">Heure:</label><br></br>
                                        <DatePicker value={values.time} placeholderText={moment().format("HH:MM")} className="form-control" showTimeSelect showTimeSelectOnly dateFormat="HH:MM" timeIntervals={30} onChange={e => {setFieldValue("time",moment(e).format("HH:MM")) }} />
                                        {touched.time && errors.time && <div style={{ color: 'red', marginTop: 10 }}>{errors.time}</div>}

                                    </div>
                                    <div class="form-group">
                                        <label for="subject" class="text-info-1">Modules:</label><br></br>
                                        <select onChange={(e)=>{
                                            const subject=dataMain.find(x=>x._id==e.target.value);
                                            if(subject)
                                            {
                                                setFieldValue("subject",subject.name)
                                                setselectedSubject(subject)
                                           
                                            }
                                             }} class="form-control" aria-label="">
                                            <option selected value="">Sélectionner module</option>
                                            {
                                                dataMain.map(x=><option value={x._id}>{x.name}</option>)
                                            }
                                        </select>                {touched.subject && errors.subject && <div style={{ color: 'red', marginTop: 10 }}>{errors.subject}</div>}

                                    </div>
                                    <div>
                                        <button type="submit" className="btn btn-info ">Réserver</button>
                                        <button type="button" className="btn btn-info ml-3 ">Annuler</button>

                                    </div>

                                </Form>
                            )

                        }}
                    </Formik>
                </div>
            </div>
        </div>
        <Modal  size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedSubject&&selectedSubject.title?selectedSubject.title:"Réservation effectué avec succés"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <img src={selectedSubject&&selectedSubject.image?selectedSubject.image:"https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/No_image_3x4.svg/1200px-No_image_3x4.svg.png"} className="w-100"/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fermer
          </Button>
          
        </Modal.Footer>
      </Modal>
    </div>
}