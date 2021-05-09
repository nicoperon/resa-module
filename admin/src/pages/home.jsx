import React, { Component } from "react";
import ReactDOM from "react-dom";
import MaterialTable from "material-table";
import Navbar from '../components/navbar'
import {repository} from '../utiles/repository'
import Button from '@material-ui/core/Button';
import {useHistory} from 'react-router-dom'
import Momemnt from 'moment';
export default ()=>{
  const [users,setuser]=React.useState([]);
  const [usersmain,setusermain]=React.useState([]);
  const [startDate,setstartDate]=React.useState(null);
  const [endDate,setendDate]=React.useState(null);

  React.useEffect(()=>{
    (async ()=>{
        const {data,status}=await repository.bookings().then(x=>x).then(x=>x);
            console.log(data,status);
        if(status==200||status==201)
        {
          setuser(data.bookings);
          setusermain(data.bookings);
        }
    })()
},[]);
const history= useHistory();
    return (<>
    <Navbar title="Application de réservation - Espace admin"/>

<div style={{ maxWidth: "100%" }}>

     

        <MaterialTable
         style={{margin:'5%'}}
         options={{
           exportButton: true,
         
         }}
    columns={[
      { title: "Nom", field: "name" },
      { title: "Module", field: "subject" },
      { title: "Date", field: "date"},
      // { title: "Purchse Amount", field: "purchseAmt"},
      { title: "Heure", field: "time"},
     
    ]}
    data={usersmain}
    title="Réservation"
  />
</div>

    </>
              );
}
