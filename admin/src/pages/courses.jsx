import React, { Component } from "react";
import ReactDOM from "react-dom";
import MaterialTable from "material-table";
import Navbar from '../components/navbar'
import {repository} from '../utiles/repository'
import Button from '@material-ui/core/Button';
import {useHistory} from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import _ from 'lodash';
import Momemnt from 'moment';
export default ()=>{
  const [users,setuser]=React.useState([]);
  const [usersmain,setusermain]=React.useState([]);
  const [startDate,setstartDate]=React.useState(null);
  const [endDate,setendDate]=React.useState(null);
  const submitdata = (id) => {
    confirmAlert({
      title: 'Confirmer',
      message: 'Etes vous sur ?',
      buttons: [
        {
          label: 'Oui',
          onClick:   () => {
       (async ()=>{
      const {data,status}= await  repository.deletecourses(id).then(x=>x).then(x=>x);
        if(status==200||status==201)
        {
          setusermain(usersmain.filter(x=>x._id!=id));
        }
        
    })()
      }
        },
        {
          label: 'Non',
          onClick: () => {

          }
        }
      ]
    });
  };
  React.useEffect(()=>{
    (async ()=>{
        const {data,status}=await repository.courses().then(x=>x).then(x=>x);
        if(status==200||status==201)
        {
          setuser(_.reverse(data.courses));
          setusermain(_.reverse(data.courses));
        }
    })()
},[]);
const history= useHistory();
    return (<>
    <Navbar title="Modules"/>

<div style={{ maxWidth: "100%" }}>

     

        <MaterialTable
         style={{margin:'5%'}}
         options={{
           exportButton: true,
         
         }}
    columns={[
      { title: "Nom", field: "name" },
      {
        title: "Logo",
        field: "internal_action",
        editable: false,
        render: (rowData) =>
          rowData && (
            <img src={rowData.image} style={{width:50,height:50,borderRadius:50}}/>
          )
      },
      {
        title: "Action",
        field: "internal_action",
        editable: false,
        render: (rowData) =>
          rowData && (
            <div ><Button onClick={()=>history.push('/edit/course',{data:rowData})}>Modifier</Button>
            <Button onClick={()=>{
              submitdata(rowData._id)
            }}>Supprimer</Button> </div>   )
      }
     
    ]}
    data={usersmain}
    title="Modules"
  />
</div>

    </>
              );
}
