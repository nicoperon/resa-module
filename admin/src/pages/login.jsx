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
import { Login, saveToken } from '../redux/actionMethodes/User/index'

const DisplayingErrorMessagesSchema = Yup.object().shape({

    username: Yup.string().required('Obligatoire'),
    password: Yup.string().required('Obligatoire'),

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

    const dispatch = useDispatch();

    const login_now = async (datapost) => {
        console.log(datapost)
       const { data, status } = await repository.login(datapost).then(x => x).then(x => x)
        console.log(data, status)
        if (status === 200 || status==201) {
            if (data.me) {
                dispatch(Login(data.me));
                // dispatch(saveToken(data.response.user.token));
            }
        }
        else
        {

        }
       
      
                // call API according to your requirments and copy dispatch code to store in redux 
        // const { data, status } = await repository.login(datapost).then(x => x).then(x => x)

        // if (data && data.status === 200 && data.success === true) {
        //     if (data.response.user) {
        //         dispatch(Login(data.response.user));
        //         dispatch(saveToken(data.response.user.token));
        //     }

        // }
        // else {

        // }

    }
    return <div>
        {showmessage ? <Alert message= {message} onClose={()=>setshowmessage(false)} style={{
            position: 'fixed',
            top: 10,
            right: 10,
            zIndex:1000
        }}>
            
           
        </Alert> : <></>}
        <div className={`${classes.root} ${classes.margin}`}>{"Connexion"}</div>
        <div >
        <div style={{padding: '0 27%'}} >
        <Formik
                                initialValues={{
                                    username: '',
            password: '',    }}
                                validationSchema={DisplayingErrorMessagesSchema}
                                onSubmit={async (values, { setSubmitting }) => {

                                    await login_now(values)
                                }}
                            >
                                {({ errors, touched, getFieldProps, handleSubmit }) => {
                                    // cstErrors = errors;

                                    return (
                                        <Form>
                                             <FormControl fullWidth={true}>
                <InputLabel htmlFor="my-input">Identifiant</InputLabel>
                <Input   {...getFieldProps("username")}  aria-describedby="my-helper-text" />
                <FormHelperText id="my-helper-text"> </FormHelperText>
                {touched.username && errors.username && <div style={{ color: 'red', marginTop: 10, maxWidth: 320 }}>{errors.username}</div>}
            </FormControl>
            <br></br>
            <FormControl fullWidth={true}>
                <InputLabel htmlFor="my-input">Mot de passe</InputLabel>
                <Input   {...getFieldProps("password")} type="password"   aria-describedby="my-helper-text" />
                <FormHelperText id="my-helper-text"></FormHelperText>
                {touched.password && errors.password && <div style={{ color: 'red', marginTop: 10, maxWidth: 320 }}>{errors.password}</div>}
            </FormControl>
          
            <div>
               <Button  variant="contained" type="button" onClick={handleSubmit} color="primary">Se connecter</Button>
               {/* <Button onClick={()=>{

               }} style={{marginLeft:20}} variant="contained" color="primary">S'inscrire</Button>
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