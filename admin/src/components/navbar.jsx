import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Drawer from '@material-ui/core/Drawer';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import {useHistory} from 'react-router-dom'
import {useDispatch} from 'react-redux';
import {LogOut} from '../redux/actionMethodes/User'
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
}));

export default function MenuAppBar({title}) {
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const history=useHistory();
  const open = Boolean(anchorEl);
  const dispatch=useDispatch()
    const [isopendrawer,setisopendrawer]=React.useState(false);
  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const list = () => (
    <div
    
      role="presentation"
      onClick={()=>setisopendrawer(false)}
      onKeyDown={()=>setisopendrawer(false)}
    >
      
      <List>
      <ListItem button onClick={()=>{
              history.push('/')
            }}   >
        
            <ListItemIcon> <MailIcon /></ListItemIcon>
            <ListItemText  >
      Accueil
                  </ListItemText>
          </ListItem>
      
      <ListItem button onClick={()=>{
              history.push('/courses')
            }}  >
        
            <ListItemIcon > <MailIcon /></ListItemIcon>
            <ListItemText >
            Modules
            </ListItemText>
          </ListItem>
          <ListItem button onClick={()=>{
            history.push('/new/course')
            }} >
            <ListItemIcon> <MailIcon /></ListItemIcon>
            <ListItemText >Nouveau module</ListItemText>
          </ListItem>
         </List>
    </div>
  );
  return (
    <div className={classes.root}>
  
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} onClick={()=>setisopendrawer(true)} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {title}
          </Typography>
          {auth && (
            <div>
              <IconButton
                aria-label="compte de l'utilisateur actuel"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={()=>{
                    dispatch(LogOut())
                }}>Se déconnecter</MenuItem>
                {/* <MenuItem onClick={handleClose}></MenuItem> */}
              </Menu>
            </div>
          )}
        </Toolbar>
        <Drawer  open={isopendrawer} onClose={()=>setisopendrawer(false)}>
            {list()}
          </Drawer>
      </AppBar>
     
    </div>
  );
}