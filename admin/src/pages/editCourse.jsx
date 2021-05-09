import Navbar from '../components/navbar';
import React from 'react';
import { FormControl,InputLabel,Input,FormHelperText ,Button} from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import {useDispatch,useSelector} from 'react-redux';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MuiAlert from '@material-ui/lab/Alert';
import {repository} from '../utiles/repository'
import {useLocation,useHistory} from 'react-router-dom'
const DisplayingErrorMessagesSchema = Yup.object().shape({
    // purchseAmt: Yup.number(),
});
const useStyles = makeStyles((theme) =>
    createStyles({
        root: {

            ...theme.typography.h4
        },
        margin: {
            marginLeft: theme.spacing(5),
            marginTop: theme.spacing(5)
        }
        ,
        maxWidth: {
            maxWidth: 400,
        }
    }),
);
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
export default () => {
    const classes = useStyles();
    const [showanimation, setshowanimation] = React.useState(false);
    const [showmessage, setshowmessage] = React.useState(false);
    const [message, setmessage] = React.useState("");
    const location=useLocation();
    const history=useHistory();

    const postData = async (datapost) => {
        console.log(datapost,)
        const { data, status } = await repository.createCourse(datapost ).then(x => x).then(x => x)
        console.log(data,status)
        if (status == 200 || status == 201) {
          setmessage(true);
          setshowmessage(data.message);
        }
        else {
            setmessage(true);
            setshowmessage(data.message);

        }


    }
    return <div>
        {showmessage ? <Alert message= {message} onClose={()=>setshowmessage(false)} style={{
            position: 'fixed',
            top: 10,
            right: 10,
            zIndex:1000
        }}>
            
           
        </Alert> : <></>}
        <Navbar title="Module   " />
        <div className={`${classes.root} ${classes.margin}`}>{"Modifier module"}</div>
        <div >
        <div style={{padding: '0 27%'}} >
        <Formik
                                initialValues={{
                                    name: '',
                                    image: '',
                                    
                                }}
                                validationSchema={DisplayingErrorMessagesSchema}
                                onSubmit={async (values, { setSubmitting }) => {

                                    await postData(values)
                                }}
                            >
                                {({ errors, touched, getFieldProps, handleSubmit }) => {
                                    // cstErrors = errors;

                                    return (
                                        <Form>
                                             <FormControl fullWidth={true}>
                <InputLabel htmlFor="my-input">Nom</InputLabel>
                <Input   {...getFieldProps("name")}  aria-describedby="my-helper-text" />
                <FormHelperText id="my-helper-text">Nom du module</FormHelperText>
                {touched.name && errors.name && <div style={{ color: 'red', marginTop: 10, maxWidth: 320 }}>{errors.name}</div>}
            </FormControl>
                                             <FormControl fullWidth={true}>
                <InputLabel htmlFor="my-input">Logo</InputLabel>
                <Input   {...getFieldProps("image")}  aria-describedby="my-helper-text" />
                <FormHelperText id="my-helper-text">URL du logo</FormHelperText>
                {touched.image && errors.image && <div style={{ color: 'red', marginTop: 10, maxWidth: 320 }}>{errors.image}</div>}
            </FormControl>
         
            <div>
               <Button  variant="contained" onClick={handleSubmit} color="primary">Sauvegarder</Button>
               {/* <Button onClick={()=>{

               }} style={{marginLeft:20}} variant="contained" color="primary">Ajout</Button>
            */}
           </div>


                                        </Form>
                                    )

                                }}
                            </Formik>

          
           
          
        </div>

        </div>
    </div>

}